import dbConnect from "@/lib/mongodb";
import User from "@/Models/User";

export default async function register(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    const { fullName, username, email, password } = req.body;

    try {
      // Directly store the password without hashing
      const newUser = new User({ fullName, username, email, password });
      await newUser.save();
      res.status(201).json({ success: true });
    } catch (error) {
      if (error.code === 11000) {
        const duplicateField = Object.keys(error.keyPattern)[0];
        res.status(400).json({
          success: false,
          message: `${
            duplicateField.charAt(0).toUpperCase() + duplicateField.slice(1)
          } is already registered. Please use a different one.`,
        });
      } else {
        res
          .status(500)
          .json({ success: false, message: "Registration failed!" });
      }
    }
  } else {
    console.log("Received GET request");
    const users = await User.find();
    console.log("Retrieved Contacts:", users);
    res.status(200).json({ success: true, data: users });
  }
}
