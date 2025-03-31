import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  size: {
    type: Number,
  },
  mediaType: {
    type: String, // 'Sunny', 'File', 'Video'
  },
  caption: {
    type: String,
  },
  url: {
    type: String,
  },
});

export default mongoose.model.Media || mongoose.model("Media", mediaSchema);
