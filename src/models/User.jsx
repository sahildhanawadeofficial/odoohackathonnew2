import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    email: { type: String, required: [true, "please enter the email"] },
    roles: { type: Object },
    planExpiry: { type: String }
})


mongoose.models = {}
export default mongoose.model("User", UserSchema)
