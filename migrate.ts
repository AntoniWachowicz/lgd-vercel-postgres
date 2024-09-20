/* eslint-disable no-console */
import payload from 'payload'
import type { InitOptions } from 'payload/config'

async function migrate(): Promise<void> {
  // Import the config file directly
  const { default: payloadConfig } = await import('./src/payload/payload.config')

  const initOptions: InitOptions = {
    secret: process.env.PAYLOAD_SECRET || '',
    local: true, // This ensures Payload runs in local mode
    // Spread the imported config to include all necessary options
    ...payloadConfig,
  }

  await payload.init(initOptions)

  await payload.db.migrate()
  console.log('Migration completed successfully')
  process.exit(0)
}

migrate().catch((error: Error) => {
  console.error('Migration failed:', error)
  process.exit(1)
})
