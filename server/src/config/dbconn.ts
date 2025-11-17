const mongoose = require('mongoose')
export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI)
    } catch (err) {
        console.error("error connection to DB\n" + err)
    }
}
export default connectDB