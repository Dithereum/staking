-- MySQL dump 10.13  Distrib 5.7.36, for Linux (x86_64)
--
-- Host: localhost    Database: VALIDATOR_DB
-- ------------------------------------------------------
-- Server version	5.7.36-0ubuntu0.18.04.1

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
-- Table structure for table `lastblock_fetched`
--

DROP TABLE IF EXISTS `lastblock_fetched`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lastblock_fetched` (
  `timestamp1` varchar(255) NOT NULL,
  `lastblock_pair` varchar(255) NOT NULL,
  PRIMARY KEY (`lastblock_pair`),
  UNIQUE KEY `lastblock_pair` (`lastblock_pair`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lastblock_fetched`
--

LOCK TABLES `lastblock_fetched` WRITE;
/*!40000 ALTER TABLE `lastblock_fetched` DISABLE KEYS */;
INSERT INTO `lastblock_fetched` VALUES ('1646316830962','200000,200500'),('1646316890472','200501,201000');
/*!40000 ALTER TABLE `lastblock_fetched` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stakings`
--

DROP TABLE IF EXISTS `stakings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `stakings` (
  `stakerAddress` varchar(255) DEFAULT NULL,
  `validatorAddress` varchar(255) DEFAULT NULL,
  `stakeAmount` varchar(100) DEFAULT NULL,
  `timeStamp` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `transHash` varchar(255) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `transHash` (`transHash`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stakings`
--

LOCK TABLES `stakings` WRITE;
/*!40000 ALTER TABLE `stakings` DISABLE KEYS */;
INSERT INTO `stakings` VALUES ('0x6077516eea959B7fb04bB211AD0569351f3eBDbc','0x6077516eea959B7fb04bB211AD0569351f3eBDbc','123123','2022-02-22 00:00:00','Active','0xcf86f312be83ee9162d0a8be2e10f29ad0da5b40e9e3045201b739eb202fcc30',1,'2022-02-22 00:00:00','2022-02-22 00:00:00'),('0x6077516eea959B7fb04bB211AD0569351f3eBDbc','0x6077516eea959B7fb04bB211AD0569351f3eBDbc','200','2022-02-22 00:00:00','Active','0x0e45b3f6fb2fe2d1d3ff29b958e916f232245f09d66998cb2b822f6b291b06a3',2,'2022-02-22 00:00:00','2022-02-22 00:00:00'),('0x19E6277F5Cf6099BD1c54e97644EE0Dfb8bFF96c','0x19E6277F5Cf6099BD1c54e97644EE0Dfb8bFF96c','4544','2022-02-22 00:00:00','Active','0xe7aefd022437ba2750c1aeee4680383040fc0e831977bc6667318cedc655176d',3,'2022-02-22 00:00:00','2022-02-22 00:00:00'),('0x19E6277F5Cf6099BD1c54e97644EE0Dfb8bFF96c','0x19E6277F5Cf6099BD1c54e97644EE0Dfb8bFF96c','24234','2022-02-22 00:00:00','InActive','0xdc040e675db863af04a034315a4e8b2dd6ff69f998b29658234574588ce4279d',4,'2022-02-22 00:00:00','2022-02-22 00:00:00'),('0xF9683b2d87FA33c99f97CaDe30501E3354DAef78','0xBFb9B248D0e735032a70826572f79381dDC7F0De','32000000000000000000','1646285559','Staked','0xf0178a04a0abdd6c33109ba51740aa752bc84815d2f59a2bb152e2a96520b2e5',11,'2022-02-04 19:42:50','2022-02-04 19:42:50'),('0xF9683b2d87FA33c99f97CaDe30501E3354DAef78','0xBFb9B248D0e735032a70826572f79381dDC7F0De','32000000000000000000','1646285697','Unstaked','0x286327d7980c646401be6b6de6abd764df2b3781470283e517578e390d754316',12,'2022-02-04 19:42:50','2022-02-04 19:42:50');
/*!40000 ALTER TABLE `stakings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `validators`
--

DROP TABLE IF EXISTS `validators`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `validators` (
  `validatorName` varchar(255) DEFAULT NULL,
  `validatorDescription` varchar(255) DEFAULT NULL,
  `validatorWalletAddress` varchar(255) DEFAULT NULL,
  `validatorFeeAddress` varchar(255) DEFAULT NULL,
  `validatorSelfStaked` bigint(20) DEFAULT NULL,
  `validatorDeligatorStaked` bigint(20) DEFAULT NULL,
  `validatorAPR` float DEFAULT NULL,
  `validatorCommission` float DEFAULT NULL,
  `joiningTimestamp` datetime(6) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `validators`
--

LOCK TABLES `validators` WRITE;
/*!40000 ALTER TABLE `validators` DISABLE KEYS */;
INSERT INTO `validators` VALUES ('HenryMartha','HenryMartha','0x6077516eea959B7fb04bB211AD0569351f3eBDbc','0x6077516eea959B7fb04bB211AD0569351f3eBDbc',1,1,10.5,5,'2022-02-22 00:00:00.000000','Active',1,'2022-02-22 00:00:00','2022-02-22 00:00:00'),('Rebel 1','Persian Warrior','0x62E1960De1F9CA64d8fA578E871c2fe48b596b59','0x62E1960De1F9CA64d8fA578E871c2fe48b596b59',2,2,10.05,6,'2022-02-22 00:00:00.000000','Inactive',2,'2022-02-22 00:00:00','2022-02-22 00:00:00'),('UndergroundWorld','UndergroundWorld inc.','0x9dD35f936298565Cc17c241fc645Eb4D1e04d895','0x9dD35f936298565Cc17c241fc645Eb4D1e04d895',3,4,9.02,4,'2022-02-22 00:00:00.000000','Active',3,'2022-02-22 00:00:00','2022-02-22 00:00:00');
/*!40000 ALTER TABLE `validators` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'myvalidators'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-03-03 19:49:26
