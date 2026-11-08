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
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activity_logs`
--

LOCK TABLES `activity_logs` WRITE;
/*!40000 ALTER TABLE `activity_logs` DISABLE KEYS */;
INSERT INTO `activity_logs` VALUES (1,'USER_REGISTERED','Người dùng Minh Anh đăng ký tài khoản mới','2024-01-10 01:00:00',1,NULL),(2,'POST_CREATED','Minh Anh đăng bài viết chào mừng Socialita','2026-09-28 01:30:00',1,1),(3,'REPORT_CREATED','Minh Anh báo cáo bài viết ID #5 vi phạm tiêu chuẩn spam','2026-09-28 00:30:00',1,5),(4,'REPORT_CREATED','Quang Huy báo cáo tài khoản fake_account_02 vi phạm','2026-09-28 01:00:00',2,NULL),(8,'POST_DELETED','Bài viết ID #7 đã được xóa','2026-09-28 03:52:03',NULL,NULL),(10,'USER_DELETED','Quản trị viên đã xóa tài khoản ID #8','2026-09-28 03:52:10',NULL,NULL),(11,'LOGIN','Đăng nhập thành công từ IP 192.168.1.15','2026-11-07 14:10:04',1,NULL),(12,'CREATE_POST','Đăng bài viết mới thành công','2026-11-07 11:10:04',2,NULL),(13,'ACCEPT_FRIEND','Đã chấp nhận lời mời kết bạn','2026-11-07 08:10:04',3,NULL),(14,'UPDATE_PROFILE','Cập nhật ảnh đại diện và tiểu sử cá nhân','2026-11-07 05:10:04',4,NULL),(15,'REACT_POST','Thả cảm xúc yêu thích vào bài viết','2026-11-07 02:10:04',5,NULL),(16,'LOGIN','Đăng nhập thành công từ IP 192.168.1.15','2026-11-06 23:10:04',6,NULL),(17,'CREATE_POST','Đăng bài viết mới thành công','2026-11-06 20:10:04',7,NULL),(18,'ACCEPT_FRIEND','Đã chấp nhận lời mời kết bạn','2026-11-06 17:10:04',9,NULL),(19,'UPDATE_PROFILE','Cập nhật ảnh đại diện và tiểu sử cá nhân','2026-11-06 14:10:04',10,NULL),(20,'REACT_POST','Thả cảm xúc yêu thích vào bài viết','2026-11-06 11:10:04',11,NULL),(21,'LOGIN','Đăng nhập thành công từ IP 192.168.1.15','2026-11-06 08:10:04',12,NULL),(22,'CREATE_POST','Đăng bài viết mới thành công','2026-11-06 05:10:04',13,NULL),(23,'ACCEPT_FRIEND','Đã chấp nhận lời mời kết bạn','2026-11-06 02:10:04',14,NULL),(24,'UPDATE_PROFILE','Cập nhật ảnh đại diện và tiểu sử cá nhân','2026-11-05 23:10:04',15,NULL),(25,'REACT_POST','Thả cảm xúc yêu thích vào bài viết','2026-11-05 20:10:04',16,NULL),(26,'LOGIN','Đăng nhập thành công từ IP 192.168.1.15','2026-11-05 17:10:04',17,NULL),(27,'CREATE_POST','Đăng bài viết mới thành công','2026-11-05 14:10:04',18,NULL),(28,'ACCEPT_FRIEND','Đã chấp nhận lời mời kết bạn','2026-11-05 11:10:04',19,NULL),(29,'UPDATE_PROFILE','Cập nhật ảnh đại diện và tiểu sử cá nhân','2026-11-05 08:10:04',20,NULL),(30,'REACT_POST','Thả cảm xúc yêu thích vào bài viết','2026-11-05 05:10:04',21,NULL),(31,'LOGIN','Đăng nhập thành công từ IP 192.168.1.15','2026-11-05 02:10:04',22,NULL),(32,'CREATE_POST','Đăng bài viết mới thành công','2026-11-04 23:10:04',23,NULL),(33,'ACCEPT_FRIEND','Đã chấp nhận lời mời kết bạn','2026-11-04 20:10:04',24,NULL),(34,'UPDATE_PROFILE','Cập nhật ảnh đại diện và tiểu sử cá nhân','2026-11-04 17:10:04',25,NULL),(35,'REACT_POST','Thả cảm xúc yêu thích vào bài viết','2026-11-04 14:10:04',26,NULL),(36,'LOGIN','Đăng nhập thành công từ IP 192.168.1.15','2026-11-04 11:10:04',27,NULL),(37,'CREATE_POST','Đăng bài viết mới thành công','2026-11-04 08:10:04',28,NULL),(38,'ACCEPT_FRIEND','Đã chấp nhận lời mời kết bạn','2026-11-04 05:10:04',29,NULL),(39,'UPDATE_PROFILE','Cập nhật ảnh đại diện và tiểu sử cá nhân','2026-11-04 02:10:04',30,NULL),(40,'REACT_POST','Thả cảm xúc yêu thích vào bài viết','2026-11-03 23:10:04',31,NULL);
/*!40000 ALTER TABLE `activity_logs` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-11-08  9:50:49
