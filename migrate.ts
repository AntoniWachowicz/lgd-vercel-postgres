/* eslint-disable no-console */
import payload from 'payload'
import type { InitOptions } from 'payload/config'

import payloadConfig from './src/payload/payload.config'

const migrate = async (): Promise<void> => {
  // Load the config file directly

  const initOptions: InitOptions = {
    secret: process.env.PAYLOAD_SECRET || '',
    local: true,
    // Use the imported config instead of specifying configPath
    ...payloadConfig,
  }

  // Initialize Payload
  await payload.init(initOptions)

  // Run migrations
  await payload.db.migrate()
  console.log('Migration successful')
  process.exit(0)
}

migrate().catch((err: Error) => {
  console.error('Migration failed', err)
  process.exit(1)
})
