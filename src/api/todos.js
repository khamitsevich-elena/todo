import { localStorageHelpers } from "../helpers/localStorageHelpers";

const getTodos = async (setTodos) => {
  if (localStorageHelpers.get()) {
    try {
      const response = await fetch(`${import.meta.env.VITE_URL}/todos`, {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${localStorageHelpers.get()}`,
        },
      });
      const todos = await response.json();
      if (response.ok) {
        setTodos(todos.data);
      }
    } catch (error) {
      console.log(error);
    }
  }
};

const handleDelete = async (id, setTodos) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_URL}/todos/${id}`, {
      method: "DELETE",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${localStorageHelpers.get()}`,
      },
    });
    setTodos((todos) => [...todos.filter((item) => !(item.id == id))]);
  } catch (error) {
    console.log(error);
  }
};

const handleDone = async (e, id, setEdit) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_URL}/todos/${id}`, {
      method: "PATCH",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${localStorageHelpers.get()}`,
        "Content-Type": "application/json",
        accept: "*/*",
      },
      body: JSON.stringify({
        completed: e.target.checked,
      }),
    });
    setEdit((edit) => !edit);
  } catch (error) {
    console.log(error);
  }
};

const getFilteredTodos = async (filter, setTodos) => {
  if (localStorageHelpers.get()) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_URL}/todos${filter}`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${localStorageHelpers.get()}`,
          },
        }
      );
      const todos = await response.json();
      setTodos(todos.data);
      return todos.data;
    } catch (error) {
      console.log(error);
    }
  }
};

const editTodo = async (id, editTask, setEdit) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_URL}/todos/${id}`, {
      method: "PATCH",
      headers: {
        accept: "*/*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorageHelpers.get()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editTask),
    });
    const data = await response.json();
    setEdit((edit) => !edit);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const createTodo = async (task, setTodos, setTask, edit, setEdit) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_URL}/todos`, {
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
  setEdit((edit) => !edit);
  setTask({ title: "", description: "" });
};
export {
  getTodos,
  handleDelete,
  handleDone,
  getFilteredTodos,
  editTodo,
  createTodo,
};
