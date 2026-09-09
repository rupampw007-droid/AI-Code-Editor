import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
const app = express()
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import proxy from 'express-http-proxy'

app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
}))

app.use(cookieParser())
app.use(morgan('dev'))

app.use('/api/auth', proxy(process.env.AUTH_SERVICE))

const port = process.env.PORT || 8080

app.get('/', (req,res) => {
    res.json('Hello from gateway')
})

app.listen(port, () => console.log(`Gateway Started at ${port}`))
