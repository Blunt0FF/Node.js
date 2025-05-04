import mongoose from "mongoose";

// Группа с названием и участниками

const groupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
}, { timestamps: true });

const Group = mongoose.model("Group", groupSchema);
export default Group;