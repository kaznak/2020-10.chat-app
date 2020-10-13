import { config } from 'dotenv'
config()

import { createServer } from 'http'

const host: string = process.env.HOST || '127.0.0.1'
const port: number = Number(process.env.PORT) || 3000

const server = createServer((req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')
  res.end('Hello World')
})

server.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}/`)
})
