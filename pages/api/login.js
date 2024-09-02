import User from "@/Models/User";

export default async function login(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    const { username, password } = req.body;

    try {
      const user = await User.findOne({ username });

      // Directly compare the passwords (plain text)
      if (user && user.password === password) {
        res.status(200).json({ success: true });
      } else {
        res
          .status(401)
          .json({ success: false, message: "Invalid credentials" });
      }
    } catch (error) {
      console.error("Login error:", error);
      res.status(400).json({ success: false, message: "Login failed" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
