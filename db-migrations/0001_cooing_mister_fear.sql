CREATE TABLE `sessions` (
	`id` varchar(24) NOT NULL,
	`secret_hash` varchar(64) NOT NULL,
	`created_at` int NOT NULL,
	CONSTRAINT `sessions_id` PRIMARY KEY(`id`)
);
