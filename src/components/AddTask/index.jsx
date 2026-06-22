import { useState } from "react";
import { createTodo } from "../../api/todos";

function AddTask({ setTodos }) {
  const [task, setTask] = useState({ title: "", description: "" });

  const handlechange = (e) => {
    setTask((task) => ({ ...task, [e.target.name]: e.target.value }));
  };

  const createTodofunc = async () => {
    const createdTodo = await createTodo(task);
    if (createdTodo) {
      setTodos((todos) => [...todos, createdTodo]);
      setTask({ title: "", description: "" });
    }
  };

  return (
    <div>
      <input name="title" value={task.title} onChange={handlechange}></input>
      <input
        name="description"
        value={task.description}
        onChange={handlechange}
      ></input>
      <button onClick={() => createTodofunc()}>Submit</button>
    </div>
  );
}
export default AddTask;
