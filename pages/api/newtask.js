import { errorHandler } from "../../middlewares/error";
import { Task } from "../../models/task";
import { ConnectDB } from "../../utils/database";
import { isAuthenticated } from "../../utils/feature";

const newTask = async (req, res) => {
  try {
    if (req.method !== "POST")
      return errorHandler(res, 400, "Only POST Method is allowed");

    const { title, description } = req.body;
    await ConnectDB();
    if (!title || !description)
      return errorHandler(res, 400, "Please Enter All fields");

    const user = await isAuthenticated(req);

    if (!user) return errorHandler(res, 401, "Login First");

    const task = await Task.create({
      title,
      description,
      user: user._id,
    });

    res.json({
      success: true,
      message: "Task Created",
      task,
    });
  } catch (error) {
    errorHandler(res, 500, error);
  }
};

export default newTask;
