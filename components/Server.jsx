import { DeleteBtn } from "./Client";

export const TodoItem = ({ title, desc, id, isCompleted }) => {
  return (
    <div className="p-4 bg-black  mx-auto mt-8 text-white flex justify-between">
      <div>
        <h2 className="text-xl">{title}</h2>
        <p>{desc}</p>
      </div>
      <DeleteBtn id={id} isCompleted={isCompleted} />
    </div>
  );
};
