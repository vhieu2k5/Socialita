-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: localhost    Database: mini_social
-- ------------------------------------------------------
-- Server version	8.0.46

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `mini_social`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `mini_social` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `mini_social`;

--
-- Table structure for table `activity_logs`
--

DROP TABLE IF EXISTS `activity_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `activity_logs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `action` varchar(255) NOT NULL,
  `details` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `target_user_id` int DEFAULT NULL,
  `target_post_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `target_user_id` (`target_user_id`),
  KEY `target_post_id` (`target_post_id`),
  CONSTRAINT `activity_logs_ibfk_1` FOREIGN KEY (`target_user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `activity_logs_ibfk_2` FOREIGN KEY (`target_post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activity_logs`
--

LOCK TABLES `activity_logs` WRITE;
/*!40000 ALTER TABLE `activity_logs` DISABLE KEYS */;
INSERT INTO `activity_logs` VALUES (1,'USER_REGISTERED','Người dùng Minh Anh đăng ký tài khoản mới','2024-01-10 01:00:00',1,NULL),(2,'POST_CREATED','Minh Anh đăng bài viết chào mừng Socialita','2026-09-28 01:30:00',1,1),(3,'REPORT_CREATED','Minh Anh báo cáo bài viết ID #5 vi phạm tiêu chuẩn spam','2026-09-28 00:30:00',1,5),(4,'REPORT_CREATED','Quang Huy báo cáo tài khoản fake_account_02 vi phạm','2026-09-28 01:00:00',2,NULL),(8,'POST_DELETED','Bài viết ID #7 đã được xóa','2026-09-28 03:52:03',NULL,NULL),(10,'USER_DELETED','Quản trị viên đã xóa tài khoản ID #8','2026-09-28 03:52:10',NULL,NULL);
/*!40000 ALTER TABLE `activity_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `post_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `content` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_comments_post_id` (`post_id`),
  KEY `fk_comments_user_id` (`user_id`),
  CONSTRAINT `fk_comments_post_id` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_comments_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (1,1,2,'Giao diện đỉnh chóp quá bạn ơi! Chúc nền tảng phát triển rực rỡ 🔥','2026-09-28 01:45:00'),(2,1,6,'Chào mừng Socialita! Tông màu đỏ đen này nhìn sang xịn mịn ghê ❤️','2026-09-28 01:50:00'),(3,1,7,'Tuyệt vời, chúc mừng Minh Anh ra mắt dự án!','2026-09-28 02:00:00'),(4,2,1,'Góc làm việc chill quá anh Huy ơi! Thích phong cách này ghê.','2026-09-28 02:20:00'),(5,2,6,'Cà phê ngon cùng view đẹp thì code bao mượt ạ ☕','2026-09-28 02:25:00'),(6,3,1,'Ảnh chụp đẹp xuất sắc Lan Anh ơi! Mùa lúa chín vàng ươm luôn nhỉ 🌾','2026-09-27 10:00:00'),(7,3,2,'Góc chụp này đỉnh quá, thiên nhiên Việt Nam tuyệt vời thật!','2026-09-27 10:10:00'),(9,9,1,'Bình luận kiểm thử hệ thống Socialita!','2026-10-04 04:27:56'),(10,10,1,'Bình luận kiểm thử hệ thống Socialita!','2026-10-04 04:29:15'),(11,11,1,'Hello','2026-10-04 04:35:08');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `friendships`
--

DROP TABLE IF EXISTS `friendships`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `friendships` (
  `user_id1` int NOT NULL,
  `user_id2` int NOT NULL,
  `status` enum('pending','accepted') DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`user_id1`,`user_id2`),
  KEY `fk_friendships_user_id2` (`user_id2`),
  CONSTRAINT `fk_friendships_user_id1` FOREIGN KEY (`user_id1`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_friendships_user_id2` FOREIGN KEY (`user_id2`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `friendships`
--

LOCK TABLES `friendships` WRITE;
/*!40000 ALTER TABLE `friendships` DISABLE KEYS */;
INSERT INTO `friendships` VALUES (1,2,'accepted','2024-02-01 03:00:00'),(1,6,'accepted','2024-04-10 07:00:00'),(2,6,'accepted','2024-04-12 09:30:00'),(7,1,'accepted','2026-09-28 00:30:00');
/*!40000 ALTER TABLE `friendships` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sender_id` int DEFAULT NULL,
  `receiver_id` int DEFAULT NULL,
  `content` text,
  `is_read` tinyint(1) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_messages_sender_id` (`sender_id`),
  KEY `fk_messages_receiver_id` (`receiver_id`),
  CONSTRAINT `fk_messages_receiver_id` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_messages_sender_id` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (1,2,1,'Chào Minh Anh! Hôm nay hệ thống Socialita chạy mượt không bạn?',1,'2026-09-28 01:35:00'),(2,1,2,'Chào Huy! Mượt lắm luôn, các tính năng tương tác bài viết và chat đều ổn định.',1,'2026-09-28 01:37:00'),(3,2,1,'Tuyệt vời quá! Giao diện tông đỏ đen trông hiện đại và rất cuốn hút.',1,'2026-09-28 01:40:00'),(4,1,2,'Cảm ơn bạn nhé! Bạn cùng trải nghiệm thêm xem cần cải thiện gì cứ nhắn mình nha 😊',0,'2026-09-28 01:42:00'),(5,6,1,'Minh Anh ơi, cuối tuần này có rảnh đi cafe không?',1,'2026-09-27 11:00:00'),(6,1,6,'Okie bạn ơi, chiều thứ 7 hẹn ở Phố Cổ nhé!',0,'2026-09-27 11:15:00'),(7,1,2,'Xin chào, test tin nhắn!',0,'2026-09-28 03:50:59'),(8,1,6,'Hi',0,'2026-09-28 03:59:19'),(9,1,2,'Tin nhắn kiểm thử tự động giữa User 1 và User 2',0,'2026-10-04 04:27:56'),(10,1,2,'Tin nhắn kiểm thử tự động giữa User 1 và User 2',0,'2026-10-04 04:29:15'),(11,1,6,'Chào bạn nha',0,'2026-10-04 04:31:54'),(12,1,7,'Hi',0,'2026-10-04 04:34:24');
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `content` text NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `location` varchar(50) DEFAULT NULL,
  `gradient` varchar(255) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status` enum('active','hidden') DEFAULT 'active',
  PRIMARY KEY (`id`),
  KEY `fk_posts_user_id` (`user_id`),
  CONSTRAINT `fk_posts_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,1,'Chào mừng mọi người đến với mạng xã hội Socialita! Nơi kết nối thật và chia sẻ là chính bạn. Rất vui được đồng hành cùng cộng đồng công nghệ hôm nay! 🚀✨',NULL,'2026-09-28 01:30:00','Hà Nội','linear-gradient(180deg, #18191a 0%, #242526 50%, #7a1d26 100%)','2026-09-28 03:41:02','active'),(2,2,'Góc làm việc cuối tuần nhẹ nhàng với ly cà phê đậm đà. Chúc cả nhà một ngày tràn đầy năng lượng và làm việc hiệu quả nhé! ☕💻',NULL,'2026-09-28 02:15:00','Đà Lạt','linear-gradient(135deg, #1b4b43 0%, #0d2924 100%)','2026-09-28 03:41:02','active'),(3,6,'Chuyến đi Mù Cang Chải ngắm mùa vàng bậc thang đẹp như một bức tranh thuỷ mặc! Đất nước mình còn bao nhiêu cảnh đẹp đang chờ khám phá 🌾⛰️',NULL,'2026-09-27 09:45:00','Yên Bái','linear-gradient(135deg, #4a1d4b 0%, #1f0d29 100%)','2026-09-28 03:41:02','active'),(4,7,'Vừa hoàn thiện xong concept giao diện tối giản cho Socialita. Tông đỏ đen sang trọng, rất mong nhận được góp ý của anh em! 🎨📱',NULL,'2026-09-26 11:20:00','Hà Nội','linear-gradient(135deg, #2b2d3d 0%, #1c1d2b 100%)','2026-09-28 03:41:02','active'),(5,3,'Bán tài khoản game giá rẻ, ib zalo 0987654xxx... liên hệ ngay kẻo hết ưu đãi sốc hôm nay!!',NULL,'2026-09-28 00:00:00','Toàn quốc','linear-gradient(180deg, #18191a 0%, #242526 50%, #7a1d26 100%)','2026-09-28 03:41:02','active'),(8,10,'Xin ch�o Socialita! D�y l� b�i vi?t ki?m th? k?t n?i Front-end & Back-end t? t�i kho?n m?i.',NULL,'2026-10-04 04:00:08','S�i G�n','linear-gradient(180deg, #18191a 0%, #242526 50%, #7a1d26 100%)','2026-10-04 04:00:08','active'),(9,1,'Bài viết kiểm thử tự động kèm ảnh và check-in Đà Lạt 🌸','https://images.unsplash.com/photo-1506744038136-46273834b3fb','2026-10-04 04:27:56','Đà Lạt, Lâm Đồng','linear-gradient(180deg, #18191a 0%, #242526 50%, #7a1d26 100%)','2026-10-04 04:27:56','active'),(10,1,'Bài viết kiểm thử tự động kèm ảnh và check-in Đà Lạt 🌸','https://images.unsplash.com/photo-1506744038136-46273834b3fb','2026-10-04 04:29:15','Đà Lạt, Lâm Đồng','linear-gradient(180deg, #18191a 0%, #242526 50%, #7a1d26 100%)','2026-10-04 04:29:15','active'),(11,1,'Hello, test01','http://localhost:8080/uploads/post-1791088398894-438529577.jpg','2026-10-04 04:33:18','Hà Nội',NULL,'2026-10-04 04:33:18','active');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reactions`
--

DROP TABLE IF EXISTS `reactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reactions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `post_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `type` enum('love','like','haha','wow','sad','angry') DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_reactions_post_id` (`post_id`),
  KEY `fk_reactions_user_id` (`user_id`),
  CONSTRAINT `fk_reactions_post_id` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_reactions_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reactions`
--

LOCK TABLES `reactions` WRITE;
/*!40000 ALTER TABLE `reactions` DISABLE KEYS */;
INSERT INTO `reactions` VALUES (2,1,2,'love','2026-09-28 03:41:02'),(3,1,6,'love','2026-09-28 03:41:02'),(4,1,7,'love','2026-09-28 03:41:02'),(5,2,1,'love','2026-09-28 03:41:02'),(6,2,6,'like','2026-09-28 03:41:02'),(7,2,7,'love','2026-09-28 03:41:02'),(8,3,1,'love','2026-09-28 03:41:02'),(9,3,2,'love','2026-09-28 03:41:02'),(10,3,7,'like','2026-09-28 03:41:02'),(11,4,1,'love','2026-09-28 03:41:02'),(12,4,2,'love','2026-09-28 03:41:02'),(14,1,1,'love','2026-10-04 04:22:05'),(15,9,1,'love','2026-10-04 04:27:56'),(16,10,1,'love','2026-10-04 04:29:15'),(17,11,1,'love','2026-10-04 04:35:04');
/*!40000 ALTER TABLE `reactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reports`
--

DROP TABLE IF EXISTS `reports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reports` (
  `id` int NOT NULL AUTO_INCREMENT,
  `reporter_id` int NOT NULL,
  `reported_user_id` int DEFAULT NULL,
  `reported_post_id` int DEFAULT NULL,
  `reason` text NOT NULL,
  `status` enum('pending','resolved','dismissed') DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `reporter_id` (`reporter_id`),
  KEY `reported_user_id` (`reported_user_id`),
  KEY `reported_post_id` (`reported_post_id`),
  CONSTRAINT `reports_ibfk_1` FOREIGN KEY (`reporter_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `reports_ibfk_2` FOREIGN KEY (`reported_user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `reports_ibfk_3` FOREIGN KEY (`reported_post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reports`
--

LOCK TABLES `reports` WRITE;
/*!40000 ALTER TABLE `reports` DISABLE KEYS */;
INSERT INTO `reports` VALUES (1,1,NULL,5,'Spam / quảng cáo trái phép và có dấu hiệu lừa đảo liên hệ zalo','pending','2026-09-28 00:30:00'),(2,2,3,NULL,'Tài khoản thường xuyên phát tán tin nhắn rác không phù hợp tiêu chuẩn','pending','2026-09-28 01:00:00');
/*!40000 ALTER TABLE `reports` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) DEFAULT NULL,
  `password_hash` varchar(255) DEFAULT NULL,
  `full_name` varchar(100) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `avatar_url` varchar(255) DEFAULT NULL,
  `roles` enum('admin','user') DEFAULT NULL,
  `bio` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `school` varchar(100) DEFAULT NULL,
  `liveIn` varchar(100) DEFAULT NULL,
  `status` enum('active','locked') DEFAULT 'active',
  `last_login_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `uq_users_email` (`email`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'minhanh_123','123456','Lê Minh Anh','minhanh@gmail.com','default_avatar.jpg','user','Yêu thích du lịch, công nghệ & đam mê lập trình web 🚀✨','2024-01-10 01:00:00','ĐH Kinh tế TP.HCM (UEH)','Hà Nội','active','2026-10-04 04:31:42'),(2,'quanghuy','123456','Quang Huy','quanghuy@gmail.com',NULL,'user','Reviewer công nghệ | Thích xê dịch và chụp ảnh 📸','2024-01-15 02:30:00','Đại học Bách Khoa Hà Nội','Hà Nội','active','2026-10-04 04:08:17'),(3,'fake_account_02','123456','Spam Bot 02','spam999@yahoo.com',NULL,'user','Chuyên cung cấp tài khoản game giá rẻ','2025-08-10 07:00:00','Tự do','Toàn quốc','active','2026-09-25 04:20:00'),(4,'admin_thien','123456','Thiện (Admin)','admin.thien@socialita.com',NULL,'admin','Quản trị viên hệ thống Socialita 🛡️','2022-12-31 10:00:00','Socialita HQ','TP. Hồ Chí Minh','active','2026-10-04 04:37:15'),(5,'admin','123456','Quản Trị Viên','admin@socialita.vn',NULL,'admin','Admin Socialita VN','2022-12-31 17:00:00','Socialita HQ','Hà Nội','active','2026-10-01 02:05:53'),(6,'lananh','123456','Lan Anh','lananh@gmail.com',NULL,'user','Yêu du lịch, ẩm thực và những điều bình dị 🌿','2024-03-20 03:15:00','Đại học Kinh tế Quốc dân (NEU)','Hà Nội','active','2026-09-28 01:00:00'),(7,'hoangnam','123456','Hoàng Nam','hoangnam@gmail.com',NULL,'user','UI/UX Designer | Photographer 🎨','2024-05-12 07:20:00','Đại học Kiến trúc Hà Nội','Hà Nội','active','2026-09-28 00:45:00'),(9,'testuser','password123','Test User','testuser@gmail.com',NULL,'user',NULL,'2026-10-04 03:52:30',NULL,NULL,'active','2026-10-04 04:31:20'),(10,'hieuminh2026','password123','Minh Hi?u','hieuminh2026@gmail.com',NULL,'user',NULL,'2026-10-04 03:59:56',NULL,NULL,'active','2026-10-04 04:00:01');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-10-04 11:42:22
