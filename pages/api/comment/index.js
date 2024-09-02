import dbConnect from "@/lib/mongodb";
import Comment from "@/Models/comments";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    try {
      const { blogId, username, content } = req.body;
      const comment = new Comment({ blogId, username, content });
      await comment.save();
      res.status(201).json({ success: true, data: comment });
    } catch (error) {
      res.status(400).json({ success: false, error });
    }
  } else if (req.method === "GET") {
    try {
      const { blogId } = req.query;
      const comments = await Comment.find({ blogId }).sort({ createdAt: -1 });
      res.status(200).json({ success: true, data: comments });
    } catch (error) {
      res.status(400).json({ success: false, error });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
