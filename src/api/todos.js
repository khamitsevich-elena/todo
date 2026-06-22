import { localStorageHelpers } from "../helpers/localStorageHelpers";

const getTodos = async () => {
  if (localStorageHelpers.get()) {
    try {
      const response = await fetch(`${import.meta.env.VITE_URL}/todos`, {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${localStorageHelpers.get()}`,
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
};

const createTodo = async (task) => {
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
    return data;
  } catch (error) {
    console.log(error);
  }
};

const deleteTodo = async (id) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_URL}/todos/${id}`, {
      method: "DELETE",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${localStorageHelpers.get()}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const doneTodo = async (e, id) => {
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
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

const editTodo = async (id, editTask) => {
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
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getFilteredTodos = async (filter) => {
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
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
};

export {
  getTodos,
  createTodo,
  deleteTodo,
  doneTodo,
  getFilteredTodos,
  editTodo,
};
