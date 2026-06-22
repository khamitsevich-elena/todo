import EditTask from "../EditTask";
import { deleteTodo, doneTodo } from "../../api/todos";

const Todo = ({ todos, setTodos, filter, filteredTodoFunc }) => {
  const handleDone = async (e, id) => {
    setTodos((todos) => [
      ...todos.map((item) =>
        item.id === id ? { ...item, completed: e.target.checked } : item
      ),
    ]);
    await doneTodo(e, id);
    filteredTodoFunc(filter);
  };
  const handleDelete = (id) => {
    deleteTodo(id);
    setTodos((todos) => [...todos.filter((item) => !(item.id == id))]);
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
                onChange={(e) => handleDone(e, item.id)}
              ></input>
              <p>{item.title}</p>
              <span>{item.description}</span>
              <br></br>
              <button onClick={() => handleDelete(item.id)}>🗑</button>
              <EditTask todos={todos} setTodos={setTodos} id={item.id} />
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
