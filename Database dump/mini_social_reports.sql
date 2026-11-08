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
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reports`
--

LOCK TABLES `reports` WRITE;
/*!40000 ALTER TABLE `reports` DISABLE KEYS */;
INSERT INTO `reports` VALUES (1,1,NULL,5,'Spam / quảng cáo trái phép và có dấu hiệu lừa đảo liên hệ zalo','pending','2026-09-28 00:30:00'),(2,2,3,NULL,'Tài khoản thường xuyên phát tán tin nhắn rác không phù hợp tiêu chuẩn','pending','2026-09-28 01:00:00'),(3,1,4,NULL,'Tài khoản có dấu hiệu spam bình luận quảng cáo dịch vụ cờ bạc','pending','2026-11-06 15:10:04'),(4,2,5,NULL,'Nội dung bài viết vi phạm tiêu chuẩn cộng đồng, sử dụng từ ngữ xúc phạm','resolved','2026-11-05 15:10:04'),(5,3,6,NULL,'Đăng tải hình ảnh chưa xin phép chủ sở hữu','dismissed','2026-11-04 15:10:04'),(6,4,7,NULL,'Tài khoản giả mạo người nổi tiếng để lừa đảo','pending','2026-11-03 15:10:04'),(7,5,9,NULL,'Nội dung sai sự thật gây hoang mang dư luận','resolved','2026-11-02 15:10:04'),(8,6,10,NULL,'Tài khoản có dấu hiệu spam bình luận quảng cáo dịch vụ cờ bạc','dismissed','2026-11-01 15:10:04'),(9,7,11,NULL,'Nội dung bài viết vi phạm tiêu chuẩn cộng đồng, sử dụng từ ngữ xúc phạm','pending','2026-10-31 15:10:04'),(10,9,12,NULL,'Đăng tải hình ảnh chưa xin phép chủ sở hữu','resolved','2026-10-30 15:10:04'),(11,10,13,NULL,'Tài khoản giả mạo người nổi tiếng để lừa đảo','dismissed','2026-10-29 15:10:04'),(12,11,14,NULL,'Nội dung sai sự thật gây hoang mang dư luận','pending','2026-10-28 15:10:04'),(13,12,15,NULL,'Tài khoản có dấu hiệu spam bình luận quảng cáo dịch vụ cờ bạc','resolved','2026-10-27 15:10:04'),(14,13,16,NULL,'Nội dung bài viết vi phạm tiêu chuẩn cộng đồng, sử dụng từ ngữ xúc phạm','dismissed','2026-10-26 15:10:04'),(15,14,17,NULL,'Đăng tải hình ảnh chưa xin phép chủ sở hữu','pending','2026-10-25 15:10:04'),(16,15,18,NULL,'Tài khoản giả mạo người nổi tiếng để lừa đảo','resolved','2026-10-24 15:10:04'),(17,16,19,NULL,'Nội dung sai sự thật gây hoang mang dư luận','dismissed','2026-10-23 15:10:04'),(18,17,20,NULL,'Tài khoản có dấu hiệu spam bình luận quảng cáo dịch vụ cờ bạc','pending','2026-10-22 15:10:04'),(19,18,21,NULL,'Nội dung bài viết vi phạm tiêu chuẩn cộng đồng, sử dụng từ ngữ xúc phạm','resolved','2026-10-21 15:10:04'),(20,19,22,NULL,'Đăng tải hình ảnh chưa xin phép chủ sở hữu','dismissed','2026-10-20 15:10:04');
/*!40000 ALTER TABLE `reports` ENABLE KEYS */;
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
