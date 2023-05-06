import { errorHandler } from "../../../middlewares/error";
import { User } from "../../../models/user";

const alluser = async (req, res) => {
  try {
    const user = await User.find({});

    res.json({
      success: true,
      message: "All User",
      user,
    });
  } catch (error) {
    errorHandler(res, 500, error);
  }
};

export default alluser;
