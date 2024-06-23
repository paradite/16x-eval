You are tasked to implement a feature. Instructions are as follows:

Write MySQL 5.7 code to update status column in `bill` table with information from `receipt` table.

If the bill is fully paid, then the status should be updated to 'PAID'.
If the bill is partially paid, then the status should be updated to 'PARTIAL'.
If the bill is not paid at all, then the status should be updated to 'UNPAID'.


Instructions for the output format:
- Output code without descriptions, unless it is important.
- Minimize prose, comments and empty lines.
- Only show the relevant code that needs to be modified. Use comments to represent the parts that are not modified.
- Make it easy to copy and paste.
- Consider other possibilities to achieve the result, do not be limited by the prompt.

bill.sql
```sql
CREATE TABLE `bill` (
  `id` bigint(11) NOT NULL AUTO_INCREMENT,
  `ref` varchar(50) DEFAULT '',
  `status` varchar(20) DEFAULT '',
  `amount` double DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4274 DEFAULT CHARSET=utf8mb4;
```

receipt.sql
```sql
CREATE TABLE `receipt` (
  `id` bigint(11) NOT NULL AUTO_INCREMENT,
  `bill_id` varchar(50) DEFAULT '',
  `ref` varchar(50) DEFAULT '',
  `amount` double DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4274 DEFAULT CHARSET=utf8mb4;
```