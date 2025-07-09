import { reset, seed } from 'drizzle-seed'
import { schema } from './schema/index.ts'
import { db, sql } from './connection.ts'

await reset(db, schema)

await seed(db, schema).refine((f) => ({
  rooms: {
    count: 20,
    columns: {
      name: f.companyName(),
      description: f.loremIpsum(), // Corrigido de "lorenIpsun"
    }, 
    question: {
      count: 20
    }
  }
}))

await sql.end()

// biome-ignore lint/suspicious/noConsole: only for development
console.log("✅ Database Seeded")
