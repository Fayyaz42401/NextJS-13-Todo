import { errorHandler } from "../../../middlewares/error";
import { isAuthenticated } from "../../../utils/feature";

const profile = async (req, res) => {
  try {
    if (req.method !== "GET")
      return errorHandler(res, 400, "Only GET Method is allowed");

    const user = await isAuthenticated(req);

    if (!user) return errorHandler(res, 401, "Login First");

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    errorHandler(res, 500, error);
  }
};

export default profile;
