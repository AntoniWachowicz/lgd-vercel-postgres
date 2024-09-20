/* eslint-disable no-console */
import { migrate } from '@payloadcms/db-postgres'
import pg from 'pg'

async function migrate() {
  const client = new pg.Client({
    connectionString: process.env.DATABASE_URI,
  })

  try {
    await client.connect()
    console.log('Connected to database')

    await migrate(client)
    console.log('Migrations completed successfully')
  } catch (error) {
    console.error('Migration failed:', error)
    process.exit(1)
  } finally {
    await client.end()
  }
}

migrate()
