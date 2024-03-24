import mongoose from "mongoose";

mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGO_DB_CONNECTION_STRING!

main().catch(console.error)
async function main() {
    await mongoose.connect(mongoDB)
    console.log("connected")
}