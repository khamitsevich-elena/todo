import { useState } from "react";
import { createTodo } from "../../api/todos";

function AddTask({ setTodos, edit, setEdit }) {
  const [task, setTask] = useState({ title: "", description: "" });

  const handlechange = (e) => {
    setTask((task) => ({ ...task, [e.target.name]: e.target.value }));
  };

  return (
    <div>
      <input name="title" value={task.title} onChange={handlechange}></input>
      <input
        name="description"
        value={task.description}
        onChange={handlechange}
      ></input>
      <button
        onClick={() => createTodo(task, setTodos, setTask, edit, setEdit)}
      >
        Submit
      </button>
    </div>
  );
}
export default AddTask;
