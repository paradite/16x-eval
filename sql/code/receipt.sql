CREATE TABLE `receipt` (
  `id` bigint(11) NOT NULL AUTO_INCREMENT,
  `bill_id` varchar(50) DEFAULT '',
  `ref` varchar(50) DEFAULT '',
  `amount` double DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4274 DEFAULT CHARSET=utf8mb4;
