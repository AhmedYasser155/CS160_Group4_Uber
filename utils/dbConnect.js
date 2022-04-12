import mongoose from 'mongoose';
import { DATABASE_URL } from "../config/config.json"

// connection object
const connection = {};

// check if we have connection to database, otherwise connect
async function dbConnect() {
    if (connection.isConnected) {
        return;
    }

    const db = await mongoose.connect(DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    connection.isConnected = db.connections[0].readyState;
    console.log(connection.isConnected);
}

export default dbConnect;