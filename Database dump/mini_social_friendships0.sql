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
INSERT INTO `friendships` VALUES (1,2,'accepted','2024-02-01 03:00:00'),(1,3,'accepted','2026-10-27 15:10:03'),(1,4,'accepted','2026-09-13 15:10:03'),(1,5,'accepted','2026-09-14 15:10:03'),(1,6,'accepted','2024-04-10 07:00:00'),(1,7,'accepted','2026-10-07 15:10:03'),(1,9,'accepted','2026-09-24 15:10:03'),(1,10,'accepted','2026-10-12 15:10:03'),(1,11,'accepted','2026-08-21 15:10:03'),(1,12,'accepted','2026-10-07 15:10:03'),(2,5,'accepted','2026-07-09 15:10:03'),(2,6,'accepted','2024-04-12 09:30:00'),(3,6,'accepted','2026-07-27 15:10:03'),(4,7,'accepted','2026-10-12 15:10:03'),(5,9,'accepted','2026-09-10 15:10:03'),(6,10,'accepted','2026-08-10 15:10:03'),(7,1,'accepted','2026-09-28 00:30:00'),(7,11,'accepted','2026-10-12 15:10:03'),(9,12,'accepted','2026-08-01 15:10:03'),(10,13,'accepted','2026-09-19 15:10:03'),(11,14,'accepted','2026-09-02 15:10:03'),(12,15,'accepted','2026-09-11 15:10:03'),(13,1,'pending','2026-10-31 15:10:03'),(13,16,'accepted','2026-08-15 15:10:03'),(14,1,'pending','2026-10-31 15:10:03'),(14,17,'accepted','2026-07-08 15:10:03'),(15,1,'pending','2026-11-02 15:10:03'),(15,18,'accepted','2026-07-14 15:10:03'),(16,1,'pending','2026-11-04 15:10:03'),(16,19,'accepted','2026-08-12 15:10:03'),(17,1,'pending','2026-11-06 15:10:03'),(17,20,'accepted','2026-08-14 15:10:03'),(18,21,'accepted','2026-09-29 15:10:03'),(19,22,'accepted','2026-09-11 15:10:03'),(20,23,'accepted','2026-09-28 15:10:03'),(21,24,'accepted','2026-10-11 15:10:03'),(22,25,'accepted','2026-10-26 15:10:03'),(23,26,'accepted','2026-08-06 15:10:03'),(24,27,'accepted','2026-09-05 15:10:03'),(25,28,'accepted','2026-10-05 15:10:03'),(26,29,'accepted','2026-08-09 15:10:03'),(27,30,'accepted','2026-07-22 15:10:03'),(28,31,'accepted','2026-10-13 15:10:03'),(29,32,'accepted','2026-10-03 15:10:03'),(30,2,'accepted','2026-08-02 15:10:03'),(31,3,'accepted','2026-10-22 15:10:03'),(32,4,'accepted','2026-10-16 15:10:03');
/*!40000 ALTER TABLE `friendships` ENABLE KEYS */;
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
