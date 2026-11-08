-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: mini_social
-- ------------------------------------------------------
-- Server version	8.4.1

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
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (1,2,1,'Chào Minh Anh! Hôm nay hệ thống Socialita chạy mượt không bạn?',1,'2026-09-28 01:35:00'),(2,1,2,'Chào Huy! Mượt lắm luôn, các tính năng tương tác bài viết và chat đều ổn định.',1,'2026-09-28 01:37:00'),(3,2,1,'Tuyệt vời quá! Giao diện tông đỏ đen trông hiện đại và rất cuốn hút.',1,'2026-09-28 01:40:00'),(4,1,2,'Cảm ơn bạn nhé! Bạn cùng trải nghiệm thêm xem cần cải thiện gì cứ nhắn mình nha 😊',0,'2026-09-28 01:42:00'),(5,6,1,'Minh Anh ơi, cuối tuần này có rảnh đi cafe không?',1,'2026-09-27 11:00:00'),(6,1,6,'Okie bạn ơi, chiều thứ 7 hẹn ở Phố Cổ nhé!',0,'2026-09-27 11:15:00'),(7,1,2,'Xin chào, test tin nhắn!',0,'2026-09-28 03:50:59'),(8,1,6,'Hi',0,'2026-09-28 03:59:19'),(9,1,2,'Tin nhắn kiểm thử tự động giữa User 1 và User 2',0,'2026-10-04 04:27:56'),(10,1,2,'Tin nhắn kiểm thử tự động giữa User 1 và User 2',0,'2026-10-04 04:29:15'),(11,1,6,'Chào bạn nha',0,'2026-10-04 04:31:54'),(12,1,7,'Hi',0,'2026-10-04 04:34:24'),(13,1,6,'Test',0,'2026-10-05 01:04:46'),(14,2,1,'Minh Anh ơi, chiều mai rảnh không đi cafe học nhóm nhé?',1,'2026-11-06 23:10:04'),(15,1,2,'Oke bạn ơi! Hẹn ở quán nào thế?',1,'2026-11-07 01:10:04'),(16,2,1,'Quán The Coffee House ở phố Thái Hà nhé, tầm 2h chiều nha.',1,'2026-11-07 03:10:04'),(17,1,2,'Được luôn, mai mình mang tài liệu qua cùng bàn nhé!',1,'2026-11-07 05:10:04'),(18,2,1,'Bài đăng hôm qua của bạn chụp ở đâu mà đỉnh thế?',1,'2026-11-07 07:10:04'),(19,1,2,'Ở Hồ Tây lúc hoàng hôn đó bạn, tầm 5h30 chiều là đẹp nhất!',1,'2026-11-07 09:10:04'),(20,2,1,'Uầy mê quá, hôm nào dẫn mình đi chụp ké với nha haha 📸',1,'2026-11-07 11:10:04'),(21,1,2,'Nhất trí luôn, set kèo cuối tuần này đi!',1,'2026-11-07 13:10:04'),(22,3,1,'Minh Anh ơi, chiều mai rảnh không đi cafe học nhóm nhé?',1,'2026-11-06 23:10:04'),(23,1,3,'Oke bạn ơi! Hẹn ở quán nào thế?',1,'2026-11-07 01:10:04'),(24,3,1,'Quán The Coffee House ở phố Thái Hà nhé, tầm 2h chiều nha.',1,'2026-11-07 03:10:04'),(25,1,3,'Được luôn, mai mình mang tài liệu qua cùng bàn nhé!',1,'2026-11-07 05:10:04'),(26,3,1,'Bài đăng hôm qua của bạn chụp ở đâu mà đỉnh thế?',1,'2026-11-07 07:10:04'),(27,1,3,'Ở Hồ Tây lúc hoàng hôn đó bạn, tầm 5h30 chiều là đẹp nhất!',1,'2026-11-07 09:10:04'),(28,3,1,'Uầy mê quá, hôm nào dẫn mình đi chụp ké với nha haha 📸',1,'2026-11-07 11:10:04'),(29,1,3,'Nhất trí luôn, set kèo cuối tuần này đi!',1,'2026-11-07 13:10:04'),(30,4,1,'Minh Anh ơi, chiều mai rảnh không đi cafe học nhóm nhé?',1,'2026-11-06 23:10:04'),(31,1,4,'Oke bạn ơi! Hẹn ở quán nào thế?',1,'2026-11-07 01:10:04'),(32,4,1,'Quán The Coffee House ở phố Thái Hà nhé, tầm 2h chiều nha.',1,'2026-11-07 03:10:04'),(33,1,4,'Được luôn, mai mình mang tài liệu qua cùng bàn nhé!',1,'2026-11-07 05:10:04'),(34,4,1,'Bài đăng hôm qua của bạn chụp ở đâu mà đỉnh thế?',1,'2026-11-07 07:10:04'),(35,1,4,'Ở Hồ Tây lúc hoàng hôn đó bạn, tầm 5h30 chiều là đẹp nhất!',1,'2026-11-07 09:10:04'),(36,4,1,'Uầy mê quá, hôm nào dẫn mình đi chụp ké với nha haha 📸',1,'2026-11-07 11:10:04'),(37,1,4,'Nhất trí luôn, set kèo cuối tuần này đi!',1,'2026-11-07 13:10:04'),(38,5,1,'Minh Anh ơi, chiều mai rảnh không đi cafe học nhóm nhé?',1,'2026-11-06 23:10:04'),(39,1,5,'Oke bạn ơi! Hẹn ở quán nào thế?',1,'2026-11-07 01:10:04'),(40,5,1,'Quán The Coffee House ở phố Thái Hà nhé, tầm 2h chiều nha.',1,'2026-11-07 03:10:04'),(41,1,5,'Được luôn, mai mình mang tài liệu qua cùng bàn nhé!',1,'2026-11-07 05:10:04'),(42,5,1,'Bài đăng hôm qua của bạn chụp ở đâu mà đỉnh thế?',1,'2026-11-07 07:10:04'),(43,1,5,'Ở Hồ Tây lúc hoàng hôn đó bạn, tầm 5h30 chiều là đẹp nhất!',1,'2026-11-07 09:10:04'),(44,5,1,'Uầy mê quá, hôm nào dẫn mình đi chụp ké với nha haha 📸',1,'2026-11-07 11:10:04'),(45,1,5,'Nhất trí luôn, set kèo cuối tuần này đi!',1,'2026-11-07 13:10:04'),(46,6,1,'Minh Anh ơi, chiều mai rảnh không đi cafe học nhóm nhé?',1,'2026-11-06 23:10:04'),(47,1,6,'Oke bạn ơi! Hẹn ở quán nào thế?',1,'2026-11-07 01:10:04'),(48,6,1,'Quán The Coffee House ở phố Thái Hà nhé, tầm 2h chiều nha.',1,'2026-11-07 03:10:04'),(49,1,6,'Được luôn, mai mình mang tài liệu qua cùng bàn nhé!',1,'2026-11-07 05:10:04'),(50,6,1,'Bài đăng hôm qua của bạn chụp ở đâu mà đỉnh thế?',1,'2026-11-07 07:10:04'),(51,1,6,'Ở Hồ Tây lúc hoàng hôn đó bạn, tầm 5h30 chiều là đẹp nhất!',1,'2026-11-07 09:10:04'),(52,6,1,'Uầy mê quá, hôm nào dẫn mình đi chụp ké với nha haha 📸',1,'2026-11-07 11:10:04'),(53,1,6,'Nhất trí luôn, set kèo cuối tuần này đi!',1,'2026-11-07 13:10:04');

/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
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

