CREATE TABLE `posts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(50) NOT NULL,
	`content` text NOT NULL,
	CONSTRAINT `posts_id` PRIMARY KEY(`id`)
);
