// pages/api/blogs/[id].js
import connectToDatabase from "../../../lib/mongodb";
import Blog from "../../../Models/blogs";
import mongoose from "mongoose";

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  await connectToDatabase();

  switch (method) {
    case "GET":
      try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
          return res
            .status(400)
            .json({ success: false, message: "Invalid blog ID" });
        }

        const blog = await Blog.findById(id);

        if (!blog) {
          return res
            .status(404)
            .json({ success: false, message: "Blog not found" });
        }

        res.status(200).json({ success: true, data: blog });
      } catch (error) {
        console.error("Error fetching blog:", error);
        res
          .status(400)
          .json({ success: false, message: "Failed to fetch blog" });
      }
      break;

    default:
      res.status(400).json({ success: false, message: "Method not allowed" });
      break;
  }
}
