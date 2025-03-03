//Create post Schema
import mongoose, { Schema } from "mongoose";

const postSchema = new Schema();

export default mongoose.model("Post", postSchema);