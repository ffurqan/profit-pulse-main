import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: false },
});

export default mongoose.models.admins || mongoose.model("admins", adminSchema);
