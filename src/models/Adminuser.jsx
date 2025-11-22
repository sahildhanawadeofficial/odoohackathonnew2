import mongoose from 'mongoose'

const AdminAccessSchema = new mongoose.Schema({
    email: { type: String, required: [true, "please enter the email"] },
    roles: { type: Object, default: {} },
})


mongoose.models = {}
export default mongoose.model("Adminuser", AdminAccessSchema)

// export default AdminAccessSchema