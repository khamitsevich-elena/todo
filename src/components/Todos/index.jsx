import EditTask from "../EditTask";
import { handleDelete, handleDone } from "../../api/todos";

const Todo = ({ todos, setTodos, edit, setEdit }) => {
  const obj = {
    edit: edit,
    setEdit: setEdit,
    todos: todos,
    setTodos: setTodos,
  };

  return todos.length != 0 ? (
    <>
      {
        <div>
          {todos.map((item) => (
            <li key={item.id}>
              <input
                type="checkbox"
                checked={item.completed || false}
                onChange={(e) => handleDone(e, item.id, setEdit)}
              ></input>
              <p>{item.title}</p>
              <span>{item.description}</span>
              <br></br>
              <button onClick={() => handleDelete(item.id, setTodos)}>🗑</button>

              <EditTask {...obj} id={item.id} />
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
