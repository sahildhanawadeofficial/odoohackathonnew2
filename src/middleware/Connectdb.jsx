// import mongoose from "mongoose"

// const Connectdb = (handler) => (req) => {
//     mongoose.set('strictQuery', true)
//     if (mongoose.connections[process.env.PROJECTID] && mongoose.connections[process.env.PROJECTID].readyState) {
//         return handler(req)
//     }
//     else {
//         mongoose.connect(process.env.MONGODB_URI, { dbName: process.env.PROJECTID, serverSelectionTimeoutMS: 70000 })
//         return handler(req)
//     }
// }

// export default Connectdb










import mongoose from "mongoose"

const cached = global.mongoose || { conn: null, promise: null }

async function dbConnect() {
    if (cached.conn) return cached.conn

    if (!cached.promise) {
        mongoose.set("strictQuery", true)
        cached.promise = mongoose.connect(process.env.MONGODB_URI, {
            dbName: process.env.PROJECTID,
            serverSelectionTimeoutMS: 70000,
            socketTimeoutMS: 70000,
            connectTimeoutMS: 70000,
        })
    }

    try {
        cached.conn = await cached.promise
        global.mongoose = cached
    } catch (err) {
        cached.promise = null // reset on failure
        throw err
    }

    return cached.conn
}

const Connectdb = (handler) => async (req, res) => {
    try {
        await dbConnect()
        return handler(req, res)
    } catch (err) {
        console.error("❌ MongoDB connection error:", err)
        return res.status(500).json({ error: "Database connection failed" })
    }
}

export default Connectdb
