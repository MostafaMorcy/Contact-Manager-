import { userModel } from "../../../database/models/user.model.js";
import { generateToken } from "../../utils/generteToken.js";
import { catchAsyncError } from './../../middleware/catchAsyncError.js';
import { AppError } from './../../utils/AppError.js';
import bcrypt from "bcrypt";
const signUp = catchAsyncError(async (req, res, next) => {
let isFound = await userModel.findOne({username:req.body.username});
if (isFound)return next(new AppError("username already exist", 409));
let user = new userModel(req.body);
await user.save();
res.json({ message: "success", user });
});
const signIn = catchAsyncError(async (req, res, next) => {
  const { username, password } = req.body;
  const isFound = await userModel.findOne({ username });
  const match = await bcrypt.compare(password, isFound.password);
  if (isFound && match) {
    let token =generateToken({
      username: isFound.username, userId: isFound._id,
    })
    return res.json({ message: "success", token });
  }
  next(new AppError("incorrect username or password", 409));
});
const users = [
  { username: 'user1', password: 'user1' },
  { username: 'user2', password: 'user2' }
];
const login = catchAsyncError(async (req, res, next) =>{
   const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user){
     res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});






export { signUp, signIn ,login};
