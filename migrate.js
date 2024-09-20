/* eslint-disable no-console */
const { Client } = require('pg')
const payload = require('payload')

async function runMigrations() {
  const client = new Client({
    connectionString: process.env.DATABASE_URI,
  })

  try {
    await client.connect()
    console.log('Connected to database')

    // Initialize Payload
    await payload.init({
      secret: process.env.PAYLOAD_SECRET,
      local: true,
      // Make sure this path is correct
      configPath: require.resolve('./src/payload/payload.config.ts'),
    })

    // Run migrations
    await payload.db.migrate()
    console.log('Migrations completed successfully')
  } catch (error) {
    console.error('Migration failed:', error)
    process.exit(1)
  } finally {
    await client.end()
    process.exit(0)
  }
}

runMigrations()
