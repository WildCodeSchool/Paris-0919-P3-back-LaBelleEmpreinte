-- MySQL dump 10.13  Distrib 5.7.28, for Linux (x86_64)
--
-- Host: localhost    Database: la_belle_empreinte
-- ------------------------------------------------------
-- Server version	5.7.28-0ubuntu0.18.04.4

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `articles`
--

DROP TABLE IF EXISTS `articles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `articles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titre` varchar(200) NOT NULL,
  `date` date DEFAULT NULL,
  `auteur` varchar(200) DEFAULT NULL,
  `contenu` varchar(5000) DEFAULT NULL,
  `publication` tinyint(4) DEFAULT NULL,
  `image` varchar(1000) DEFAULT NULL,
  `minutes_lecture` int(11) DEFAULT NULL,
  `geographie` varchar(1000) DEFAULT NULL,
  `listes_initiatives` tinyint(4) DEFAULT NULL,
  `lien_partage` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articles`
--

LOCK TABLES `articles` WRITE;
/*!40000 ALTER TABLE `articles` DISABLE KEYS */;
INSERT INTO `articles` VALUES (1,'recyclage meuble','2020-10-15','delphine','blablablabalabalabalbaalbal',1,'www.google.com',25,'France',1,'www.facebook.com'),(2,'ViveTracy','2019-12-15','Pau','Il était une fois Queen T',1,NULL,10,'WildCountry',0,NULL),(3,'Alexandre','2019-12-15','Tracy','Déchirure musculaire spectaculaire suite à un Paris 15e- Paris 5e en 1h20',0,NULL,10,'WildCountry',1,NULL),(4,'cervela',NULL,'rondelle',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(6,'test transaction',NULL,'MP boss',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(7,'test erreur',NULL,'MP boss',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(8,'en mettant des commit partout',NULL,'MP boss',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(11,'en supprimant la fonction de rollback',NULL,'MP boss',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(13,'en mettant le commit dans lastab = 1',NULL,'MP boss',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(14,'test de la formule de base',NULL,'MP boss',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(25,' parenthèse bracket ',NULL,'MP boss',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(26,' parenthèse bracket 2 ',NULL,'MP boss',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(27,' parenthèse bracket 2 ',NULL,'MP boss',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(29,' code d\'hier  ',NULL,'MP boss',NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `articles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `articles_has_besoins`
--

DROP TABLE IF EXISTS `articles_has_besoins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `articles_has_besoins` (
  `articles_id` int(11) DEFAULT NULL,
  `besoins_id` int(11) DEFAULT NULL,
  KEY `articles_id` (`articles_id`),
  KEY `besoins_id` (`besoins_id`),
  CONSTRAINT `articles_has_besoins_ibfk_1` FOREIGN KEY (`articles_id`) REFERENCES `articles` (`id`),
  CONSTRAINT `articles_has_besoins_ibfk_2` FOREIGN KEY (`besoins_id`) REFERENCES `besoins` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articles_has_besoins`
--

LOCK TABLES `articles_has_besoins` WRITE;
/*!40000 ALTER TABLE `articles_has_besoins` DISABLE KEYS */;
INSERT INTO `articles_has_besoins` VALUES (1,3),(1,4),(2,4),(2,5),(4,1),(4,2),(6,1),(6,2),(7,1),(7,2),(8,1),(8,2),(11,1),(11,2),(25,1),(25,2),(25,1),(25,2),(26,1),(26,2),(26,1),(26,2),(27,1),(27,2),(27,1),(27,2),(29,1),(29,2);
/*!40000 ALTER TABLE `articles_has_besoins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `articles_has_categories_intermediaires`
--

DROP TABLE IF EXISTS `articles_has_categories_intermediaires`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `articles_has_categories_intermediaires` (
  `articles_id` int(11) DEFAULT NULL,
  `categories_intermediaires_id` int(11) DEFAULT NULL,
  KEY `articles_id` (`articles_id`),
  KEY `categories_intermediaires_id` (`categories_intermediaires_id`),
  CONSTRAINT `articles_has_categories_intermediaires_ibfk_1` FOREIGN KEY (`articles_id`) REFERENCES `articles` (`id`),
  CONSTRAINT `articles_has_categories_intermediaires_ibfk_2` FOREIGN KEY (`categories_intermediaires_id`) REFERENCES `categories_intermediaires` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articles_has_categories_intermediaires`
--

LOCK TABLES `articles_has_categories_intermediaires` WRITE;
/*!40000 ALTER TABLE `articles_has_categories_intermediaires` DISABLE KEYS */;
INSERT INTO `articles_has_categories_intermediaires` VALUES (1,2),(2,3),(2,2),(2,1),(4,1),(4,2),(6,1),(6,2),(7,1),(7,2),(8,1),(11,1),(11,2),(25,1),(25,2),(25,1),(25,2),(25,1),(25,2),(25,1),(25,2),(25,1),(25,2),(25,1),(25,2),(25,1),(25,2),(25,1),(25,2),(25,1),(25,2),(25,1),(25,2),(25,1),(25,2),(25,1),(25,2),(25,1),(25,2),(25,1),(25,2),(25,1),(25,2),(25,1),(25,2),(26,1),(26,2),(26,1),(26,2),(26,1),(26,2),(26,1),(26,2),(26,1),(26,2),(26,1),(26,2),(26,1),(26,2),(26,1),(26,2),(26,1),(26,2),(26,1),(26,2),(26,1),(26,2),(26,1),(26,2),(26,1),(26,2),(26,1),(26,2),(26,1),(26,2),(26,1),(26,2),(27,1),(27,2),(27,1),(27,2),(27,1),(27,2),(27,1),(27,2),(27,1),(27,2),(27,1),(27,2),(27,1),(27,2),(27,1),(27,2),(27,1),(27,2),(27,1),(27,2),(27,1),(27,2),(27,1),(27,2),(27,1),(27,2),(27,1),(27,2),(27,1),(27,2),(27,1),(27,2),(29,1),(29,2);
/*!40000 ALTER TABLE `articles_has_categories_intermediaires` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `articles_has_categories_objets`
--

DROP TABLE IF EXISTS `articles_has_categories_objets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `articles_has_categories_objets` (
  `articles_id` int(11) DEFAULT NULL,
  `categories_objets_id` int(11) DEFAULT NULL,
  KEY `articles_id` (`articles_id`),
  KEY `categories_objets_id` (`categories_objets_id`),
  CONSTRAINT `articles_has_categories_objets_ibfk_1` FOREIGN KEY (`articles_id`) REFERENCES `articles` (`id`),
  CONSTRAINT `articles_has_categories_objets_ibfk_2` FOREIGN KEY (`categories_objets_id`) REFERENCES `categories_objets` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articles_has_categories_objets`
--

LOCK TABLES `articles_has_categories_objets` WRITE;
/*!40000 ALTER TABLE `articles_has_categories_objets` DISABLE KEYS */;
INSERT INTO `articles_has_categories_objets` VALUES (1,2),(1,3),(2,1),(2,3),(4,1),(4,2),(6,1),(6,2),(7,2),(8,2),(11,2),(25,1),(25,2),(25,1),(25,2),(25,1),(25,2),(25,1),(25,2),(25,1),(25,2),(25,1),(25,2),(25,1),(25,2),(25,1),(25,2),(26,1),(26,2),(26,1),(26,2),(26,1),(26,2),(26,1),(26,2),(26,1),(26,2),(26,1),(26,2),(26,1),(26,2),(26,1),(26,2),(27,1),(27,2),(27,1),(27,2),(27,1),(27,2),(27,1),(27,2),(27,1),(27,2),(27,1),(27,2),(27,1),(27,2),(27,1),(27,2),(29,1),(29,2);
/*!40000 ALTER TABLE `articles_has_categories_objets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `articles_has_initiatives`
--

DROP TABLE IF EXISTS `articles_has_initiatives`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `articles_has_initiatives` (
  `articles_id` int(11) DEFAULT NULL,
  `initiatives_id` int(11) DEFAULT NULL,
  KEY `articles_id` (`articles_id`),
  KEY `initiatives_id` (`initiatives_id`),
  CONSTRAINT `articles_has_initiatives_ibfk_1` FOREIGN KEY (`articles_id`) REFERENCES `articles` (`id`),
  CONSTRAINT `articles_has_initiatives_ibfk_2` FOREIGN KEY (`initiatives_id`) REFERENCES `initiatives` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articles_has_initiatives`
--

LOCK TABLES `articles_has_initiatives` WRITE;
/*!40000 ALTER TABLE `articles_has_initiatives` DISABLE KEYS */;
INSERT INTO `articles_has_initiatives` VALUES (1,1),(2,1),(2,2),(3,1),(3,1),(4,1),(4,2),(6,1),(6,2),(7,1),(7,2),(8,1),(8,2),(11,1),(11,2),(13,2),(14,2),(25,1),(25,2),(26,1),(26,2),(27,1),(27,2),(29,1),(29,2);
/*!40000 ALTER TABLE `articles_has_initiatives` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `articles_has_objets`
--

DROP TABLE IF EXISTS `articles_has_objets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `articles_has_objets` (
  `articles_id` int(11) DEFAULT NULL,
  `objets_id` int(11) DEFAULT NULL,
  KEY `articles_id` (`articles_id`),
  KEY `objets_id` (`objets_id`),
  CONSTRAINT `articles_has_objets_ibfk_1` FOREIGN KEY (`articles_id`) REFERENCES `articles` (`id`),
  CONSTRAINT `articles_has_objets_ibfk_2` FOREIGN KEY (`objets_id`) REFERENCES `objets` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articles_has_objets`
--

LOCK TABLES `articles_has_objets` WRITE;
/*!40000 ALTER TABLE `articles_has_objets` DISABLE KEYS */;
INSERT INTO `articles_has_objets` VALUES (1,12),(2,10),(2,11),(4,1),(4,2),(6,1),(6,2),(7,1),(7,2),(11,1),(11,2),(25,1),(25,2),(25,1),(25,2),(25,1),(25,2),(25,1),(25,2),(25,1),(25,2),(25,1),(25,2),(25,1),(25,2),(25,1),(25,2),(25,1),(25,2),(25,1),(25,2),(25,1),(25,2),(25,1),(25,2),(25,1),(25,2),(25,1),(25,2),(25,1),(25,2),(25,1),(25,2),(25,1),(25,2),(25,1),(25,2),(25,1),(25,2),(25,1),(25,2),(25,1),(25,2),(25,1),(25,2),(25,1),(25,2),(25,1),(25,2),(25,1),(25,2),(25,1),(25,2),(25,1),(25,2),(25,1),(25,2),(25,1),(25,2),(25,1),(25,2),(25,1),(25,2),(25,1),(25,2),(26,1),(26,2),(26,1),(26,2),(26,1),(26,2),(26,1),(26,2),(26,1),(26,2),(26,1),(26,2),(26,1),(26,2),(26,1),(26,2),(26,1),(26,2),(26,1),(26,2),(26,1),(26,2),(26,1),(26,2),(26,1),(26,2),(26,1),(26,2),(26,1),(26,2),(26,1),(26,2),(26,1),(26,2),(26,1),(26,2),(26,1),(26,2),(26,1),(26,2),(26,1),(26,2),(26,1),(26,2),(26,1),(26,2),(26,1),(26,2),(26,1),(26,2),(26,1),(26,2),(26,1),(26,2),(26,1),(26,2),(26,1),(26,2),(26,1),(26,2),(26,1),(26,2),(26,1),(26,2),(27,1),(27,2),(27,1),(27,2),(27,1),(27,2),(27,1),(27,2),(27,1),(27,2),(27,1),(27,2),(27,1),(27,2),(27,1),(27,2),(27,1),(27,2),(27,1),(27,2),(27,1),(27,2),(27,1),(27,2),(27,1),(27,2),(27,1),(27,2),(27,1),(27,2),(27,1),(27,2),(27,1),(27,2),(27,1),(27,2),(27,1),(27,2),(27,1),(27,2),(27,1),(27,2),(27,1),(27,2),(27,1),(27,2),(27,1),(27,2),(27,1),(27,2),(27,1),(27,2),(27,1),(27,2),(27,1),(27,2),(27,1),(27,2),(27,1),(27,2),(27,1),(27,2),(27,1),(27,2),(29,1),(29,2);
/*!40000 ALTER TABLE `articles_has_objets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `articles_has_types_activites`
--

DROP TABLE IF EXISTS `articles_has_types_activites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `articles_has_types_activites` (
  `articles_id` int(11) DEFAULT NULL,
  `types_activites_id` int(11) DEFAULT NULL,
  KEY `articles_id` (`articles_id`),
  KEY `types_activites_id` (`types_activites_id`),
  CONSTRAINT `articles_has_types_activites_ibfk_1` FOREIGN KEY (`articles_id`) REFERENCES `articles` (`id`),
  CONSTRAINT `articles_has_types_activites_ibfk_2` FOREIGN KEY (`types_activites_id`) REFERENCES `types_activites` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articles_has_types_activites`
--

LOCK TABLES `articles_has_types_activites` WRITE;
/*!40000 ALTER TABLE `articles_has_types_activites` DISABLE KEYS */;
INSERT INTO `articles_has_types_activites` VALUES (1,2),(1,5),(2,3),(2,4),(2,13),(2,12),(2,10),(4,1),(4,2),(6,1),(6,2),(7,1),(7,2),(8,1),(8,2),(11,1),(11,2),(25,1),(25,2),(25,1),(25,2),(25,1),(25,2),(25,1),(25,2),(26,1),(26,2),(26,1),(26,2),(26,1),(26,2),(26,1),(26,2),(27,1),(27,2),(27,1),(27,2),(27,1),(27,2),(27,1),(27,2),(29,1),(29,2);
/*!40000 ALTER TABLE `articles_has_types_activites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `besoins`
--

DROP TABLE IF EXISTS `besoins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `besoins` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `besoins` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `besoins`
--

LOCK TABLES `besoins` WRITE;
/*!40000 ALTER TABLE `besoins` DISABLE KEYS */;
INSERT INTO `besoins` VALUES (1,'comprendre_les_enjeux'),(2,'fin_utilisation'),(3,'réparation'),(4,'occasion_location_DIY'),(5,'marques_responsables');
/*!40000 ALTER TABLE `besoins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories_intermediaires`
--

DROP TABLE IF EXISTS `categories_intermediaires`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories_intermediaires` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `categories_objets_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `categories_objets_id` (`categories_objets_id`),
  CONSTRAINT `categories_intermediaires_ibfk_1` FOREIGN KEY (`categories_objets_id`) REFERENCES `categories_objets` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories_intermediaires`
--

LOCK TABLES `categories_intermediaires` WRITE;
/*!40000 ALTER TABLE `categories_intermediaires` DISABLE KEYS */;
INSERT INTO `categories_intermediaires` VALUES (1,'vetements',1),(2,'chaussures',1),(3,'accessoires',1),(4,'meubles',2),(5,'marketplace',3);
/*!40000 ALTER TABLE `categories_intermediaires` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories_objets`
--

DROP TABLE IF EXISTS `categories_objets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories_objets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `categorie` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories_objets`
--

LOCK TABLES `categories_objets` WRITE;
/*!40000 ALTER TABLE `categories_objets` DISABLE KEYS */;
INSERT INTO `categories_objets` VALUES (1,'pour_s_habiller'),(2,'pour_la_maison'),(3,'au_quotidien');
/*!40000 ALTER TABLE `categories_objets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `engagements`
--

DROP TABLE IF EXISTS `engagements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `engagements` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `engagements` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `engagements`
--

LOCK TABLES `engagements` WRITE;
/*!40000 ALTER TABLE `engagements` DISABLE KEYS */;
INSERT INTO `engagements` VALUES (1,'fabrication française'),(2,'fabrication européenne'),(3,'matières écologiques'),(4,'artisanat'),(5,'économie circulaire'),(6,'insersion sociale');
/*!40000 ALTER TABLE `engagements` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `genres`
--

DROP TABLE IF EXISTS `genres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `genres` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `genres` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genres`
--

LOCK TABLES `genres` WRITE;
/*!40000 ALTER TABLE `genres` DISABLE KEYS */;
INSERT INTO `genres` VALUES (1,'femmes'),(2,'hommes'),(3,'enfants');
/*!40000 ALTER TABLE `genres` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `genres_has_objets`
--

DROP TABLE IF EXISTS `genres_has_objets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `genres_has_objets` (
  `genres_id` int(11) DEFAULT NULL,
  `objets_id` int(11) DEFAULT NULL,
  KEY `genres_id` (`genres_id`),
  KEY `objets_id` (`objets_id`),
  CONSTRAINT `genres_has_objets_ibfk_1` FOREIGN KEY (`genres_id`) REFERENCES `genres` (`id`),
  CONSTRAINT `genres_has_objets_ibfk_2` FOREIGN KEY (`objets_id`) REFERENCES `objets` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genres_has_objets`
--

LOCK TABLES `genres_has_objets` WRITE;
/*!40000 ALTER TABLE `genres_has_objets` DISABLE KEYS */;
INSERT INTO `genres_has_objets` VALUES (1,1),(1,5),(1,8),(2,1),(2,3),(3,6);
/*!40000 ALTER TABLE `genres_has_objets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `initiatives`
--

DROP TABLE IF EXISTS `initiatives`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `initiatives` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `url` varchar(200) DEFAULT NULL,
  `adresse1` varchar(200) DEFAULT NULL,
  `adresse2` varchar(200) DEFAULT NULL,
  `adresse3` varchar(200) DEFAULT NULL,
  `logo` varchar(200) DEFAULT NULL,
  `telephone1` varchar(15) DEFAULT NULL,
  `telephone2` varchar(15) DEFAULT NULL,
  `telephone3` varchar(15) DEFAULT NULL,
  `description` varchar(2000) DEFAULT NULL,
  `contact_prenom_1` varchar(50) DEFAULT NULL,
  `contact_nom_1` varchar(100) DEFAULT NULL,
  `contact_mail_1` varchar(100) DEFAULT NULL,
  `contact_telephone_1` varchar(15) DEFAULT NULL,
  `contact_prenom_2` varchar(50) DEFAULT NULL,
  `contact_nom_2` varchar(100) DEFAULT NULL,
  `contact_mail_2` varchar(100) DEFAULT NULL,
  `contact_telephone_2` varchar(15) DEFAULT NULL,
  `date_dernier_echange` date DEFAULT NULL,
  `objets_labellises` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `initiatives`
--

LOCK TABLES `initiatives` WRITE;
/*!40000 ALTER TABLE `initiatives` DISABLE KEYS */;
INSERT INTO `initiatives` VALUES (1,'Vestiaire Collective','https://fr.vestiairecollective.com','','','','','','','','Plateforme en ligne de mode et luxe d\'occasion','Anna','Toppani','anna.t@vestiairecolletive.com','','','','','',NULL,NULL),(2,'Wild Code School','https://wildcodeschool.fr','11 rue de Poissy 75005 Paris','11 rue du croissant au jambon ','11 rue de la tartiflette','https://interactive-examples.mdn.mozilla.net/media/examples/grapefruit-slice-332-332.jpg','010101010101','020202020202','030303030303','Ecole de dev','Maxence','LeKing','maxence@leking.com','0404040404','Nicolas','LeRoi','Nicolas@Leroi.com','060606060606','1980-02-01',1);
/*!40000 ALTER TABLE `initiatives` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `initiatives_has_besoins`
--

DROP TABLE IF EXISTS `initiatives_has_besoins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `initiatives_has_besoins` (
  `initiatives_id` int(11) DEFAULT NULL,
  `besoins_id` int(11) DEFAULT NULL,
  KEY `initiatives_id` (`initiatives_id`),
  KEY `besoins_id` (`besoins_id`),
  CONSTRAINT `initiatives_has_besoins_ibfk_1` FOREIGN KEY (`initiatives_id`) REFERENCES `initiatives` (`id`),
  CONSTRAINT `initiatives_has_besoins_ibfk_2` FOREIGN KEY (`besoins_id`) REFERENCES `besoins` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `initiatives_has_besoins`
--

LOCK TABLES `initiatives_has_besoins` WRITE;
/*!40000 ALTER TABLE `initiatives_has_besoins` DISABLE KEYS */;
INSERT INTO `initiatives_has_besoins` VALUES (1,4),(2,4);
/*!40000 ALTER TABLE `initiatives_has_besoins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `initiatives_has_categories_objets`
--

DROP TABLE IF EXISTS `initiatives_has_categories_objets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `initiatives_has_categories_objets` (
  `initiatives_id` int(11) DEFAULT NULL,
  `categories_objets_id` int(11) DEFAULT NULL,
  KEY `initiatives_id` (`initiatives_id`),
  KEY `categories_objets_id` (`categories_objets_id`),
  CONSTRAINT `initiatives_has_categories_objets_ibfk_1` FOREIGN KEY (`initiatives_id`) REFERENCES `initiatives` (`id`),
  CONSTRAINT `initiatives_has_categories_objets_ibfk_2` FOREIGN KEY (`categories_objets_id`) REFERENCES `categories_objets` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `initiatives_has_categories_objets`
--

LOCK TABLES `initiatives_has_categories_objets` WRITE;
/*!40000 ALTER TABLE `initiatives_has_categories_objets` DISABLE KEYS */;
INSERT INTO `initiatives_has_categories_objets` VALUES (1,1);
/*!40000 ALTER TABLE `initiatives_has_categories_objets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `initiatives_has_engagements`
--

DROP TABLE IF EXISTS `initiatives_has_engagements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `initiatives_has_engagements` (
  `initiatives_id` int(11) DEFAULT NULL,
  `engagements_id` int(11) DEFAULT NULL,
  KEY `initiatives_id` (`initiatives_id`),
  KEY `engagements_id` (`engagements_id`),
  CONSTRAINT `initiatives_has_engagements_ibfk_1` FOREIGN KEY (`initiatives_id`) REFERENCES `initiatives` (`id`),
  CONSTRAINT `initiatives_has_engagements_ibfk_2` FOREIGN KEY (`engagements_id`) REFERENCES `engagements` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `initiatives_has_engagements`
--

LOCK TABLES `initiatives_has_engagements` WRITE;
/*!40000 ALTER TABLE `initiatives_has_engagements` DISABLE KEYS */;
INSERT INTO `initiatives_has_engagements` VALUES (1,5);
/*!40000 ALTER TABLE `initiatives_has_engagements` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `initiatives_has_objets`
--

DROP TABLE IF EXISTS `initiatives_has_objets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `initiatives_has_objets` (
  `initiatives_id` int(11) DEFAULT NULL,
  `objets_id` int(11) DEFAULT NULL,
  KEY `initiatives_id` (`initiatives_id`),
  KEY `objets_id` (`objets_id`),
  CONSTRAINT `initiatives_has_objets_ibfk_1` FOREIGN KEY (`initiatives_id`) REFERENCES `initiatives` (`id`),
  CONSTRAINT `initiatives_has_objets_ibfk_2` FOREIGN KEY (`objets_id`) REFERENCES `objets` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `initiatives_has_objets`
--

LOCK TABLES `initiatives_has_objets` WRITE;
/*!40000 ALTER TABLE `initiatives_has_objets` DISABLE KEYS */;
INSERT INTO `initiatives_has_objets` VALUES (1,1),(1,2),(1,3);
/*!40000 ALTER TABLE `initiatives_has_objets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `initiatives_has_types_activites`
--

DROP TABLE IF EXISTS `initiatives_has_types_activites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `initiatives_has_types_activites` (
  `initiatives_id` int(11) DEFAULT NULL,
  `types_activites_id` int(11) DEFAULT NULL,
  KEY `initiatives_id` (`initiatives_id`),
  KEY `types_activites_id` (`types_activites_id`),
  CONSTRAINT `initiatives_has_types_activites_ibfk_1` FOREIGN KEY (`initiatives_id`) REFERENCES `initiatives` (`id`),
  CONSTRAINT `initiatives_has_types_activites_ibfk_2` FOREIGN KEY (`types_activites_id`) REFERENCES `types_activites` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `initiatives_has_types_activites`
--

LOCK TABLES `initiatives_has_types_activites` WRITE;
/*!40000 ALTER TABLE `initiatives_has_types_activites` DISABLE KEYS */;
/*!40000 ALTER TABLE `initiatives_has_types_activites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `objets`
--

DROP TABLE IF EXISTS `objets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `objets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `categories_intermediaires_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `categories_intermediaires_id` (`categories_intermediaires_id`),
  CONSTRAINT `objets_ibfk_1` FOREIGN KEY (`categories_intermediaires_id`) REFERENCES `categories_intermediaires` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `objets`
--

LOCK TABLES `objets` WRITE;
/*!40000 ALTER TABLE `objets` DISABLE KEYS */;
INSERT INTO `objets` VALUES (1,'t-shirts',1),(2,'pulls',1),(3,'chemises',1),(4,'pantalons',1),(5,'jupes',1),(6,'enfants',1),(7,'chaussures',2),(8,'bottes',2),(9,'sacs',3),(10,'accessoires',3),(11,'bijoux',3),(12,'mobiliers',4),(13,'literies',4),(14,'decorations',4),(15,'fleurs',4),(16,'jouets',4);
/*!40000 ALTER TABLE `objets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `types_activites`
--

DROP TABLE IF EXISTS `types_activites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `types_activites` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `types_activites` varchar(100) DEFAULT NULL,
  `besoins_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `besoins_id` (`besoins_id`),
  CONSTRAINT `types_activites_ibfk_1` FOREIGN KEY (`besoins_id`) REFERENCES `besoins` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `types_activites`
--

LOCK TABLES `types_activites` WRITE;
/*!40000 ALTER TABLE `types_activites` DISABLE KEYS */;
INSERT INTO `types_activites` VALUES (1,'defis',1),(2,'solutions',1),(3,'5_gestes_simples',1),(4,'labels',1),(5,'deposer_et_donner',2),(6,'vente_en_boutique',2),(7,'vente_en_ligne',2),(8,'location',2),(9,'réparation',3),(10,'objets_occasion',4),(11,'location',4),(12,'creation_diy',4),(13,'objets_labellises',5),(14,'marques_recommandes',5),(15,'marketplace',5);
/*!40000 ALTER TABLE `types_activites` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-01-08 14:30:12
