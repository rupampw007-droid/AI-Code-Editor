import express from 'express'
import dotenv from 'dotenv'
import { connectDb } from './config/db.js';
import router from './routes/auth.route.js';
dotenv.config()
const app = express()

app.use(express.json())

const port = process.env.PORT || 8081

app.use('/', router)
app.get('/', (req,res) => {
    res.json('Hello from gateway')
})

app.listen(port, () =>{
    connectDb();
    console.log(`Auth Service started at ${port}`)
})
