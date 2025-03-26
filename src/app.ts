require('dotenv').config()
import express, { Request, Response, NextFunction } from 'express'
import allRoutes from './v1/presentation/routes' // Fixed import path
import swaggerUi from 'swagger-ui-express'
import openApiSpec from './v1/helpers/apiDocumentation/v3'
import helmet from 'helmet'
import cors from 'cors'
import logger from './v1/helpers/logger'

const app = express()
const urlBase: string = 'api/v1'

if (process.env.NODE_ENV !== 'production') {
  // OpenAPI V3
  app.use(`/${urlBase}/doc3/apiDocumentation`, swaggerUi.serve, swaggerUi.setup(openApiSpec))
}

app.use(helmet())
app.use(cors())
app.use(express.json())

// Redirect root URL to OpenAPI V3 documentation
app.get('/', (req: Request, res: Response) => {
  return res.redirect(301, `/${urlBase}/doc3/apiDocumentation`) // Changed to 301 Permanent Redirect
})

app.use(`/${urlBase}/projects`, allRoutes) // Updated to match project endpoints

const handleNotFound = (req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next()
  }
  return res.status(404).json({ message: 'Not Found' })
}

const handleError = (err: Error, req: Request, res: Response) => {
  logger.error(err.stack)

  let statusCode = 500

  if (err.name === 'ValidationError') statusCode = 400
  else if (err.name === 'UnauthorizedError') statusCode = 401
  else if (err.name === 'ForbiddenError') statusCode = 403
  else;

  const errorResponse = {
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : ''
  }

  res.status(statusCode).json(errorResponse)
}

app.use(handleNotFound)
app.use(handleError)

export default app
