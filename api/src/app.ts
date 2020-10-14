import { config } from 'dotenv'
config()

import { createServer, RequestListener } from 'http'

/**
 * A hostname or IP address that the server will be binded to.
 */
const host: string = process.env.HOST || '127.0.0.1'
/**
 * A TCP port number that the server will be binded to.
 */
const port: number = Number(process.env.PORT) || 3000

/**
 * A handler repound `Hello World`.
 * @param _ a request object which is not used.
 * @param res a responce object.
 */
export const helloWorld: RequestListener = (_, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')
  res.end('Hello World')
}

/**
 * A routine which executes the server
 * while this file executed directly or just exports the handler.
 */
if (require.main === module) {
  console.log('called directly')
  createServer(helloWorld).listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}/`)
  })
} else {
  console.log('required as a module')
}
