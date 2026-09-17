import mongoose from 'mongoose'

export const connectDb = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL)
        console.log('DB connected')
    } catch(err) {
        console.log(`Failed to connect to dbL ${err}`)
    }
}