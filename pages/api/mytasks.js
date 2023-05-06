import { errorHandler } from "../../middlewares/error";
import { Task } from "../../models/task";
import { ConnectDB } from "../../utils/database";
import { isAuthenticated } from "../../utils/feature";

const allTasks = async (req, res) => {
  try {
    if (req.method !== "GET")
      return errorHandler(res, 400, "Only GET Method Is Allowed");
    await ConnectDB();
    const user = await isAuthenticated(req);
    if (!user) return errorHandler(res, 400, "Login First");
    const tasks = await Task.find({ user: user._id });

    res.status(200).json({
      success: true,
      message: "All Task",
      tasks,
    });
  } catch (error) {
    errorHandler(res, 500, error);
  }
};

export default allTasks;
