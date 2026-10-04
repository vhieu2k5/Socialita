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
// Multer lưu ảnh bài viết
const postImageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'post-' + uniqueSuffix + path.extname(file.originalname));
    }
});
const uploadPostImg = multer({ storage: postImageStorage });

// Upload ảnh bài viết
app.post('/api/posts/upload-image', uploadPostImg.single('image'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Vui lòng chọn một file ảnh" });
        }
        const imageUrl = `http://localhost:8080/uploads/${req.file.filename}`;
        res.status(200).json({ message: "Tải ảnh lên thành công", image_url: imageUrl });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi server khi upload ảnh bài viết" });
    }
});

/* ========================================================
   POSTS APIS (Quản lý bài viết) - STT 5, 11 & 12
======================================================== */
// Lấy danh sách tất cả bài viết kèm thông tin tác giả, reactions, comments (Hỗ trợ lọc bạn bè - Newsfeed)
app.get('/api/posts', async (req, res) => {
    try {
        const currentUserId = req.query.current_user_id ? parseInt(req.query.current_user_id) : 0;
        const filter = req.query.filter; // 'all', 'following'
        const userId = req.query.userId ? parseInt(req.query.userId) : currentUserId;

        let whereClause = "WHERE 1=1";
        const params = [];

        // Nếu người dùng chọn tab 'Đang theo dõi' (Newsfeed bạn bè)
        if (filter === 'following' && userId) {
            whereClause += ` AND p.status = 'active' AND (
                p.user_id = ? OR p.user_id IN (
                    SELECT user_id2 FROM friendships WHERE user_id1 = ? AND status = 'accepted'
                    UNION
                    SELECT user_id1 FROM friendships WHERE user_id2 = ? AND status = 'accepted'
                )
            )`;
            params.push(userId, userId, userId);
        } else if (req.query.status !== 'all') {
            whereClause += " AND p.status = 'active'";
        }

        const sql = `
            SELECT p.*, u.full_name, u.username, u.avatar_url,
                   (SELECT COUNT(*) FROM reactions WHERE post_id = p.id) AS reaction_count,
                   (SELECT COUNT(*) FROM comments WHERE post_id = p.id) AS comment_count,
                   (SELECT COUNT(*) FROM reports WHERE reported_post_id = p.id) AS report_count,
                   ${currentUserId ? `EXISTS(SELECT 1 FROM reactions WHERE post_id = p.id AND user_id = ${currentUserId})` : '0'} AS user_has_reacted
            FROM posts p 
            LEFT JOIN users u ON p.user_id = u.id 
            ${whereClause}
            ORDER BY p.created_at DESC
        `;
        const [rows] = await db.query(sql, params);
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
        const currentUserId = req.query.current_user_id ? parseInt(req.query.current_user_id) : 0;
        const sql = `
            SELECT p.*, u.full_name, u.username, u.avatar_url,
                   (SELECT COUNT(*) FROM reactions WHERE post_id = p.id) AS reaction_count,
                   (SELECT COUNT(*) FROM comments WHERE post_id = p.id) AS comment_count,
                   ${currentUserId ? `EXISTS(SELECT 1 FROM reactions WHERE post_id = p.id AND user_id = ${currentUserId})` : '0'} AS user_has_reacted
            FROM posts p 
            LEFT JOIN users u ON p.user_id = u.id 
            WHERE p.user_id = ? AND p.status = 'active'
            ORDER BY p.created_at DESC
        `;
        const [rows] = await db.query(sql, [userId]);
        res.json({ posts: rows });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi khi tải bài viết của người dùng" });
    }
});

