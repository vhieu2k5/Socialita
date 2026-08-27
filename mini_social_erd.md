# Sơ đồ thực thể liên kết (ERD) - Mini Social Network

Dưới đây là sơ đồ ERD chi tiết mô tả các bảng, thuộc tính (cột) và mối quan hệ (foreign keys) trong cơ sở dữ liệu:

```mermaid
erDiagram
    USERS {
        int id PK
        varchar username UK "Tên đăng nhập"
        varchar password_hash "Mật khẩu"
        varchar full_name "Họ và tên"
        varchar email UK "Email"
        varchar avatar_url "Ảnh đại diện"
        enum role "Phân quyền (admin/user)"
        varchar status_message "Cập nhật trạng thái"
        timestamp created_at
        timestamp updated_at
    }
    
    POSTS {
        int id PK
        int user_id FK "Người đăng"
        text content "Nội dung văn bản"
        varchar image_url "Hình ảnh"
        varchar location "Vị trí"
        varchar gradient "Màu nền"
        timestamp created_at
        timestamp updated_at
    }
    
    FRIENDSHIPS {
        int user_id1 PK, FK "Người gửi yêu cầu"
        int user_id2 PK, FK "Người nhận yêu cầu"
        enum status "Trạng thái (pending/accepted)"
        timestamp created_at
        timestamp updated_at
    }
    
    MESSAGES {
        int id PK
        int sender_id FK "Người gửi"
        int receiver_id FK "Người nhận"
        text content "Nội dung tin nhắn"
        boolean is_read "Trạng thái đã đọc"
        timestamp created_at
    }
    
    COMMENTS {
        int id PK
        int post_id FK "Bài viết"
        int user_id FK "Người bình luận"
        text content "Nội dung bình luận"
        timestamp created_at
        timestamp updated_at
    }
    
    REACTIONS {
        int id PK
        int post_id FK "Bài viết"
        int user_id FK "Người thả tim"
        enum type "Loại (love, like...)"
        timestamp created_at
    }

    %% Quan hệ giữa các bảng
    USERS ||--o{ POSTS : "đăng bài (creates)"
    USERS ||--o{ COMMENTS : "viết bình luận (writes)"
    USERS ||--o{ REACTIONS : "thả tim (reacts)"
    USERS ||--o{ MESSAGES : "gửi/nhận (sends/receives)"
    USERS ||--o{ FRIENDSHIPS : "kết bạn (befriends)"
    POSTS ||--o{ COMMENTS : "chứa (has)"
    POSTS ||--o{ REACTIONS : "nhận (receives)"
```

### Chú thích ký hiệu:
* **PK (Primary Key):** Khóa chính, định danh duy nhất cho mỗi dòng dữ liệu.
* **FK (Foreign Key):** Khóa ngoại, liên kết sang cột `id` của bảng khác.
* **UK (Unique Key):** Ràng buộc dữ liệu duy nhất không được trùng lặp.
* **`||--o{`**: Ký hiệu quan hệ 1-N (Một - Nhiều). Ví dụ: 1 Người dùng có thể Đăng Nhiều Bài viết.
