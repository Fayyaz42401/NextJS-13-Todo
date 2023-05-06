import { cookieSetter } from "../../../utils/feature";

const logout = (req, res) => {
  try {
    if (req.method !== "GET") return errorHandler(res, 400, "Only Post Method");

    cookieSetter(res, null, false);

    res.status(200).json({
      success: true,
      message: "Logout Successfully",
    });
  } catch (error) {
    errorHandler(res, 500, error);
  }
};

export default logout;
