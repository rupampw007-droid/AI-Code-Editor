import express from 'express'
import dotenv from 'dotenv'
import { connectDb } from './config/db.js';
dotenv.config()
const app = express()

const port = process.env.PORT || 8081

app.get('/', (req,res) => {
    res.json('Hello from gateway')
})

app.listen(port, () =>{
    connectDb();
    console.log(`Auth Service started at ${port}`)
})
