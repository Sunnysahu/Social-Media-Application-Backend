import mongoose from "mongoose";

const DB = async () => mongoose.connect(process.env.URI);

const conn = mongoose.connection;
conn.on("connected", () => {
  console.log("Mongoose Connected :::");
});

export default DB;
