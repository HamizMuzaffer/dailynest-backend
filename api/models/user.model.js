import { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required : true},
  googleId : {type :String},
  role: { type: String, enum: ["user", "admin"], default: "user" },
  tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
  createdAt: { type: Date, default: Date.now },
});

const User = model("User", userSchema);

export default User;
