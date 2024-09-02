import connectMongo from "@/lib/mongodb";
import User from "@/Models/User";
import bcrypt from "bcryptjs";
import crypto from "crypto"; // pages/api/auth/reset-password.js
import { createTransporter } from "@/lib/nodemailer"; // Adjust path if necessary

export default async function handler(req, res) {
  await connectMongo();

  if (req.method === "POST") {
    const { email, token, newPassword } = req.body;

    if (!email && !token && !newPassword) {
      return res.status(400).json({ message: "Invalid request." });
    }

    if (email) {
      // Case 1: Request password reset link
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }

      // Generate reset token
      const resetToken = crypto.randomBytes(32).toString("hex");
      const resetTokenExpiry = Date.now() + 3600000; // 1 hour expiry

      user.resetPasswordToken = resetToken;
      user.resetPasswordExpiry = resetTokenExpiry;
      await user.save();

      // Send reset email
      const transporter = await createTransporter();

      const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}&email=${email}`;

      const mailOptions = {
        to: user.email,
        from: process.env.EMAIL_USER,
        subject: "Password Reset Request",
        text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n
        Please click on the following link, or paste this into your browser to complete the process:\n\n
        ${resetUrl}\n\n
        If you did not request this, please ignore this email and your password will remain unchanged.\n`,
      };

      await transporter.sendMail(mailOptions);
      return res.status(200).json({ message: "Reset link sent." });
    } else if (token && newPassword) {
      // Case 2: Reset password using the token
      const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpiry: { $gt: Date.now() }, // Check token expiry
      });

      if (!user) {
        return res.status(400).json({ message: "Invalid or expired token." });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpiry = undefined;
      await user.save();

      return res.status(200).json({ message: "Password reset successful." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
