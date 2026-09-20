const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();

app.use(cors());
app.use(express.json());

// 1. Khởi tạo kết nối MySQL Pool
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'redtalk789',
    database: 'mini_social',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// 2. Cấu hình Static folder & Tự động tạo thư mục uploads nếu chưa có
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}
app.use('/uploads', express.static(uploadDir));

// Cấu hình Multer lưu ảnh đại diện
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'avatar-' + uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

function generateToken(user) {
    return Buffer.from(`${user.id}:${user.email}:${Date.now()}`).toString('base64');
}

/* ========================================================
   AUTH APIS (Đăng nhập / Đăng ký) - STT 13
======================================================== */
// Đăng nhập
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const loginIdentifier = email || username;

        if (!loginIdentifier || !password) {
            return res.status(400).json({ message: "Email/Tên đăng nhập và mật khẩu không được để trống" });
        }

        const sql = "SELECT * FROM users WHERE (email = ? OR username = ?) AND password_hash = ?";
        const [rows] = await db.query(sql, [loginIdentifier, loginIdentifier, password]);

        if (rows.length === 0) {
            return res.status(401).json({ message: "Tài khoản hoặc mật khẩu không chính xác" });
        }

        const user = rows[0];
        if (user.status === 'locked') {
            return res.status(403).json({ message: "Tài khoản của bạn đã bị khóa do vi phạm tiêu chuẩn cộng đồng" });
        }
        delete user.password_hash; // Bảo mật: không gửi mật khẩu về client
        
        // Cập nhật thời gian đăng nhập cuối
        await db.query("UPDATE users SET last_login_at = NOW() WHERE id = ?", [user.id]);

        res.status(200).json({
            message: "Đăng nhập thành công",
            token: generateToken(user),
            role: user.roles,
            user: user
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi server" });
    }
});

