import { User } from "../../../models/user";
import { errorHandler } from "../../../middlewares/error";
import { ConnectDB } from "../../../utils/database";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookieSetter } from "../../../utils/feature";
const Register = async (req, res) => {
  try {
    await ConnectDB();
    if (req.method !== "POST")
      return errorHandler(res, 400, "Only Post Method");
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return errorHandler(res, 400, "All fields are required");

    let user = await User.findOne({ email });

    if (user) return errorHandler(res, 400, "User already exists");
    const hashPassword = await bcrypt.hash(password, 10);

    user = await User.create({
      name,
      email,
      password: hashPassword,
    });

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    cookieSetter(res, token, true);

    res.status(201).json({
      success: true,
      message: "User created successfully ",
      user,
    });

    errorHandler();
  } catch (error) {
    errorHandler(res, 500, error);
  }
};

export default Register;
