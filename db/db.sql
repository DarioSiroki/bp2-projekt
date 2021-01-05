CREATE DATABASE  IF NOT EXISTS `task_manager` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `task_manager`;
-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: task_manager
-- ------------------------------------------------------
-- Server version	8.0.22

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `dodijeljen`
--

DROP TABLE IF EXISTS `dodijeljen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dodijeljen` (
  `korisnik_id` int NOT NULL,
  `zadatak_id` int NOT NULL,
  PRIMARY KEY (`korisnik_id`,`zadatak_id`),
  KEY `dodijeljen_zadatak_id_idx` (`zadatak_id`),
  CONSTRAINT `dodijeljen_korisnik_id` FOREIGN KEY (`korisnik_id`) REFERENCES `korisnik` (`korisnik_id`),
  CONSTRAINT `dodijeljen_zadatak_id` FOREIGN KEY (`zadatak_id`) REFERENCES `zadatak` (`zadatak_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dodijeljen`
--

LOCK TABLES `dodijeljen` WRITE;
/*!40000 ALTER TABLE `dodijeljen` DISABLE KEYS */;
/*!40000 ALTER TABLE `dodijeljen` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dopustenje`
--

DROP TABLE IF EXISTS `dopustenje`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dopustenje` (
  `korisnik_id` int NOT NULL,
  `privilegija_id` int NOT NULL,
  `organizacija_id` int NOT NULL,
  PRIMARY KEY (`korisnik_id`,`privilegija_id`,`organizacija_id`),
  KEY `privilegija_id_idx` (`privilegija_id`),
  KEY `organizacija_id_idx` (`organizacija_id`),
  CONSTRAINT `korisnik_id` FOREIGN KEY (`korisnik_id`) REFERENCES `korisnik` (`korisnik_id`),
  CONSTRAINT `organizacija_id` FOREIGN KEY (`organizacija_id`) REFERENCES `organizacija` (`organizacija_id`),
  CONSTRAINT `privilegija_id` FOREIGN KEY (`privilegija_id`) REFERENCES `privilegija` (`privilegija_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dopustenje`
--

LOCK TABLES `dopustenje` WRITE;
/*!40000 ALTER TABLE `dopustenje` DISABLE KEYS */;
/*!40000 ALTER TABLE `dopustenje` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `komentar`
--

DROP TABLE IF EXISTS `komentar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `komentar` (
  `komentar_id` int NOT NULL AUTO_INCREMENT,
  `tekst` varchar(45) NOT NULL,
  `kreiran` datetime DEFAULT CURRENT_TIMESTAMP,
  `korisnik_id` int NOT NULL,
  `zadatak_id` int NOT NULL,
  PRIMARY KEY (`komentar_id`),
  KEY `komentar_zadatak_id_idx` (`zadatak_id`),
  KEY `komentar_korisnik_id_idx` (`korisnik_id`),
  CONSTRAINT `komentar_korisnik_id` FOREIGN KEY (`korisnik_id`) REFERENCES `korisnik` (`korisnik_id`),
  CONSTRAINT `komentar_zadatak_id` FOREIGN KEY (`zadatak_id`) REFERENCES `zadatak` (`zadatak_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `komentar`
--

LOCK TABLES `komentar` WRITE;
/*!40000 ALTER TABLE `komentar` DISABLE KEYS */;
/*!40000 ALTER TABLE `komentar` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `korisnik`
--

DROP TABLE IF EXISTS `korisnik`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `korisnik` (
  `korisnik_id` int NOT NULL AUTO_INCREMENT,
  `ime` varchar(45) NOT NULL,
  `prezime` varchar(45) NOT NULL,
  `nadimak` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `lozinka` varchar(72) NOT NULL,
  `slika_url` varchar(200) NOT NULL,
  `kreirano` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`korisnik_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `korisnik`
--

LOCK TABLES `korisnik` WRITE;
/*!40000 ALTER TABLE `korisnik` DISABLE KEYS */;
INSERT INTO `korisnik` VALUES (1,'Dario','Široki','Daro','dario.siroki@gmail.com','1234','https://i.imgur.com/Ko83g22.png','2021-01-02 20:20:48'),(2,'Damjan','Široki','Damo','damjan.siroki@gmail.com','1234','https://i.imgur.com/Ko83g22.png','2021-01-02 20:20:49'),(3,'Miroslav','Široki','Miro','miroslav.siroki@gmail.com','1234','https://i.imgur.com/Ko83g22.png','2021-01-02 20:20:49'),(4,'Luka','Lukic','Lukizijo','luka.lukizijo@gmail.com','1234','https://i.imgur.com/Ko83g22.png','2021-01-02 20:20:49'),(5,'Marko','Marković','Marek','marko.markovic@gmail.com','1234','https://i.imgur.com/Ko83g22.png','2021-01-02 20:20:49'),(6,'Darko','Darković','Darek','darko.darkovic@gmail.com','1234','https://i.imgur.com/Ko83g22.png','2021-01-02 20:20:49'),(7,'Barica','Barić','Bara','barica.baric@gmail.com','1234','https://i.imgur.com/Ko83g22.png','2021-01-02 20:20:49');
/*!40000 ALTER TABLE `korisnik` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `organizacija`
--

DROP TABLE IF EXISTS `organizacija`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `organizacija` (
  `organizacija_id` int NOT NULL AUTO_INCREMENT,
  `naziv` varchar(45) NOT NULL,
  `slika_url` varchar(200) NOT NULL,
  `kreirano` datetime DEFAULT CURRENT_TIMESTAMP,
  `kreator_id` int NOT NULL,
  PRIMARY KEY (`organizacija_id`),
  KEY `kreator_id_idx` (`kreator_id`),
  CONSTRAINT `kreator_id` FOREIGN KEY (`kreator_id`) REFERENCES `korisnik` (`korisnik_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `organizacija`
--

LOCK TABLES `organizacija` WRITE;
/*!40000 ALTER TABLE `organizacija` DISABLE KEYS */;
INSERT INTO `organizacija` VALUES (1,'Podravka','https://i.imgur.com/9GUHgmH.jpg','2021-01-02 20:27:10',1),(2,'Lukaps','https://i.imgur.com/9GUHgmH.jpg','2021-01-02 20:27:10',2);
/*!40000 ALTER TABLE `organizacija` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prioritet`
--

DROP TABLE IF EXISTS `prioritet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prioritet` (
  `prioritet_id` int NOT NULL AUTO_INCREMENT,
  `naziv` varchar(20) NOT NULL,
  PRIMARY KEY (`prioritet_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prioritet`
--

LOCK TABLES `prioritet` WRITE;
/*!40000 ALTER TABLE `prioritet` DISABLE KEYS */;
/*!40000 ALTER TABLE `prioritet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pripada`
--

DROP TABLE IF EXISTS `pripada`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pripada` (
  `korisnik_id` int NOT NULL,
  `organizacija_id` int NOT NULL,
  PRIMARY KEY (`korisnik_id`,`organizacija_id`),
  KEY `organizacija_id_idx` (`organizacija_id`),
  CONSTRAINT `pripada_korisnik_id` FOREIGN KEY (`korisnik_id`) REFERENCES `korisnik` (`korisnik_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pripada_organizacija_id` FOREIGN KEY (`organizacija_id`) REFERENCES `organizacija` (`organizacija_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pripada`
--

LOCK TABLES `pripada` WRITE;
/*!40000 ALTER TABLE `pripada` DISABLE KEYS */;
/*!40000 ALTER TABLE `pripada` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `privilegija`
--

DROP TABLE IF EXISTS `privilegija`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `privilegija` (
  `privilegija_id` int NOT NULL AUTO_INCREMENT,
  `naziv` varchar(20) NOT NULL,
  `opis` varchar(200) NOT NULL,
  PRIMARY KEY (`privilegija_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `privilegija`
--

LOCK TABLES `privilegija` WRITE;
/*!40000 ALTER TABLE `privilegija` DISABLE KEYS */;
INSERT INTO `privilegija` VALUES (1,'admin','Potpune ovlasti nad organizacijom.');
/*!40000 ALTER TABLE `privilegija` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `privitak`
--

DROP TABLE IF EXISTS `privitak`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `privitak` (
  `privitak_id` int NOT NULL AUTO_INCREMENT,
  `naziv` varchar(100) NOT NULL,
  `putanja` varchar(200) NOT NULL,
  `zadatak_id` int NOT NULL,
  PRIMARY KEY (`privitak_id`),
  KEY `privitak_zadatak_id_idx` (`zadatak_id`),
  CONSTRAINT `privitak_zadatak_id` FOREIGN KEY (`zadatak_id`) REFERENCES `zadatak` (`zadatak_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `privitak`
--

LOCK TABLES `privitak` WRITE;
/*!40000 ALTER TABLE `privitak` DISABLE KEYS */;
/*!40000 ALTER TABLE `privitak` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projekt`
--

DROP TABLE IF EXISTS `projekt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projekt` (
  `projekt_id` int NOT NULL AUTO_INCREMENT,
  `naziv` varchar(45) NOT NULL,
  `opis` varchar(100) NOT NULL,
  `organizacija_id` int NOT NULL,
  `kreator_id` int NOT NULL,
  PRIMARY KEY (`projekt_id`),
  KEY `projekt_organizacija_id_idx` (`organizacija_id`),
  KEY `projekt_kreator_id_idx` (`kreator_id`),
  CONSTRAINT `projekt_kreator_id` FOREIGN KEY (`kreator_id`) REFERENCES `korisnik` (`korisnik_id`),
  CONSTRAINT `projekt_organizacija_id` FOREIGN KEY (`organizacija_id`) REFERENCES `organizacija` (`organizacija_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projekt`
--

LOCK TABLES `projekt` WRITE;
/*!40000 ALTER TABLE `projekt` DISABLE KEYS */;
/*!40000 ALTER TABLE `projekt` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `status`
--

DROP TABLE IF EXISTS `status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `status` (
  `status_id` int NOT NULL AUTO_INCREMENT,
  `naziv` varchar(45) NOT NULL,
  `opis` varchar(45) NOT NULL,
  PRIMARY KEY (`status_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `status`
--

LOCK TABLES `status` WRITE;
/*!40000 ALTER TABLE `status` DISABLE KEYS */;
/*!40000 ALTER TABLE `status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `zadatak`
--

DROP TABLE IF EXISTS `zadatak`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `zadatak` (
  `zadatak_id` int NOT NULL AUTO_INCREMENT,
  `instrukcije` varchar(10000) NOT NULL,
  `kreirano` datetime DEFAULT CURRENT_TIMESTAMP,
  `azurirano` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status_id` int NOT NULL,
  `projekt_id` int NOT NULL,
  `organizacija_id` int NOT NULL,
  `kreator_id` int NOT NULL,
  `prioritet_id` int NOT NULL,
  PRIMARY KEY (`zadatak_id`),
  KEY `zadatak_status_id_idx` (`status_id`),
  KEY `zadatak_projekt_id_idx` (`projekt_id`),
  KEY `zadatak_organizacija_id_idx` (`organizacija_id`),
  KEY `zadatak_kreator_id_idx` (`kreator_id`),
  KEY `zadatak_prioritet_id_idx` (`prioritet_id`),
  CONSTRAINT `zadatak_kreator_id` FOREIGN KEY (`kreator_id`) REFERENCES `korisnik` (`korisnik_id`),
  CONSTRAINT `zadatak_organizacija_id` FOREIGN KEY (`organizacija_id`) REFERENCES `organizacija` (`organizacija_id`),
  CONSTRAINT `zadatak_prioritet_id` FOREIGN KEY (`prioritet_id`) REFERENCES `prioritet` (`prioritet_id`),
  CONSTRAINT `zadatak_projekt_id` FOREIGN KEY (`projekt_id`) REFERENCES `projekt` (`projekt_id`),
  CONSTRAINT `zadatak_status_id` FOREIGN KEY (`status_id`) REFERENCES `status` (`status_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `zadatak`
--

LOCK TABLES `zadatak` WRITE;
/*!40000 ALTER TABLE `zadatak` DISABLE KEYS */;
/*!40000 ALTER TABLE `zadatak` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'task_manager'
--

--
-- Dumping routines for database 'task_manager'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-01-02 21:52:47
