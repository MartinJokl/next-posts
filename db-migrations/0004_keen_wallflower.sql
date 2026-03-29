CREATE TABLE `users` (
	`username` varchar(50) NOT NULL,
	`password` text NOT NULL,
	CONSTRAINT `users_username` PRIMARY KEY(`username`)
);
