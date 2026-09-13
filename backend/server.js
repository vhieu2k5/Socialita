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
        delete user.password_hash; // Bảo mật: không gửi mật khẩu về client

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
        const sql = "SELECT id, username, full_name, email, avatar_url, roles, bio, school, created_at FROM users ORDER BY created_at DESC";
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
        const sql = "SELECT id, username, full_name, email, avatar_url, roles, bio, school, created_at FROM users WHERE id = ?";
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
            SELECT p.*, u.full_name, u.username, u.avatar_url 
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

        res.status(200).json({
            users: usersCount ? usersCount.totalUsers : 0,
            posts: postsCount ? postsCount.totalPosts : 0
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi server khi lấy thống kê" });
    }
});

app.listen(8080, () => {
    console.log("Server đang chạy tại http://localhost:8080");
});
