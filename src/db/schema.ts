import { int, mysqlTable, text, varchar } from "drizzle-orm/mysql-core";


export const postsTable = mysqlTable('posts', {
  id: int().primaryKey().autoincrement(),
  title: varchar({ length: 50 }).notNull(),
  content: text().notNull(),
  creatorUsername: varchar({ length: 50 }).notNull().references(() => userTable.username, { onDelete: 'cascade' })
});

export const userTable = mysqlTable('users', {
  username: varchar({ length: 50 }).primaryKey(),
  password: text().notNull()
})

export const sessionsTable = mysqlTable('sessions', {
  id: varchar({ length: 24 }).primaryKey(),
  secretHash: text().notNull(),
  createdAt: int().notNull(), // seconds
  userUsername: varchar({ length: 50 }).notNull().references(() => userTable.username, { onDelete: 'cascade' })
});