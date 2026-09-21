import { sendVerificationCode } from "../middleware/email.js";
import UserModel from "../model/authModel.js";
import bcrypt from "bcrypt";

const register = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    if (!email || !name || !password) {
      res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const existUser = await UserModel.findOne({ email });
    if (existUser) {
      res.status(400).json({ success: false, message: "User already exists" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000,
    ).toString();

    const user = new UserModel({
      email,
      name,
      password: hashPassword,
      verificationCode,
    });
    await user.save();
    await sendVerificationCode(user.email, user.verificationCode);
    res
      .status(201)
      .json({ success: true, message: "User registered successfully", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "internal server error" });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { code } = req.body;
    const user = await UserModel.findOne({ verificationCode: code });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid verification code" });
    }
    user.isVerified = true;
    user.verificationCode = null;
    await user.save();
    res
      .status(200)
      .json({ success: true, message: "Email verified successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "internal server error" });
  }
};

export { register, verifyEmail };
