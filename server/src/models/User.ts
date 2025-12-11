
import mongoose, { InferSchemaType } from 'mongoose';
const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique:true
    },
    email: {
        type: mongoose.Schema.Types.String,
        required: true,
        lowercase: true,
        
    },
    password: {
        type: mongoose.Schema.Types.String,
        required: true
    }

// }, {
//     timestamps: true
})

export type User = InferSchemaType<typeof userSchema>;
export default mongoose.model('User', userSchema)