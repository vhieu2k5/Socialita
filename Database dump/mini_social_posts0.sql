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
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-10-04 11:42:22
