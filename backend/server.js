const express = require('express');
const cors = require("cors");
const mysql = require('mysql2/promise');

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createPool( {
    host:'localhost',
    user:'root',
    password:'redtalk789',
    database:'mini_social'
});

app.post('/api/posts', async (req,res) => {
    try {
        const {content} = req.body;

        if (!content) {
            return res.status(400).json({message: "Nội dung không được để trống"})
        }

        console.log("Dữ liệu nhận được từ Thunder Client:", req.body);
        console.log("Biến content lấy ra được là:", content);

        const sql = "INSERT INTO Posts (content) VALUES (?)";
        const [result] = await db.query(sql, [content]);

        res.status(201).json({
            message: "Đăng bài thành công!",
            postId: result.insertId
    });

}
    catch (error) {
        console.error(error);
        res.status(500).json({message:"Lỗi server"});
    }
})

app.listen(8080, () => {
    console.log("Server đang chạy tại http://localhost:8080");
});
