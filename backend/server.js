const express = require('express');
const cors = require("cors");
const mysql = require('mysql2/promise');

const app = express();

app.use(cors());
app.use(express.json());

function generateToken(user) {
    return Buffer.from(`${user.id}:${user.email}:${Date.now()}`).toString('base64');
}

const db = mysql.createPool( {
    host:'localhost',
    user:'root',
    password:'redtalk789',
    database:'mini_social'
});

app.post('/api/posts', async (req,res) => {
    try {
        const {content, location, gradient} = req.body;

        if (!content) {
            return res.status(400).json({message: "Nội dung không được để trống"})
        }

        const sql = "INSERT INTO Posts (content, location, gradient) VALUES (?, ?, ?)";
        const [result] = await db.query(sql, [content, location, gradient]);

        res.status(201).json({
            message: "Đăng bài thành công!",
            postId: result.insertId
    });

    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Lỗi server"});
    }
})

app.put('/api/users/:id', async (req,res) => {
    try {
        const userId = req.params.id;
        const {name, bio, school, liveIn} = req.body;

        const sql = "UPDATE Users SET full_name = ?, bio = ?, school = ?, liveIn = ? WHERE id = ?";
        const [result] = await db.query(sql, [name, bio, school, liveIn, userId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({message: "Người dùng không tồn tại"});
        }

        res.status(200).json({message: "Cập nhật thông tin người dùng thành công!"});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Lỗi server"});
    }
});

app.post('/api/auth/login', async (req,res) => {
    try {
        const {email, username, password} = req.body;
        const loginEmail = email || username;

        if (!loginEmail || !password) {
            return res.status(400).json({message: "Email và mật khẩu không được để trống"});
        }

        const sql = "SELECT * FROM Users WHERE (email = ? OR username = ?) AND password_hash = ?";
        const [rows] = await db.query(sql, [loginEmail, loginEmail, password]);

        if (rows.length === 0) {
            return res.status(401).json({message: "Email hoặc mật khẩu không đúng"});
        }

        const user = rows[0];
        res.status(200).json({message: "Đăng nhập thành công", token: generateToken(user), role: user.roles});

    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Lỗi server"});
    }
});

app.get('/api/admin/stats', async (req,res) => {
    try {
        const [users] = await db.query("SELECT COUNT(*) AS totalUsers FROM Users");
        const [posts] = await db.query("SELECT COUNT(*) AS totalPosts FROM Posts");

        res.status(200).json({
            users: users[0].totalUsers,
            posts: posts[0].totalPosts,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Lỗi server"});
    }
});

app.listen(8080, () => {
    console.log("Server đang chạy tại http://localhost:8080");
});
