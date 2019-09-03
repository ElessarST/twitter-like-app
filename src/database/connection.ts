import mongoose from 'mongoose'
import * as dotenv from 'dotenv'

dotenv.config()
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true })

export default mongoose
