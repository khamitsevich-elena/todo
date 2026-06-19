import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import Todo from "../Todos";
import { useSearchParams } from "react-router";
import { localStorageHelpers } from "../../helpers/localStorageHelpers";

const FilteredTodos = ({ todos, setTodos, isDone, setIsDone }) => {
  const [edit, setEdit] = useState(false);
  const [filter, setFilter] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const func = async () => {
      if (localStorage.getItem("token")) {
        try {
          const response = await fetch(`${import.meta.env.VITE_URL}${filter}`, {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${localStorageHelpers.get()}`,
            },
          });
          const todos = await response.json();
          setTodos(todos.data);
          setIsDone(todos.data.map((item) => item.completed));
          return todos.data;
        } catch (error) {
          console.log(error);
        }
      }
    };
    func();
  }, [filter, edit]);

  const onChange = (key) => {
    switch (key) {
      case "1":
        setSearchParams({});
        setFilter("");
        break;
      case "2":
        setSearchParams({ completed: true });
        setFilter(`?completed=true`);
        break;
      case "3":
        setSearchParams({ completed: false });
        setFilter(`?completed=false`);
        break;
    }
  };

  const items = [
    {
      key: "1",
      label: "ALL",
      children: (
        <Todo
          todos={todos}
          setTodos={setTodos}
          isDone={isDone}
          setIsDone={setIsDone}
          filter={""}
          edit={edit}
          setEdit={setEdit}
        />
      ),
    },
    {
      key: "2",
      label: "Checked",
      children: (
        <Todo
          todos={todos}
          setTodos={setTodos}
          isDone={isDone}
          setIsDone={setIsDone}
          filter={"?completed=true"}
          edit={edit}
          setEdit={setEdit}
        />
      ),
    },
    {
      key: "3",
      label: "Not Finished",
      children: (
        <Todo
          todos={todos}
          isDone={isDone}
          setIsDone={setIsDone}
          setTodos={setTodos}
          filter={"?completed=false"}
          edit={edit}
          setEdit={setEdit}
        />
      ),
    },
  ];
  return <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;
};
export default FilteredTodos;
