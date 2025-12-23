import type { Config } from 'drizzle-kit'

export default {
  schema: './instantdb/schema.ts',
  dialect: 'turso',
  dbCredentials: {
    url: process.env.TURSO_DATABASE_URL || 'file:local.db'
  }
} satisfies Config
