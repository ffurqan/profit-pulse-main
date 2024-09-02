import mongoose from "mongoose";
import Blog from "@/Models/blogs"; // Import your Blog model
import connectMongo from "@/lib/mongodb"; // Ensure you have a proper MongoDB connection setup

const predefinedBlogs = [
  {
    title: "First Default Blog",
    content: "This is the content of the first default blog.",
    desc: "Short description of the first default blog.",
    images: [],
  },
  {
    title: "Second Default Blog",
    content: "This is the content of the second default blog.",
    desc: "Short description of the second default blog.",
    author: null,
    images: [],
  },
];

async function initializeBlogs() {
  try {
    await connectMongo(); // Connect to MongoDB

    const blogsCount = await Blog.countDocuments(); // Check if any blogs exist

    if (blogsCount === 0) {
      await Blog.insertMany(predefinedBlogs); // Insert predefined blogs
      console.log("Predefined blogs have been added to the database.");
    } else {
      console.log(
        "Blogs already exist in the database. Skipping initialization."
      );
    }
  } catch (error) {
    console.error("Error initializing blogs:", error);
  }
}

export default initializeBlogs;
