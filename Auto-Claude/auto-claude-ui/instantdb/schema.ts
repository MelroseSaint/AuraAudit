import { drizzle } from 'drizzle-orm'
import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core'
import { sql } from 'drizzle-orm'

export const auditResults = sqliteTable('audit_results', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: text('user_id').notNull(),
  identityId: text('identity_id').notNull(),
  score: integer('score').notNull(),
  status: text('status').notNull(),
  details: text('details'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
})

export type AuditResult = typeof auditResults.$inferSelect
