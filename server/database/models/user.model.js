import mongoose from "mongoose";
import bcrypt from "bcrypt";
const userSchema = mongoose.Schema(
  {
    username: {
        type: String,
        minLength: [2, "name too short"],
        maxLength: [15, "name too long "],
        required: true,
        trim: true,
      },
    password: {
      type: String,
      minlength:[6, "Too short password"],
    }
  },
  {
    timestamps: true,
  }
 );
 userSchema.pre("save", function () {
   console.log(this);
   this.password = bcrypt.hashSync(this.password, 8);
 });
export const userModel = mongoose.model("user", userSchema);
