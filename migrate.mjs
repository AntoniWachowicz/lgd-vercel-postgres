/* eslint-disable no-console */
import path from 'path'
import payload from 'payload'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function migrate() {
  const configPath = path.resolve(__dirname, './src/payload/payload.config.ts')

  await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    local: true,
    configPath,
  })

  await payload.db.migrate()
  console.log('Migration completed successfully')
  process.exit(0)
}

migrate().catch(error => {
  console.error('Migration failed:', error)
  process.exit(1)
})
