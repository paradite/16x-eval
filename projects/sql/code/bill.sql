CREATE TABLE `bill` (
  `id` bigint(11) NOT NULL AUTO_INCREMENT,
  `ref` varchar(50) DEFAULT '',
  `status` varchar(20) DEFAULT '',
  `amount` double DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4274 DEFAULT CHARSET=utf8mb4;
