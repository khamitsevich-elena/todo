import { useState, useEffect } from "react";
import "./styles.css";
import Registration from "../Registration";
import AddTask from "../../components/AddTask";
import Login from "../Login";
import { Routes, Route, Link, useNavigate } from "react-router";
import PrivateRoute from "../../components/PrivateRoute";
import FilteredTodos from "../../components/FilteredTodos";
import { localStorageHelpers } from "../../helpers/localStorageHelpers";
import { getTodos } from "../../api/todos";

function App() {
  const navigate = useNavigate();
  const linkToMainPage = () => {
    localStorageHelpers.delete();
    navigate("/");
  };

  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const todos = getTodos();
    if (todos.ok) {
      setTodos(todos.data);
    }
  }, [todos]);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Link to="/registration">Регистрация</Link>
              <Link to="/login">Вход</Link>
            </>
          }
        />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route
            path="/Tasks"
            element={
              <>
                <AddTask setTodos={setTodos} />
                <FilteredTodos todos={todos} setTodos={setTodos} />
                <button onClick={linkToMainPage}>Выйти</button>
              </>
            }
          />
        </Route>
        <Route path="*" element={"404 Not Found"} />
      </Routes>
    </>
  );
}
export default App;
