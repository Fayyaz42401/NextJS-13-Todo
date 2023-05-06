"use client";

const UpdateForm = ({
  onUpdate,
  onCancel,
  title,
  setTitle,
  setDescription,
  description,
}) => {
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleUpdateClick = () => {
    onUpdate();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-black text-white text-center rounded-lg p-6 shadow-lg">
        <h2 className="text-lg font-medium mb-4">Update Task</h2>
        <div className="mb-4">
          <input
            className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:shadow-outline-blue focus:border-gray-700"
            type="text"
            id="title"
            value={title}
            placeholder="Title"
            onChange={handleTitleChange}
          />
        </div>
        <div className="mb-4">
          <textarea
            className="w-full text-gray-700 px-3 py-2 border rounded-md  focus:outline-none focus:shadow-outline-blue focus:border-gray-700"
            id="description"
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Description"
          ></textarea>
        </div>
        <div className="flex justify-end">
          <button
            className="bg-slate-200 border-2  hover:bg-slate-300  text-black font-bold py-2 px-4 rounded mr-2"
            onClick={handleUpdateClick}
          >
            Update
          </button>
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateForm;
