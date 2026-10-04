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
