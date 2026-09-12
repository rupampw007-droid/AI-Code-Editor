import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
const app = express()
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import proxy from 'express-http-proxy'
import { getCurrentUser } from './controllers/user.controller.js'
import { protect } from './middleware/protect.js'
import { proxyWithHeader } from './utils/proxyWithHeader.js'

app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
}))

app.use(cookieParser())
app.use(morgan('dev'))

app.use('/api/auth', proxy(process.env.AUTH_SERVICE))
app.use('/api/project', protect, proxyWithHeader(process.env.PROJECT-SERVICE))
app.get('/api/me', protect, getCurrentUser)
const port = process.env.PORT || 8080

app.get('/', (req,res) => {
    res.json('Hello from gateway')
})

app.listen(port, () => console.log(`Gateway Started at ${port}`))
