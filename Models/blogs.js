import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date, // Use Date type for better handling
    default: Date.now, // Set the default to the current date and time
  },
  updatedAt: {
    type: Date, // Use Date type for better handling
    default: Date.now, // Set the default to the current date and time
  },
  images: [
    {
      type: String,
    },
  ],
});

// Middleware to update the `updatedAt` field before saving
BlogSchema.pre("save", function (next) {
  this.updatedAt = Date.now(); // Update to the current date and time
  next();
});

export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
