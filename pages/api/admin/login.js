// pages/api/admin/login.js

import admins from "@/Models/admins";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { username, password } = req.body;

    // Fetch the admin from the database
    const admin = await admins.findOne({ username });

    // Check if admin exists and password matches
    if (admin && admin.password === password) {
      return res.status(200).json({ message: "Login successful" });
    }

    // If not, check against environment variables
    if (
      password === process.env.ADMIN_PASSWORD &&
      username === process.env.ADMIN_USERNAME
    ) {
      return res.status(200).json({ message: "Login successful" });
    }

    // If both checks fail, return an error
    return res.status(401).json({ message: "Invalid username or password" });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
