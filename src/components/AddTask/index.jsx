import { useState } from "react";
import { localStorageHelpers } from "../../helpers/localStorageHelpers";

function AddTask({ setTodos }) {
  const [task, setTask] = useState({ title: "", description: "" });
  const handlechange = (e) => {
    setTask((task) => ({ ...task, [e.target.name]: e.target.value }));
  };
  const createTask = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_URL}`, {
        method: "POST",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${localStorageHelpers.get()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });
      const data = await response.json();
      if (response.ok) {
        setTodos((tasks) => {
          if (tasks) {
            return [data, ...tasks];
          } else {
            return [data];
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
    setTask({ title: "", description: "" });
  };

  return (
    <div>
      <input name="title" value={task.title} onChange={handlechange}></input>
      <input
        name="description"
        value={task.description}
        onChange={handlechange}
      ></input>
      <button onClick={createTask}>Submit</button>
    </div>
  );
}
export default AddTask;
