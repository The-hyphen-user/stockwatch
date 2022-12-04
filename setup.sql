-- CREATE TABLE IF NOT EXISTS `books_reviews` (
--   `id` int(11) NOT NULL AUTO_INCREMENT,
--   `book_name` varchar(20) NOT NULL,
--   `book_review` varchar(50) NOT NULL,
--   PRIMARY KEY (`id`)
-- ) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `balance` int(32) NOT NULL,
  `wealth` int(32) NOT NULL,
  `password` varchar(255) NOT NULL,
  `privacy` boolean NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `stockPrice` (
    'symbol' varchar(20) NOT NULL,
    'price' float(9, 2) NOT NULL,
    PRIMARY KEY (`symbol`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS 'stocks' (
    'symbol' varchar(20) NOT NULL,
    'description' varchar(100) NOT NULL,
    'type' varchar(100) NOT NULL,
    'currency' varchar(10) NOT NULL,
    PRIMARY KEY (`symbol`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS 'userStocks' (
    'id' int(32) NOT NULL AUTO_INCREMENT,
    'symbol' varchar(20) NOT NULL,
    'amount' float(9, 2) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS 'userRevenue' (
    'id' int(32) NOT NULL AUTO_INCREMENT,
    'date' date() NOT NULL,
    'wealth' int(32) NOT NULL,
    PRIMARY KEY (`id`, `date`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;