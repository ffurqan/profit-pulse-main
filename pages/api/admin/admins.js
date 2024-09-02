import dbConnect from "@/lib/mongodb";
import admins from "@/Models/admins";

export default async function register(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    const { username, password } = req.body;
    try {
      const newAdmin = new admins({ username, password });
      await newAdmin.save();
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
    const admins = await admins.find();
    console.log("Retrieved admins:", admins);
    res.status(200).json({ success: true, data: admins });
  }
}
