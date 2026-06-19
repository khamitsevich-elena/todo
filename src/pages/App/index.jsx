import { useState, useEffect } from "react";
import "./styles.css";
import Registration from "../Registration";
import AddTask from "../../components/AddTask";
import Login from "../Login";
import { Routes, Route, Link, useNavigate } from "react-router";
import PrivateRoute from "../../components/PrivateRoute";
import FilteredTodos from "../../components/FilteredTodos";
import { localStorageHelpers } from "../../helpers/localStorageHelpers";

function App() {
  const navigate = useNavigate();
  const linkToMainPage = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  const [todos, setTodos] = useState([]);
  const [isDone, setIsDone] = useState([]);
  useEffect(() => {
    const func = async () => {
      if (localStorageHelpers.get()) {
        try {
          const response = await fetch(`${import.meta.env.VITE_URL}`, {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${localStorageHelpers.get()}`,
            },
          });
          const todos = await response.json();
          if (response.ok) {
            setTodos(todos.data);
            setIsDone(todos.data.map((item) => item.completed));
          }
        } catch (error) {
          console.log(error);
        }
      }
    };
    func();
  }, []);
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              {" "}
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
                <FilteredTodos
                  todos={todos}
                  setTodos={setTodos}
                  isDone={isDone}
                  setIsDone={setIsDone}
                />
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