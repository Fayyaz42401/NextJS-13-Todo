import { errorHandler } from "../../../middlewares/error";
import { Task } from "../../../models/task";
import { ConnectDB } from "../../../utils/database";

const singleTask = async (req, res) => {
  try {
    await ConnectDB();

    if (req.method === "DELETE") {
      const task = await Task.findByIdAndDelete(req.query.id);
      if (!task) return errorHandler(res, 400, "Id Not Found");
      res.json({
        success: true,
        message: "Delete Successfully",
        task,
      });
    } else if (req.method === "PUT") {
      const { id } = req.query;
      const { title, description } = req.body;
      const task = await Task.findByIdAndUpdate(id, { title, description });
      if (!task) return errorHandler(res, 400, "Id Not Found");
      const newTask = await task.save();
      res.json({
        success: true,
        message: "Update Successfully",
        task,
        newTask,
      });
    } else {
      errorHandler(res, 400, "Only PUT And DELETE Method is Allowed");
    }
  } catch (error) {
    errorHandler(res, 500, error);
  }
};
export default singleTask;
