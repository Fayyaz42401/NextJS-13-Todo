import { errorHandler } from "../../../middlewares/error";
import { User } from "../../../models/user";
import { ConnectDB } from "../../../utils/database";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookieSetter } from "../../../utils/feature";

const login = async (req, res) => {
  try {
    if (req.method !== "POST")
      return errorHandler(res, 400, "Only Post Method");

    await ConnectDB();
    const { email, password } = req.body;
    if (!email || !password)
      return errorHandler(res, 400, "All fields are required");

    let user = await User.findOne({ email });

    if (!user) return errorHandler(res, 400, "Invalid email and password");

    const verifyPassword = await bcrypt.compare(password, user.password);

    if (!verifyPassword)
      return errorHandler(res, 400, "Invalid email and password");

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    cookieSetter(res, token, true);

    res.status(200).json({
      success: true,
      message: `Welcome back '${user.name?.toUpperCase()}'`,
      user,
    });
  } catch (error) {
    errorHandler(res, 500, error);
  }
};

export default login;