// Đăng ký tài khoản mới (STT 13)
app.post('/api/auth/register', async (req, res) => {
    try {
        const { username, email, password, full_name } = req.body;

        if (!username || !email || !password || !full_name) {
            return res.status(400).json({ message: "Vui lòng điền đầy đủ các thông tin bắt buộc" });
        }

        // Kiểm tra xem username hoặc email đã tồn tại chưa
        const [existing] = await db.query("SELECT id FROM users WHERE username = ? OR email = ?", [username, email]);
        if (existing.length > 0) {
            return res.status(409).json({ message: "Tên đăng nhập hoặc Email đã được sử dụng" });
        }

        const sql = "INSERT INTO users (username, email, password_hash, full_name, roles, created_at) VALUES (?, ?, ?, ?, 'user', NOW())";
        const [result] = await db.query(sql, [username, email, password, full_name]);

        res.status(201).json({
            message: "Đăng ký tài khoản thành công!",
            userId: result.insertId
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi server khi đăng ký" });
    }
});

/* ========================================================
   USER APIS (Quản lý thông tin & Avatar) - STT 11 & STT 12
======================================================== */
// Lấy danh sách users (Admin - STT 11) - Đã ẩn password_hash
app.get('/api/users', async (req, res) => {
    try {
        const sql = `
            SELECT u.id, u.username, u.full_name, u.email, u.avatar_url, u.roles, u.status, u.bio, u.school, u.created_at, u.last_login_at,
                   (SELECT COUNT(*) FROM posts WHERE user_id = u.id) AS post_count,
                   (SELECT COUNT(*) FROM reports WHERE reported_user_id = u.id) AS violation_count
            FROM users u 
            ORDER BY u.created_at DESC
        `;
        const [rows] = await db.query(sql);
        res.json({ users: rows });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi khi tải thông tin người dùng" });
    }
});

// Lấy thông tin 1 user theo ID
app.get('/api/users/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const sql = `
            SELECT u.id, u.username, u.full_name, u.email, u.avatar_url, u.roles, u.status, u.bio, u.school, u.created_at, u.last_login_at,
                   (SELECT COUNT(*) FROM posts WHERE user_id = u.id) AS post_count,
                   (SELECT COUNT(*) FROM reports WHERE reported_user_id = u.id) AS violation_count,
                   (SELECT COUNT(*) FROM friendships WHERE (user_id1 = u.id OR user_id2 = u.id) AND status = 'accepted') AS friend_count
            FROM users u 
            WHERE u.id = ?
        `;
        const [rows] = await db.query(sql, [userId]);

        if (rows.length === 0) {
            return res.status(404).json({ message: "Không tìm thấy người dùng" });
        }

        res.json({ user: rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi khi tải thông tin người dùng" });
    }
});

// Cập nhật thông tin User (STT 12)
app.put('/api/users/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const { full_name, name, bio, school } = req.body;
        const updateName = full_name || name;

        const sql = "UPDATE users SET full_name = ?, bio = ?, school = ? WHERE id = ?";
        const [result] = await db.query(sql, [updateName, bio, school, userId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Người dùng không tồn tại" });
        }

        res.status(200).json({ message: "Cập nhật thông tin người dùng thành công!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi server" });
    }
});

// Upload & Cập nhật Avatar (STT 12)
app.post('/api/users/:id/avatar', upload.single('avatar'), async (req, res) => {
    try {
        const userId = req.params.id;

        if (!req.file) {
            return res.status(400).json({ message: "Vui lòng chọn một file ảnh" });
        }

        const avatarUrl = `http://localhost:8080/uploads/${req.file.filename}`;

        const sql = "UPDATE users SET avatar_url = ? WHERE id = ?";
        await db.query(sql, [avatarUrl, userId]);

        res.status(200).json({
            message: "Cập nhật ảnh đại diện thành công!",
            avatar_url: avatarUrl
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi server khi upload ảnh" });
    }
});

// Xóa tài khoản (Admin - STT 11)
app.delete('/api/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await db.query("DELETE FROM users WHERE id = ?", [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Không tìm thấy người dùng" });
        }

        res.json({ message: "Xóa tài khoản thành công", userId: id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi server khi xóa tài khoản" });
    }
});

/* ========================================================
   POSTS APIS (Quản lý bài viết) - STT 5, 11 & 12
======================================================== */
// Lấy danh sách tất cả bài viết kèm thông tin tác giả (JOIN users)
app.get('/api/posts', async (req, res) => {
    try {
        const sql = `
            SELECT p.*, u.full_name, u.username, u.avatar_url,
                   (SELECT COUNT(*) FROM reports WHERE reported_post_id = p.id) AS report_count
            FROM posts p 
            LEFT JOIN users u ON p.user_id = u.id 
            ORDER BY p.created_at DESC
        `;
        const [rows] = await db.query(sql);
        res.json({ posts: rows });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi khi tải bài viết" });
    }
});

// Lấy bài viết của 1 người dùng cụ thể (Trang cá nhân - STT 12)
app.get('/api/users/:id/posts', async (req, res) => {
    try {
        const userId = req.params.id;
        const sql = `
            SELECT p.*, u.full_name, u.username, u.avatar_url 
            FROM posts p 
            LEFT JOIN users u ON p.user_id = u.id 
            WHERE p.user_id = ? 
            ORDER BY p.created_at DESC
        `;
        const [rows] = await db.query(sql, [userId]);
        res.json({ posts: rows });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi khi tải bài viết của người dùng" });
    }
});

// Đăng bài viết mới
app.post('/api/users/:id/posts', async (req, res) => {
    try {
        const userId = req.params.id;
        const { content, location, gradient, image_url } = req.body;

        if (!content) {
            return res.status(400).json({ message: "Nội dung không được để trống" });
        }

        const sql = "INSERT INTO posts (user_id, content, location, gradient, image_url, created_at) VALUES (?, ?, ?, ?, ?, NOW())";
        const [result] = await db.query(sql, [userId, content, location || null, gradient || null, image_url || null]);

        res.status(201).json({
            message: "Đăng bài thành công!",
            postId: result.insertId
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi server khi đăng bài" });
    }
});

// Xóa bài viết (Admin - STT 11 & User)
app.delete('/api/posts/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await db.query("DELETE FROM posts WHERE id = ?", [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Không tìm thấy bài viết" });
        }

        res.json({ message: "Xóa bài viết thành công", postId: id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi server khi xóa bài viết" });
    }
});

/* ========================================================
   ADMIN STATS APIS (Thống kê - STT 11)
======================================================== */
app.get('/api/admin/stats', async (req, res) => {
    try {
        const [[usersCount]] = await db.query("SELECT COUNT(*) AS totalUsers FROM users");
        const [[postsCount]] = await db.query("SELECT COUNT(*) AS totalPosts FROM posts");
        const [[lockedUsersCount]] = await db.query("SELECT COUNT(*) AS totalLocked FROM users WHERE status = 'locked'");
        const [[reportsCount]] = await db.query("SELECT COUNT(*) AS pendingReports FROM reports WHERE status = 'pending'");

        res.status(200).json({
            users: usersCount ? usersCount.totalUsers : 0,
            posts: postsCount ? postsCount.totalPosts : 0,
            lockedUsers: lockedUsersCount ? lockedUsersCount.totalLocked : 0,
            pendingReports: reportsCount ? reportsCount.pendingReports : 0
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi server khi lấy thống kê" });
    }
});

/* ========================================================
   REPORT APIS (Báo cáo vi phạm)
======================================================== */
// Tạo báo cáo (User)
app.post('/api/reports', async (req, res) => {
    try {
        const { reporter_id, reported_user_id, reported_post_id, reason } = req.body;
        if (!reporter_id || !reason || (!reported_user_id && !reported_post_id)) {
            return res.status(400).json({ message: "Thiếu thông tin báo cáo" });
        }
        
        const sql = "INSERT INTO reports (reporter_id, reported_user_id, reported_post_id, reason, created_at) VALUES (?, ?, ?, ?, NOW())";
        const [result] = await db.query(sql, [reporter_id, reported_user_id || null, reported_post_id || null, reason]);
        
        // Lưu log
        await db.query("INSERT INTO activity_logs (action, details) VALUES (?, ?)", ['REPORT_CREATED', `Báo cáo mới ID ${result.insertId}`]);

        res.status(201).json({ message: "Gửi báo cáo thành công", reportId: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi server" });
    }
});

// Lấy danh sách báo cáo chờ duyệt (Admin)
app.get('/api/admin/reports', async (req, res) => {
    try {
        const sql = `
            SELECT r.*, 
                   u1.username AS reporter_name, 
                   u2.username AS reported_user_name,
                   p.content AS reported_post_content
            FROM reports r
            LEFT JOIN users u1 ON r.reporter_id = u1.id
            LEFT JOIN users u2 ON r.reported_user_id = u2.id
            LEFT JOIN posts p ON r.reported_post_id = p.id
            WHERE r.status = 'pending'
            ORDER BY r.created_at DESC
        `;
        const [rows] = await db.query(sql);
        res.json({ reports: rows });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi server" });
    }
});

// Xử lý báo cáo (Admin)
app.put('/api/admin/reports/:id', async (req, res) => {
    try {
        const reportId = req.params.id;
        const { status } = req.body; // 'resolved' hoặc 'dismissed'
        
        const sql = "UPDATE reports SET status = ? WHERE id = ?";
        await db.query(sql, [status, reportId]);
        
        await db.query("INSERT INTO activity_logs (action, details) VALUES (?, ?)", ['REPORT_RESOLVED', `Báo cáo ID ${reportId} được xử lý: ${status}`]);

        res.json({ message: "Xử lý báo cáo thành công" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi server" });
    }
});

/* ========================================================
   ADMIN MANAGEMENT APIS (Quản lý User & Admin)
======================================================== */
// Khóa/Mở khóa tài khoản (Có lý do & ghi chú)
app.put('/api/admin/users/:id/status', async (req, res) => {
    try {
        const userId = req.params.id;
        const { status, reason, note } = req.body; // 'active' hoặc 'locked'
        
        const sql = "UPDATE users SET status = ? WHERE id = ?";
        await db.query(sql, [status, userId]);
        
        let details = `Tài khoản chuyển sang trạng thái ${status}`;
        if (status === 'locked' && reason) {
            details = `Khóa tài khoản vì: ${reason}. Ghi chú: ${note || ''}`;
        }
        
        await db.query("INSERT INTO activity_logs (action, details, target_user_id) VALUES (?, ?, ?)", ['USER_STATUS_CHANGED', details, userId]);

        res.json({ message: "Cập nhật trạng thái thành công" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi server" });
    }
});

// Lấy lịch sử vi phạm của 1 user
app.get('/api/admin/users/:id/violations', async (req, res) => {
    try {
        const userId = req.params.id;
        const [rows] = await db.query("SELECT * FROM activity_logs WHERE target_user_id = ? ORDER BY created_at DESC", [userId]);
        res.json({ violations: rows });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi server" });
    }
});

// Lấy chi tiết nhóm lý do báo cáo của 1 bài viết
app.get('/api/admin/posts/:id/reports', async (req, res) => {
    try {
        const postId = req.params.id;
        const sql = `
            SELECT reason, COUNT(*) as count 
            FROM reports 
            WHERE reported_post_id = ? 
            GROUP BY reason
            ORDER BY count DESC
        `;
        const [rows] = await db.query(sql, [postId]);
        res.json({ report_reasons: rows });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi server" });
    }
});

// Ẩn/Hiện bài viết
app.put('/api/admin/posts/:id/status', async (req, res) => {
    try {
        const postId = req.params.id;
        const { status } = req.body; // 'active' hoặc 'hidden'
        
        const sql = "UPDATE posts SET status = ? WHERE id = ?";
        await db.query(sql, [status, postId]);
        
        await db.query("INSERT INTO activity_logs (action, details, target_post_id) VALUES (?, ?, ?)", ['POST_STATUS_CHANGED', `Bài viết chuyển sang trạng thái ${status}`, postId]);

        res.json({ message: "Cập nhật trạng thái bài viết thành công" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi server" });
    }
});

// Cấp quyền Admin
app.put('/api/admin/users/:id/role', async (req, res) => {
    try {
        const userId = req.params.id;
        const { role } = req.body; // 'admin' hoặc 'user'
        
        const sql = "UPDATE users SET roles = ? WHERE id = ?";
        await db.query(sql, [role, userId]);
        
        await db.query("INSERT INTO activity_logs (action, details, target_user_id) VALUES (?, ?, ?)", ['ROLE_CHANGED', `Tài khoản chuyển sang quyền ${role}`, userId]);

        res.json({ message: "Cập nhật phân quyền thành công" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi server" });
    }
});

// Lấy nhật ký hoạt động chung
app.get('/api/admin/activities', async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM activity_logs ORDER BY created_at DESC LIMIT 50");
        res.json({ activities: rows });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi server" });
    }
});

app.listen(8080, () => {
    console.log("Server đang chạy tại http://localhost:8080");
});
