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
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'minhanh_123','123456','Lê Minh Anh','minhanh@gmail.com','https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop','user','Yêu thích du lịch, công nghệ & đam mê lập trình web 🚀✨','2024-01-10 01:00:00','ĐH Kinh tế TP.HCM (UEH)','Hà Nội','active','2026-10-18 04:56:00'),(2,'quanghuy','123456','Quang Huy','quanghuy@gmail.com','https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop','user','Reviewer công nghệ | Thích xê dịch và chụp ảnh 📸','2024-01-15 02:30:00','Đại học Bách Khoa Hà Nội','Hà Nội','active','2026-10-18 05:29:17'),(3,'fake_account_02','123456','Spam Bot 02','spam999@yahoo.com','https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&h=120&fit=crop','user','Chuyên cung cấp tài khoản game giá rẻ','2025-08-10 07:00:00','Tự do','Toàn quốc','active','2026-09-25 04:20:00'),(4,'admin_thien','123456','Thiện (Admin)','admin.thien@socialita.com','https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&h=120&fit=crop','admin','Quản trị viên hệ thống Socialita 🛡️','2022-12-31 10:00:00','Socialita HQ','TP. Hồ Chí Minh','active','2026-10-05 01:00:19'),(5,'admin','123456','Quản Trị Viên','admin@socialita.vn','https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop','admin','Admin Socialita VN','2022-12-31 17:00:00','Socialita HQ','Hà Nội','active','2026-10-10 13:32:35'),(6,'lananh','123456','Lan Anh','lananh@gmail.com','https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop','user','Yêu du lịch, ẩm thực và những điều bình dị 🌿','2024-03-20 03:15:00','Đại học Kinh tế Quốc dân (NEU)','Hà Nội','active','2026-10-18 05:06:28'),(7,'hoangnam','123456','Hoàng Nam','hoangnam@gmail.com','https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop','user','UI/UX Designer | Photographer 🎨','2024-05-12 07:20:00','Đại học Kiến trúc Hà Nội','Hà Nội','active','2026-09-28 00:45:00'),(9,'testuser','password123','Test User','testuser@gmail.com','https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&h=120&fit=crop','user',NULL,'2026-10-04 03:52:30',NULL,NULL,'active','2026-10-05 01:04:02'),(10,'hieuminh2026','password123','Minh Hi?u','hieuminh2026@gmail.com','https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop','user',NULL,'2026-10-04 03:59:56',NULL,NULL,'active','2026-10-04 04:00:01'),(11,'minhanhle','GoogleAuth_pjud2y36tk','Lê Minh Anh','minhanh.le@gmail.com','https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop','user',NULL,'2026-10-10 13:27:44',NULL,NULL,'active','2026-10-10 13:46:28'),(12,'hoangThuong123','Abc12345@','Hoàng Thương','hoangThuong123@gmail.com','https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&h=120&fit=crop','user',NULL,'2026-10-18 05:19:14',NULL,NULL,'active','2026-10-18 05:19:38'),(13,'maianh_ng','123456','Nguyễn Mai Anh','maianh.ng@gmail.com','https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop','user','Yêu cà phê, mèo và những ngày nắng đẹp ☕🐱','2026-09-20 15:10:03','Đại học Ngoại Thương (FTU)','Hà Nội','active','2026-11-07 15:10:03'),(14,'tuankiet_tran','123456','Trần Tuấn Kiệt','tuankiet.tran@gmail.com','https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop','user','Software Engineer @ TechVN | Thích chạy bộ & guitar 🎸','2026-10-05 15:10:03','Đại học Bách Khoa Hà Nội','Hà Nội','active','2026-11-07 15:10:03'),(15,'baochau_vo','123456','Võ Bảo Châu','baochau.vo@gmail.com','https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&h=120&fit=crop','user','UI/UX Designer | Du lịch khám phá ẩm thực Việt 🍜','2026-10-18 15:10:03','Đại học Kiến Trúc TP.HCM','TP. Hồ Chí Minh','active','2026-11-07 15:10:03'),(16,'minhtri_do','123456','Đỗ Minh Trí','minhtri.do@gmail.com','https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop','user','Data Analyst | Thích đọc sách và leo núi 📚⛰️','2026-11-06 15:10:03','Đại học Kinh Tế Quốc Dân (NEU)','Hà Nội','active','2026-11-07 15:10:03'),(17,'thutrang_vu','123456','Vũ Thu Trang','thutrang.vu@gmail.com','https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop','user','Marketing Specialist | Thích làm bánh & podcast 🎙️','2026-11-01 15:10:03','Đại học RMIT Việt Nam','TP. Hồ Chí Minh','active','2026-11-07 15:10:03'),(18,'vietanh_bui','123456','Bùi Việt Anh','vietanh.bui@gmail.com','https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=120&h=120&fit=crop','user','Nhiếp ảnh gia tự do | Đam mê street style 📸','2026-10-11 15:10:03','Đại học Sân Khấu Điện Ảnh','Đà Nẵng','active','2026-11-07 15:10:03'),(19,'phuongthao_dinh','123456','Đinh Phương Thảo','phuongthao.dinh@gmail.com','https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=120&h=120&fit=crop','user','HR Manager | Lan tỏa năng lượng tích cực ✨🌸','2026-09-11 15:10:03','Đại học Khoa Học Xã Hội & Nhân Văn','Hà Nội','active','2026-11-07 15:10:03'),(20,'duchuy_pham','123456','Phạm Đức Huy','duchuy.pham@gmail.com','https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&h=120&fit=crop','user','Fullstack Dev | Fan cứng Manchester United ⚽💻','2026-10-12 15:10:03','Đại học FPT','Hà Nội','active','2026-11-08 02:33:32'),(21,'khanhvy_le','123456','Lê Khánh Vy','khanhvy.le@gmail.com','https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&h=120&fit=crop','user','MC & Content Creator | Học ngoại ngữ mỗi ngày 🇬🇧🇯🇵','2026-10-20 15:10:03','Học Viện Ngoại Giao','Hà Nội','active','2026-11-07 15:10:03'),(22,'thanhtung_hoang','123456','Hoàng Thanh Tùng','thanhtung.hoang@gmail.com','https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop','user','Kiến trúc sư cảnh quan | Yêu thiên nhiên & cây cỏ 🌿','2026-10-27 15:10:03','Đại học Kiến Trúc Hà Nội','Hà Nội','active','2026-11-07 15:10:03'),(23,'thuychi_tran','123456','Trần Thùy Chi','thuychi.tran@gmail.com','https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=120&h=120&fit=crop','user','Giáo viên Tiếng Anh | Du lịch phượt & cắm trại 🏕️','2026-11-02 15:10:03','Đại học Hà Nội (HANU)','Hải Phòng','active','2026-11-07 15:10:03'),(24,'quangminh_le','123456','Lê Quang Minh','quangminh.le@gmail.com','https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&h=120&fit=crop','user','Founder Startup | Thích công nghệ AI & Web3 🚀','2026-09-16 15:10:03','Đại học Quốc Gia TP.HCM','TP. Hồ Chí Minh','active','2026-11-07 15:10:03'),(25,'huonggiang_ng','123456','Nguyễn Hương Giang','huonggiang.ng@gmail.com','https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=120&h=120&fit=crop','user','Fashion Designer | Yêu nghệ thuật & thời trang bền vững 👗','2026-11-04 15:10:03','Đại học Mỹ Thuật Công Nghiệp','Hà Nội','active','2026-11-07 15:10:03'),(26,'quocbao_phan','123456','Phan Quốc Bảo','quocbao.phan@gmail.com','https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&h=120&fit=crop','user','Product Manager | Thích bơi lội và chạy marathon 🏊‍♂️','2026-09-28 15:10:03','Đại học Kinh Tế TP.HCM (UEH)','TP. Hồ Chí Minh','active','2026-11-07 15:10:03'),(27,'mylinh_duong','123456','Dương Mỹ Linh','mylinh.duong@gmail.com','https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&h=120&fit=crop','user','Biên tập viên | Đọc sách, viết lách và ngắm hoàng hôn 🌅','2026-10-25 15:10:03','Đại học Sư Phạm Hà Nội','Hà Nội','active','2026-11-07 15:10:03'),(28,'vanhung_ngo','123456','Ngô Văn Hùng','vanhung.ngo@gmail.com','https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&h=120&fit=crop','user','Fitness Coach & Gym Enthusiast | Eat clean & stay strong 💪','2026-11-04 15:10:03','Đại học Thể Dục Thể Thao','Đà Nẵng','active','2026-11-07 15:10:03'),(29,'giahan_lam','123456','Lâm Gia Hân','giahan.lam@gmail.com','https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop','user','Food Reviewer | Trải nghiệm ẩm thực 3 miền 🍲🥘','2026-09-29 15:10:03','Đại học Văn Lang','TP. Hồ Chí Minh','active','2026-11-07 15:10:03'),(30,'tuananh_bui','123456','Bùi Tuấn Anh','tuananh.bui@gmail.com','https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=120&h=120&fit=crop','user','Mobile Dev (Flutter/React Native) | Yêu công nghệ 📱','2026-11-02 15:10:03','Đại học Bách Khoa TP.HCM','TP. Hồ Chí Minh','active','2026-11-07 15:10:03'),(31,'kimngan_hoang','123456','Hoàng Kim Ngân','kimngan.hoang@gmail.com','https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&h=120&fit=crop','user','Kế toán viên | Thích đàn piano & xem phim trinh thám 🎹','2026-10-09 15:10:03','Học Viện Tài Chính','Hà Nội','active','2026-11-07 15:10:03'),(32,'ducminh_vu','123456','Vũ Đức Minh','ducminh.vu@gmail.com','https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop','user','Cyber Security Specialist | Ethical Hacker 🛡️🔒','2026-10-26 15:10:03','Học Viện Công Nghệ Bưu Chính Viễn Thông','Hà Nội','active','2026-11-07 15:10:03');
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

-- Dump completed on 2026-11-08  9:50:49
