import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import Todo from "../Todos";
import { useSearchParams } from "react-router";
import { getFilteredTodos } from "../../api/todos";

const FilteredTodos = ({ todos, setTodos, edit, setEdit }) => {
  const [filter, setFilter] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const obj = {
    todos: todos,
    setTodos: setTodos,
    edit: edit,
    setEdit: setEdit,
  };
  useEffect(() => {
    getFilteredTodos(filter, setTodos);
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
      children: <Todo {...obj} filter={""} />,
    },
    {
      key: "2",
      label: "Checked",
      children: <Todo {...obj} filter={"?completed=true"} />,
    },
    {
      key: "3",
      label: "Not Finished",
      children: <Todo {...obj} filter={"?completed=false"} />,
    },
  ];
  return <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;
};
export default FilteredTodos;
