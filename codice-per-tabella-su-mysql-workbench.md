CREATE DATABASE IF NOT EXISTS `bool_shop` /_!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci _/ /_!80016 DEFAULT ENCRYPTION='N' _/;
USE `bool_shop`;
-- MySQL dump 10.13 Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost Database: bool_shop

---

-- Server version 8.0.42

/_!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT _/;
/_!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS _/;
/_!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION _/;
/_!50503 SET NAMES utf8 _/;
/_!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE _/;
/_!40103 SET TIME_ZONE='+00:00' _/;
/_!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 _/;
/_!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 _/;
/_!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' _/;
/_!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 _/;

--
-- Table structure for table `data_checkout`
--

DROP TABLE IF EXISTS `data_checkout`;
/_!40101 SET @saved_cs_client = @@character_set_client _/;
/_!50503 SET character_set_client = utf8mb4 _/;
CREATE TABLE `data_checkout` (
`id_data_checkout` int NOT NULL AUTO_INCREMENT,
`name` varchar(100) NOT NULL,
`surname` varchar(100) NOT NULL,
`address` varchar(255) NOT NULL,
`phone` varchar(20) NOT NULL,
`email` varchar(255) NOT NULL,
PRIMARY KEY (`id_data_checkout`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/_!40101 SET character_set_client = @saved_cs_client _/;

--
-- Dumping data for table `data_checkout`
--

LOCK TABLES `data_checkout` WRITE;
/_!40000 ALTER TABLE `data_checkout` DISABLE KEYS _/;
/_!40000 ALTER TABLE `data_checkout` ENABLE KEYS _/;
UNLOCK TABLES;

--
-- Table structure for table `data_popup`
--

DROP TABLE IF EXISTS `data_popup`;
/_!40101 SET @saved_cs_client = @@character_set_client _/;
/_!50503 SET character_set_client = utf8mb4 _/;
CREATE TABLE `data_popup` (
`id_data_popup` int NOT NULL AUTO_INCREMENT,
`name` varchar(100) NOT NULL,
`surname` varchar(100) NOT NULL,
`email` varchar(255) NOT NULL,
PRIMARY KEY (`id_data_popup`),
UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/_!40101 SET character_set_client = @saved_cs_client _/;

--
-- Dumping data for table `data_popup`
--

LOCK TABLES `data_popup` WRITE;
/_!40000 ALTER TABLE `data_popup` DISABLE KEYS _/;
INSERT INTO `data_popup` VALUES (26,'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa','Rossi','boolean.144@gmail.com');
/_!40000 ALTER TABLE `data_popup` ENABLE KEYS _/;
UNLOCK TABLES;

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/_!40101 SET @saved_cs_client = @@character_set_client _/;
/_!50503 SET character_set_client = utf8mb4 _/;
CREATE TABLE `images` (
`id_image` int NOT NULL AUTO_INCREMENT,
`id_sneaker` int NOT NULL,
`url` varchar(255) NOT NULL,
PRIMARY KEY (`id_image`),
KEY `id_sneaker` (`id_sneaker`),
CONSTRAINT `images_ibfk_1` FOREIGN KEY (`id_sneaker`) REFERENCES `sneakers` (`id_sneaker`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=94 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/_!40101 SET character_set_client = @saved_cs_client _/;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/_!40000 ALTER TABLE `images` DISABLE KEYS _/;
INSERT INTO `images` VALUES (1,11,'Nike_Dunk_Low_Retro.jpg'),(2,11,'Nike_Dunk_Low_Retro1.jpg'),(3,11,'Nike_Dunk_Low_Retro2.jpg'),(4,11,'Nike_Dunk_Low_Retro3.jpg'),(5,17,'Reebok_Classic_LEATHER.jpg'),(6,17,'Reebok_Classic_LEATHER1.jpg'),(7,17,'Reebok_Classic_LEATHER2.jpg'),(8,16,'Vans_SK8_Hi.jpg'),(9,16,'Vans_SK8_Hi1.jpg'),(10,16,'Vans_SK8_Hi2.jpg'),(11,12,'adidas_forum_low.jpg'),(12,12,'adidas_forum_low1.jpg'),(13,12,'adidas_forum_low2.jpg'),(14,22,'adidas_gazelle.jpg'),(15,22,'adidas_gazelle1.jpg'),(16,22,'adidas_gazelle2.jpg'),(17,2,'adidas_ultraboost_22.jpg'),(18,2,'adidas_ultraboost_22_1.jpg'),(19,2,'adidas_ultraboost_22_2.jpg'),(20,8,'asics_gel_kayano30.jpg'),(21,8,'asics_gel_kayano30_1.jpg'),(22,8,'asics_gel_kayano30_2.jpg'),(23,18,'asics_gel_nyc.jpg'),(24,18,'asics_gel_nyc1.jpg'),(25,18,'asics_gel_nyc2.jpg'),(26,28,'asics_gt2160.jpg'),(27,28,'asics_gt2160_1.jpg'),(28,28,'asics_gt2160_3.jpg'),(29,5,'converce_chuck_taylor_all_star.jpg'),(30,5,'converce_chuck_taylor_all_star_1.jpg'),(31,5,'converce_chuck_taylor_all_star_2.jpg'),(32,25,'converse_chuck70.jpg'),(33,25,'converse_chuck70_1.jpg'),(34,25,'converse_chuck70_2.jpg'),(35,25,'converse_chuck70_3.jpg'),(36,15,'converse_run_star_hike.jpg'),(37,15,'converse_run_star_hike1.jpg'),(38,15,'converse_run_star_hike2.jpg'),(39,29,'fila_barricade_xr97 (1).jpg'),(40,29,'fila_barricade_xr97 (2).jpg'),(41,29,'fila_barricade_xr97 (3).jpg'),(42,9,'fila_disruptor.jpg'),(43,9,'fila_disruptor_1.jpg'),(44,9,'fila_disruptor_2.jpg'),(45,19,'fila_ray_tracer.jpg'),(46,19,'fila_ray_tracer1.jpg'),(47,19,'fila_ray_tracer2.jpg'),(48,24,'new_balance_2002r.jpg'),(49,24,'new_balance_2002r_1.jpg'),(50,24,'new_balance_2002r_2.jpg'),(51,14,'new_balance_990v6.jpg'),(52,14,'new_balance_990v6_1.jpg'),(53,14,'new_balance_990v6_2.jpg'),(54,4,'new_balance_core574.jpg'),(55,4,'new_balance_core574_1.jpg'),(56,4,'new_balance_core574_2.jpg'),(57,21,'nike_air_force1.jpg'),(58,21,'nike_air_force1_2.jpg'),(59,21,'nike_air_force1_3.jpg'),(60,1,'nike_air_max_90.jpg'),(61,1,'nike_air_max_90_1.jpg'),(62,1,'nike_air_max_90_2.jpg'),(63,23,'puma_palermo_special.jpg'),(64,23,'puma_palermo_special1.jpg'),(65,23,'puma_palermo_special2.jpg'),(66,13,'puma_rsx_efekt.jpg'),(67,13,'puma_rsx_efekt1.jpg'),(68,13,'puma_rsx_efekt2.jpg'),(69,3,'puma_suede_classic.jpg'),(70,3,'puma_suede_classic_1.jpg'),(71,3,'puma_suede_classic_2.jpg'),(72,7,'reebok_classic_c85.jpg'),(73,7,'reebok_classic_c85_1.jpg'),(74,7,'reebok_classic_c85_2.jpg'),(75,27,'reebok_instapump_fury.jpg'),(76,27,'reebok_instapump_fury1.jpg'),(77,27,'reebok_instapump_fury2.jpg'),(78,20,'under_armour_curry.jpg'),(79,20,'under_armour_curry1.jpeg'),(80,20,'under_armour_curry2.jpeg'),(81,10,'under_armour_flow_velociti_wind.jpg'),(82,10,'under_armour_flow_velociti_wind_1.jpg'),(83,10,'under_armour_flow_velociti_wind_2.jpg'),(84,30,'under_armour_machina.jpeg'),(85,30,'under_armour_machina1.jpg'),(86,30,'under_armour_machina3.jpeg'),(87,26,'vans_authentic.jpg'),(88,26,'vans_authentic1.jpg'),(89,26,'vans_authentic2.jpg'),(90,26,'vans_authentic3.jpg'),(91,6,'vans_old_skool.jpg'),(92,6,'vans_old_skool_1.jpg'),(93,6,'vans_old_skool_2.jpg');
/_!40000 ALTER TABLE `images` ENABLE KEYS _/;
UNLOCK TABLES;

--
-- Table structure for table `order_size`
--

DROP TABLE IF EXISTS `order_size`;
/_!40101 SET @saved_cs_client = @@character_set_client _/;
/_!50503 SET character_set_client = utf8mb4 _/;
CREATE TABLE `order_size` (
`id_order_size` int NOT NULL,
`id_size` int NOT NULL,
`id_order` int NOT NULL,
`quantity` int unsigned NOT NULL,
PRIMARY KEY (`id_order_size`),
KEY `id_size` (`id_size`),
KEY `id_order` (`id_order`),
CONSTRAINT `order_size_ibfk_1` FOREIGN KEY (`id_size`) REFERENCES `sizes` (`id_size`) ON DELETE CASCADE,
CONSTRAINT `order_size_ibfk_2` FOREIGN KEY (`id_order`) REFERENCES `orders` (`id_order`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/_!40101 SET character_set_client = @saved_cs_client _/;

--
-- Dumping data for table `order_size`
--

LOCK TABLES `order_size` WRITE;
/_!40000 ALTER TABLE `order_size` DISABLE KEYS _/;
/_!40000 ALTER TABLE `order_size` ENABLE KEYS _/;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/_!40101 SET @saved_cs_client = @@character_set_client _/;
/_!50503 SET character_set_client = utf8mb4 _/;
CREATE TABLE `orders` (
`id_order` int NOT NULL AUTO_INCREMENT,
`id_data_checkout` int NOT NULL,
`order_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
`total_price` decimal(10,2) unsigned NOT NULL,
PRIMARY KEY (`id_order`),
KEY `id_data_checkout` (`id_data_checkout`),
CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`id_data_checkout`) REFERENCES `data_checkout` (`id_data_checkout`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/_!40101 SET character_set_client = @saved_cs_client _/;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/_!40000 ALTER TABLE `orders` DISABLE KEYS _/;
/_!40000 ALTER TABLE `orders` ENABLE KEYS _/;
UNLOCK TABLES;

--
-- Table structure for table `sizes`
--

DROP TABLE IF EXISTS `sizes`;
/_!40101 SET @saved_cs_client = @@character_set_client _/;
/_!50503 SET character_set_client = utf8mb4 _/;
CREATE TABLE `sizes` (
`id_size` int NOT NULL AUTO_INCREMENT,
`id_sneaker` int NOT NULL,
`size` varchar(10) NOT NULL,
PRIMARY KEY (`id_size`),
KEY `sizes_ibfk_1` (`id_sneaker`),
CONSTRAINT `sizes_ibfk_1` FOREIGN KEY (`id_sneaker`) REFERENCES `sneakers` (`id_sneaker`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=91 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/_!40101 SET character_set_client = @saved_cs_client _/;

--
-- Dumping data for table `sizes`
--

LOCK TABLES `sizes` WRITE;
/_!40000 ALTER TABLE `sizes` DISABLE KEYS _/;
INSERT INTO `sizes` VALUES (1,1,'42'),(2,1,'43'),(3,1,'44'),(4,2,'38'),(5,2,'39'),(6,2,'40'),(7,3,'41'),(8,3,'42'),(9,3,'43'),(10,4,'37'),(11,4,'38'),(12,4,'39'),(13,5,'40'),(14,5,'41'),(15,5,'42'),(16,6,'43'),(17,6,'44'),(18,6,'45'),(19,7,'36'),(20,7,'37'),(21,7,'38'),(22,8,'42'),(23,8,'43'),(24,8,'44'),(25,9,'37'),(26,9,'38'),(27,9,'39'),(28,10,'40'),(29,10,'41'),(30,10,'42'),(31,11,'40'),(32,11,'41'),(33,11,'42'),(34,12,'40'),(35,12,'41'),(36,12,'42'),(37,13,'40'),(38,13,'41'),(39,13,'42'),(40,14,'40'),(41,14,'41'),(42,14,'42'),(43,15,'36'),(44,15,'37'),(45,15,'38'),(46,16,'40'),(47,16,'41'),(48,16,'42'),(49,17,'37'),(50,17,'38'),(51,17,'39'),(52,18,'41'),(53,18,'42'),(54,18,'43'),(55,19,'36'),(56,19,'37'),(57,19,'38'),(58,20,'43'),(59,20,'44'),(60,20,'45'),(61,21,'41'),(62,21,'42'),(63,21,'43'),(64,22,'40'),(65,22,'41'),(66,22,'42'),(67,23,'41'),(68,23,'42'),(69,23,'43'),(70,24,'42'),(71,24,'43'),(72,24,'44'),(73,25,'39'),(74,25,'40'),(75,25,'41'),(76,26,'40'),(77,26,'41'),(78,26,'42'),(79,27,'42'),(80,27,'43'),(81,27,'44'),(82,28,'38'),(83,28,'39'),(84,28,'40'),(85,29,'43'),(86,29,'44'),(87,29,'45'),(88,30,'41'),(89,30,'42'),(90,30,'43');
/_!40000 ALTER TABLE `sizes` ENABLE KEYS _/;
UNLOCK TABLES;

--
-- Table structure for table `sneakers`
--

DROP TABLE IF EXISTS `sneakers`;
/_!40101 SET @saved_cs_client = @@character_set_client _/;
/_!50503 SET character_set_client = utf8mb4 _/;
CREATE TABLE `sneakers` (
`id_sneaker` int NOT NULL AUTO_INCREMENT,
`brand` varchar(100) NOT NULL,
`model` varchar(100) NOT NULL,
`slug` varchar(255) DEFAULT NULL,
`description` text,
`color` varchar(50) DEFAULT NULL,
`price` decimal(10,2) unsigned NOT NULL,
`gender` enum('Uomo','Donna','Unisex') NOT NULL,
`date_of_arrival` date NOT NULL,
PRIMARY KEY (`id_sneaker`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/_!40101 SET character_set_client = @saved_cs_client _/;

--
-- Dumping data for table `sneakers`
--

LOCK TABLES `sneakers` WRITE;
/_!40000 ALTER TABLE `sneakers` DISABLE KEYS _/;
INSERT INTO `sneakers` VALUES (1,'Nike','Air Max 90','nike-air-max-90','Classico intramontabile, comfort e stile.','Bianco',130.00,'Uomo','2024-01-15'),(2,'Adidas','Ultraboost 22','adidas-ultraboost-22','Ammortizzazione reattiva per la corsa quotidiana.','Nero',180.00,'Unisex','2024-02-20'),(3,'Puma','Suede Classic','puma-suede-classic','Icona dello streetwear, versatile e alla moda.','Rosso',75.00,'Uomo','2024-03-10'),(4,'New Balance','574 Core','new-balance-574-core','Design retrò, ideale per il look casual.','Grigio',90.00,'Donna','2024-04-05'),(5,'Converse','Chuck Taylor All Star','converse-chuck-taylor-all-star','La sneaker per eccellenza, essenziale e cool.','Nero',65.00,'Unisex','2024-05-01'),(6,'Vans','Old Skool','vans-old-skool','Un classico per gli amanti dello skateboard.','Blu',80.00,'Uomo','2024-06-12'),(7,'Reebok','Club C 85','reebok-club-c-85','Stile tennis anni \'80, elegante e pulito.','Bianco',85.00,'Donna','2024-07-22'),(8,'ASICS','GEL-Kayano 29','asics-gel-kayano-29','Massimo supporto per i runner, stabilità e comfort.','Verde',160.00,'Uomo','2024-08-01'),(9,'Fila','Disruptor II','fila-disruptor-ii','Design chunky, statement di moda audace.','Bianco',95.00,'Donna','2024-09-10'),(10,'Under Armour','Flow Velociti Wind','under-armour-flow-velociti-wind','Leggera e reattiva per alte prestazioni.','Giallo',150.00,'Unisex','2024-10-18'),(11,'Nike','Dunk Low Retro','nike-dunk-low-retro','Iconica silhouette, perfetta per ogni occasione.','Bianco/Nero',120.00,'Unisex','2025-06-28'),(12,'Adidas','Forum Low','adidas-forum-low','Un classico del basket, stile street garantito.','Bianco/Blu',110.00,'Unisex','2025-06-25'),(13,'Puma','RS-X Efekt','puma-rs-x-efekt','Design futuristico con comfort ammortizzato.','Nero/Verde',110.00,'Uomo','2025-06-20'),(14,'New Balance','990v6','new-balance-990v6','Qualità premium e comfort superiore, made in USA.','Grigio',200.00,'Uomo','2025-05-15'),(15,'Converse','Run Star Hike Platform','converse-run-star-hike-platform','Chuck Taylor con suola chunky e audace.','Nero',95.00,'Donna','2025-05-01'),(16,'Vans','Sk8-Hi','vans-sk8-hi','Supporto alla caviglia per un look distintivo.','Nero',85.00,'Unisex','2025-04-10'),(17,'Reebok','Classic Leather','reebok-classic-leather','Eleganza senza tempo, comfort quotidiano.','Bianco',75.00,'Donna','2025-03-22'),(18,'ASICS','GEL-NYC','asics-gel-nyc','Stile retrò da corsa per un look contemporaneo.','Argento/Blu',140.00,'Uomo','2025-03-05'),(19,'Fila','Ray Tracer','fila-ray-tracer','Look audace e massiccio, ispirato agli anni 90.','Beige',100.00,'Donna','2025-02-18'),(20,'Under Armour','Curry Flow 10','under-armour-curry-flow-10','Performance esplosive per il campo da basket.','Blu/Oro',160.00,'Uomo','2025-02-01'),(21,'Nike','Air Force 1 Low','nike-air-force-1-low','Un classico intramontabile, versatile e iconico.','Bianco',110.00,'Unisex','2024-12-01'),(22,'Adidas','Gazelle','adidas-gazelle','Design pulito e iconico, perfetto per ogni outfit.','Blu scuro',90.00,'Unisex','2024-11-20'),(23,'Puma','Palermo Special','puma-palermo-special','Modello retrò ispirato al calcio, stile urbano.','Verde',95.00,'Unisex','2024-10-15'),(24,'New Balance','2002R','new-balance-2002r','Unione di design e comfort, ispirato al running.','Marrone',150.00,'Uomo','2024-09-01'),(25,'Converse','Chuck 70','converse-chuck-70','Versione premium dell\'iconica All Star.','Crema',80.00,'Unisex','2024-08-10'),(26,'Vans','Authentic','vans-authentic','La sneaker originale Vans, semplice e versatile.','Nero',70.00,'Unisex','2024-07-25'),(27,'Reebok','Instapump Fury OG','reebok-instapump-fury-og','Design audace e futuristico, comfort adattivo.','Nero/Rosso',190.00,'Unisex','2024-07-01'),(28,'ASICS','GT-2160','asics-gt-2160','Design tecnico degli anni 2000, comfort avanzato.','Grigio/Verde',130.00,'Donna','2024-06-15'),(29,'Fila','Barricade XT 97 Low','fila-barricade-xt-97-low','Sneaker robusta con un look audace e d\'impatto.','Nero',105.00,'Uomo','2024-05-20'),(30,'Under Armour','HOVR Machina 3','under-armour-hovr-machina-3','Massima ammortizzazione per le tue corse più lunghe.','Grigio/Arancio',145.00,'Unisex','2024-04-05');
/_!40000 ALTER TABLE `sneakers` ENABLE KEYS _/;
UNLOCK TABLES;

--
-- Dumping events for database 'bool_shop'
--

--
-- Dumping routines for database 'bool_shop'
--
/_!40103 SET TIME_ZONE=@OLD_TIME_ZONE _/;

/_!40101 SET SQL_MODE=@OLD_SQL_MODE _/;
/_!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS _/;
/_!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS _/;
/_!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT _/;
/_!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS _/;
/_!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION _/;
/_!40111 SET SQL_NOTES=@OLD_SQL_NOTES _/;

-- Dump completed on 2025-07-03 17:33:16
