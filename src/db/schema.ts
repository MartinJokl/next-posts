import { int, mysqlTable, text, varchar } from "drizzle-orm/mysql-core";


export const postsTable = mysqlTable('posts', {
  id: int().primaryKey().autoincrement(),
  title: varchar({ length: 50 }).notNull(),
  content: text().notNull()
});