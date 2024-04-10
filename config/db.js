import mongoose from "mongoose";


const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`connected to mongodb database connection host : ${conn.connection.host}`)
    } catch (error) {
        console.log(`Error in data base ${error}`)
    }
}

export default connectDB