// Đăng bài viết mới (Hỗ trợ văn bản và hình ảnh)
app.post('/api/users/:id/posts', async (req, res) => {
    try {
        const userId = req.params.id;
        const { content, location, gradient, image_url } = req.body;

        if (!content && !image_url) {
            return res.status(400).json({ message: "Nội dung hoặc hình ảnh không được để trống" });
        }

        const sql = "INSERT INTO posts (user_id, content, location, gradient, image_url, status, created_at) VALUES (?, ?, ?, ?, ?, 'active', NOW())";
        const [result] = await db.query(sql, [userId, content || '', location || null, gradient || null, image_url || null]);

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
        // Xóa cascade comments và reactions liên quan
        await db.query("DELETE FROM comments WHERE post_id = ?", [id]);
        await db.query("DELETE FROM reactions WHERE post_id = ?", [id]);
        await db.query("DELETE FROM reports WHERE reported_post_id = ?", [id]);

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
   REACTIONS APIS (Thả tim / Like bài viết)
======================================================== */
// Thả tim / Bỏ thả tim (Toggle reaction)
app.post('/api/posts/:id/react', async (req, res) => {
    try {
        const postId = req.params.id;
        const { user_id, type = 'love' } = req.body;

        if (!user_id) {
            return res.status(400).json({ message: "Thiếu mã định danh người dùng" });
        }

        // Kiểm tra xem đã thả tim chưa
        const [existing] = await db.query("SELECT id FROM reactions WHERE post_id = ? AND user_id = ?", [postId, user_id]);
        let reacted = false;

        if (existing.length > 0) {
            // Đã like -> Huỷ like (toggle)
            await db.query("DELETE FROM reactions WHERE post_id = ? AND user_id = ?", [postId, user_id]);
            reacted = false;
        } else {
            // Chưa like -> Thêm like
            await db.query("INSERT INTO reactions (post_id, user_id, type, created_at) VALUES (?, ?, ?, NOW())", [postId, user_id, type]);
            reacted = true;
        }

        const [[{ totalReactions }]] = await db.query("SELECT COUNT(*) AS totalReactions FROM reactions WHERE post_id = ?", [postId]);

        res.status(200).json({
            message: reacted ? "Đã thả tim bài viết" : "Đã bỏ thả tim",
            reacted: reacted,
            reaction_count: totalReactions
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi server khi thả tim" });
    }
});

// Lấy danh sách người thả tim bài viết
app.get('/api/posts/:id/reactions', async (req, res) => {
    try {
        const postId = req.params.id;
        const sql = `
            SELECT r.*, u.full_name, u.username, u.avatar_url 
            FROM reactions r 
            JOIN users u ON r.user_id = u.id 
            WHERE r.post_id = ? 
            ORDER BY r.created_at DESC
        `;
        const [rows] = await db.query(sql, [postId]);
        res.json({ reactions: rows });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi khi lấy danh sách tương tác" });
    }
});

/* ========================================================
   COMMENTS APIS (Bình luận bài viết)
======================================================== */
// Lấy danh sách bình luận của 1 bài viết
app.get('/api/posts/:id/comments', async (req, res) => {
    try {
        const postId = req.params.id;
        const sql = `
            SELECT c.*, u.full_name, u.username, u.avatar_url 
            FROM comments c 
            JOIN users u ON c.user_id = u.id 
            WHERE c.post_id = ? 
            ORDER BY c.created_at ASC
        `;
        const [rows] = await db.query(sql, [postId]);
        res.json({ comments: rows });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi khi tải bình luận" });
    }
});

// Gửi bình luận mới
app.post('/api/posts/:id/comments', async (req, res) => {
    try {
        const postId = req.params.id;
        const { user_id, content } = req.body;

        if (!user_id || !content || !content.trim()) {
            return res.status(400).json({ message: "Nội dung bình luận không được để trống" });
        }

        const sql = "INSERT INTO comments (post_id, user_id, content, created_at) VALUES (?, ?, ?, NOW())";
        const [result] = await db.query(sql, [postId, user_id, content.trim()]);

        const [[newComment]] = await db.query(`
            SELECT c.*, u.full_name, u.username, u.avatar_url 
            FROM comments c 
            JOIN users u ON c.user_id = u.id 
            WHERE c.id = ?
        `, [result.insertId]);

        const [[{ totalComments }]] = await db.query("SELECT COUNT(*) AS totalComments FROM comments WHERE post_id = ?", [postId]);

        res.status(201).json({
            message: "Đã gửi bình luận!",
            comment: newComment,
            comment_count: totalComments
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi server khi đăng bình luận" });
    }
});

// Xóa bình luận
app.delete('/api/comments/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await db.query("DELETE FROM comments WHERE id = ?", [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Bình luận không tồn tại" });
        }
        res.json({ message: "Đã xóa bình luận" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi server khi xóa bình luận" });
    }
});

/* ========================================================
   FRIENDSHIPS APIS (Kết bạn)
======================================================== */
// Lấy danh sách bạn bè đã kết bạn của user
app.get('/api/users/:id/friends', async (req, res) => {
    try {
        const userId = req.params.id;
        const sql = `
            SELECT u.id, u.username, u.full_name, u.avatar_url, u.bio, u.school, u.liveIn, f.created_at AS friendship_date
            FROM friendships f
            JOIN users u ON (u.id = CASE WHEN f.user_id1 = ? THEN f.user_id2 ELSE f.user_id1 END)
            WHERE (f.user_id1 = ? OR f.user_id2 = ?) AND f.status = 'accepted'
            ORDER BY f.created_at DESC
        `;
        const [rows] = await db.query(sql, [userId, userId, userId]);
        res.json({ friends: rows });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi khi tải danh sách bạn bè" });
    }
});

// Lấy danh sách lời mời kết bạn gửi đến user (pending)
app.get('/api/users/:id/friend-requests', async (req, res) => {
    try {
        const userId = req.params.id;
        const sql = `
            SELECT f.user_id1 AS requester_id, f.created_at, u.username, u.full_name, u.avatar_url, u.bio
            FROM friendships f
            JOIN users u ON u.id = f.user_id1
            WHERE f.user_id2 = ? AND f.status = 'pending'
            ORDER BY f.created_at DESC
        `;
        const [rows] = await db.query(sql, [userId]);
        res.json({ requests: rows });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi khi tải lời mời kết bạn" });
    }
});

// Lấy danh sách gợi ý kết bạn (chưa kết bạn và chưa gửi lời mời)
app.get('/api/users/:id/suggestions', async (req, res) => {
    try {
        const userId = req.params.id;
        const sql = `
            SELECT u.id, u.username, u.full_name, u.avatar_url, u.bio, u.school, u.liveIn
            FROM users u
            WHERE u.id != ? AND u.status = 'active'
              AND u.id NOT IN (
                SELECT user_id2 FROM friendships WHERE user_id1 = ?
                UNION
                SELECT user_id1 FROM friendships WHERE user_id2 = ?
              )
            ORDER BY u.created_at DESC
            LIMIT 6
        `;
        const [rows] = await db.query(sql, [userId, userId, userId]);
        res.json({ suggestions: rows });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi khi tải gợi ý kết bạn" });
    }
});

// Gửi lời mời kết bạn
app.post('/api/friends/request', async (req, res) => {
    try {
        const { requester_id, receiver_id } = req.body;
        if (!requester_id || !receiver_id || requester_id == receiver_id) {
            return res.status(400).json({ message: "Yêu cầu kết bạn không hợp lệ" });
        }

        // Kiểm tra xem đã có bản ghi chưa
        const [existing] = await db.query(
            "SELECT * FROM friendships WHERE (user_id1 = ? AND user_id2 = ?) OR (user_id1 = ? AND user_id2 = ?)",
            [requester_id, receiver_id, receiver_id, requester_id]
        );

        if (existing.length > 0) {
            return res.status(409).json({ message: "Lời mời kết bạn đã tồn tại hoặc hai bạn đã là bạn bè" });
        }

        await db.query(
            "INSERT INTO friendships (user_id1, user_id2, status, created_at) VALUES (?, ?, 'pending', NOW())",
            [requester_id, receiver_id]
        );

        res.status(201).json({ message: "Đã gửi lời mời kết bạn thành công!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi server khi gửi lời mời kết bạn" });
    }
});

// Phản hồi lời mời kết bạn (Chấp nhận hoặc Từ chối)
app.put('/api/friends/respond', async (req, res) => {
    try {
        const { requester_id, user_id, action } = req.body; // action: 'accept' | 'reject'
        if (!requester_id || !user_id || !['accept', 'reject'].includes(action)) {
            return res.status(400).json({ message: "Tham số phản hồi không hợp lệ" });
        }

        if (action === 'accept') {
            await db.query(
                "UPDATE friendships SET status = 'accepted' WHERE user_id1 = ? AND user_id2 = ?",
                [requester_id, user_id]
            );
            res.json({ message: "Đã đồng ý kết bạn!" });
        } else {
            await db.query(
                "DELETE FROM friendships WHERE user_id1 = ? AND user_id2 = ?",
                [requester_id, user_id]
            );
            res.json({ message: "Đã từ chối lời mời kết bạn" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi server khi phản hồi kết bạn" });
    }
});

// Hủy kết bạn
app.delete('/api/friends/:u1/:u2', async (req, res) => {
    try {
        const { u1, u2 } = req.params;
        await db.query(
            "DELETE FROM friendships WHERE (user_id1 = ? AND user_id2 = ?) OR (user_id1 = ? AND user_id2 = ?)",
            [u1, u2, u2, u1]
        );
        res.json({ message: "Đã hủy kết bạn" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi server khi hủy kết bạn" });
    }
});

/* ========================================================
   MESSAGES APIS (Nhắn tin trò chuyện)
======================================================== */
// Lấy danh sách hội thoại gần đây của user (Phải đặt trước /:u1/:u2 để không bị match nhầm)
app.get('/api/messages/conversations/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const sql = `
            SELECT 
              partner.id AS partner_id,
              partner.full_name AS partner_name,
              partner.username AS partner_username,
              partner.avatar_url AS partner_avatar,
              m.content AS last_message,
              m.created_at AS last_time,
              m.sender_id AS last_sender_id,
              (SELECT COUNT(*) FROM messages WHERE sender_id = partner.id AND receiver_id = ? AND is_read = 0) AS unread_count
            FROM (
              SELECT 
                CASE WHEN sender_id = ? THEN receiver_id ELSE sender_id END AS partner_id,
                MAX(id) AS max_msg_id
              FROM messages
              WHERE sender_id = ? OR receiver_id = ?
              GROUP BY partner_id
            ) latest
            JOIN messages m ON m.id = latest.max_msg_id
            JOIN users partner ON partner.id = latest.partner_id
            ORDER BY m.created_at DESC
        `;
        const [rows] = await db.query(sql, [userId, userId, userId, userId]);
        res.json({ conversations: rows });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi khi tải danh sách hội thoại" });
    }
});

// Lấy lịch sử tin nhắn giữa 2 người dùng
app.get('/api/messages/:u1/:u2', async (req, res) => {
    try {
        const { u1, u2 } = req.params;
        const sql = `
            SELECT m.*, u.full_name AS sender_name, u.avatar_url AS sender_avatar
            FROM messages m
            JOIN users u ON m.sender_id = u.id
            WHERE (m.sender_id = ? AND m.receiver_id = ?) OR (m.sender_id = ? AND m.receiver_id = ?)
            ORDER BY m.created_at ASC
        `;
        const [rows] = await db.query(sql, [u1, u2, u2, u1]);

        // Đánh dấu các tin nhắn gửi đến u1 là đã đọc
        await db.query("UPDATE messages SET is_read = 1 WHERE sender_id = ? AND receiver_id = ?", [u2, u1]);

        res.json({ messages: rows });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi khi tải lịch sử tin nhắn" });
    }
});

// Gửi tin nhắn mới
app.post('/api/messages', async (req, res) => {
    try {
        const { sender_id, receiver_id, content } = req.body;
        if (!sender_id || !receiver_id || !content || !content.trim()) {
            return res.status(400).json({ message: "Nội dung tin nhắn không được để trống" });
        }

        const sql = "INSERT INTO messages (sender_id, receiver_id, content, is_read, created_at) VALUES (?, ?, ?, 0, NOW())";
        const [result] = await db.query(sql, [sender_id, receiver_id, content.trim()]);

        const [[msg]] = await db.query(`
            SELECT m.*, u.full_name AS sender_name, u.avatar_url AS sender_avatar
            FROM messages m
            JOIN users u ON m.sender_id = u.id
            WHERE m.id = ?
        `, [result.insertId]);

        res.status(201).json({ message: "Đã gửi tin nhắn!", messageData: msg });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi server khi gửi tin nhắn" });
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
            totalUsers: usersCount ? usersCount.totalUsers : 0,
            totalPosts: postsCount ? postsCount.totalPosts : 0,
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
