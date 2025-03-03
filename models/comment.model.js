//Create post Schema
import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema();

export default mongoose.model("Comment", commentSchema);