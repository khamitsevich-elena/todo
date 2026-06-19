import { localStorageHelpers } from "../../helpers/localStorageHelpers";
import EditTask from "../EditTask";

const Todo = ({ todos, setTodos, edit, setEdit, isDone, setIsDone }) => {
  const handleDelete = async (e) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_URL}/${e.target.id}`,
        {
          method: "DELETE",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${localStorageHelpers.get()}`,
          },
        }
      );
      setTodos((todos) => [
        ...todos.filter((item) => !(item.id == e.target.id)),
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDone = async (e) => {
    setIsDone((isDone) =>
      isDone.map((item, index) => {
        if (index == e.target.value) {
          return !item;
        }
        return item;
      })
    );
    try {
      const response = await fetch(
        `${import.meta.env.VITE_URL}/${e.target.id}`,
        {
          method: "PATCH",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${localStorageHelpers.get()}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            completed: e.target.checked,
          }),
        }
      );
      const data = await response.json();
      setTodos((todos) => [
        ...todos.map((item) => {
          if (item.id == e.target.id) {
            return { ...item, completed: e.target.checked };
          } else {
            return { ...item };
          }
        }),
      ]);
      setEdit((edit) => !edit);
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  return todos.length != 0 ? (
    <>
      {
        <div>
          {todos.map((item, index) => (
            <li key={item.id}>
              <input
                value={index}
                type="checkbox"
                checked={isDone[index] || false}
                onChange={(e) => handleDone(e)}
                id={item.id}
              ></input>
              <p>{item.title}</p>
              <span>{item.description}</span>
              <br></br>
              <button id={item.id} onClick={(e) => handleDelete(e)}>
                🗑
              </button>
              <EditTask
                edit={edit}
                setEdit={setEdit}
                id={item.id}
                todos={todos}
                setTodos={setTodos}
              />
              <hr />
            </li>
          ))}
        </div>
      }
    </>
  ) : (
    <span>List is EMPTY</span>
  );
};

export default Todo;
