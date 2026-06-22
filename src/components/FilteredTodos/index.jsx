import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import Todo from "../Todos";
import { useSearchParams } from "react-router";
import { getFilteredTodos } from "../../api/todos";

const FilteredTodos = ({ todos, setTodos }) => {
  const [filter, setFilter] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const filteredTodoFunc = async () => {
    const filteredTodo = await getFilteredTodos(filter);
    setTodos(filteredTodo.data);
  };
  useEffect(() => {
    filteredTodoFunc();
  }, [filter]);

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
          filter={filter}
          filteredTodoFunc={filteredTodoFunc}
          todos={todos}
          setTodos={setTodos}
        />
      ),
    },
    {
      key: "2",
      label: "Checked",
      children: (
        <Todo
          filter={filter}
          filteredTodoFunc={filteredTodoFunc}
          todos={todos}
          setTodos={setTodos}
        />
      ),
    },
    {
      key: "3",
      label: "Not Finished",
      children: (
        <Todo
          filter={filter}
          filteredTodoFunc={filteredTodoFunc}
          todos={todos}
          setTodos={setTodos}
        />
      ),
    },
  ];
  return <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;
};
export default FilteredTodos;
