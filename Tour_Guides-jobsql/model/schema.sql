CREATE DATABASE tourGuide;

USE tourGuide;

CREATE TABLE user(
    `id` INT AUTO_INCREMENT,
    `nationalnum` INT NOT NULL,
    `firstname` VARCHAR(25) NOT NULL,
    `lastname` VARCHAR(25) NOT NULL,
    `email` VARCHAR(60) NOT NULL UNIQUE,
    `upassword` VARCHAR(100) NOT NULL,
    `country` VARCHAR(30) NOT NULL,
    `imageurl` VARCHAR(100) NOT NULL,
    `joineddate` DATE,
    `udescription` TEXT,
    `refreshtoken` TEXT,
    `phonenum` VARCHAR(30),
    PRIMARY KEY(id)
);

--`nationalnum`,`firstname`,`lastname`,`email`,`upassword`,`country`,`imageurl`,`joineddate`,`udescription`,`refreshtoken`,`phonenum`

CREATE TABLE card(
    `id` INT AUTO_INCREMENT,
    `createdby` INT NOT NULL,
    `gender` ENUM('male','female') NOT NULL,
    `country` VARCHAR(30) NOT NULL,
    `city` VARCHAR(30) NOT NULL,
    `phonenum` VARCHAR(30) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `flanguage` VARCHAR(40) NOT NULL,
    `slanguagew` VARCHAR(40) NOT NULL,
    `sdate` DATE NOT NULL,
    `edate` DATE NOT NULL,
    `cost` INT NOT NULL,
    PRIMARY KEY(`id`),
    FOREIGN KEY(`createdby`) REFERENCES user(`id`)
);

-- `createdby`,`gender`,`country`,`city`,`phonenum`,`email`,`flanguage`,`slanguagew`,`sdate`,`edate`

CREATE TABLE rating(
    `id` INT AUTO_INCREMENT,
    `touristid` INT,
    `guideid` INT,
    `rating` TINYINT,
    PRIMARY KEY(`id`),
    FOREIGN KEY(`touristid`) REFERENCES user(`id`),
    FOREIGN KEY(`guideid`) REFERENCES user(`id`)
);

-- `touristid`,`guideid`,`rating`

CREATE TABLE review(
    `id` INT AUTO_INCREMENT,
    `touristid` INT,
    `guideid` INT,
    `comment` TEXT,
    PRIMARY KEY(`id`),
    FOREIGN KEY(`touristid`) REFERENCES user(`id`),
    FOREIGN KEY(`guideid`) REFERENCES user(`id`)
);

-- `touristid`,`guideid`,`comment`