import { config } from 'dotenv'
config()
import { createLogger, format, transports } from 'winston'

import { createServer, RequestListener } from 'http'

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  defaultMeta: { service: 'hello-world' },
  transports: [
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.File({ filename: 'combined.log' }),
  ],
})

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
 * @param req a request object which is not used.
 * @param res a responce object.
 */
export const helloWorld: RequestListener = (req, res) => {
  logger.info({
    message: 'incoming request',
    remoteAddress: req.connection.remoteAddress,
    method: req.method,
    url: req.url,
  })

  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')
  res.end('Hello World')
}

/**
 * A routine which executes the server
 * while this file executed directly or just exports the handler.
 */
if (require.main === module) {
  if (process.env.NODE_ENV !== 'production') {
    logger.add(
      new transports.Console({
        format: format.combine(format.colorize(), format.simple()),
      })
    )
  }
  logger.info({
    message: 'called directory',
  })
  createServer(helloWorld).listen(port, host, () => {
    logger.info({
      message: `${process.env.NODE_ENV} server running at http://${host}:${port}/`,
    })
  })
} else {
  logger.info({
    message: 'required as a module',
  })
}
