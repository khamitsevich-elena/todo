import React, { useState } from "react";
import { Button, Modal } from "antd";
import { editTodo } from "../../api/todos";

const EditTask = ({ todos, id, setTodos }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTask, setEditTask] = useState({});

  const showModal = () => {
    setIsModalOpen(true);
    setEditTask(todos.filter((item) => item.id == id)[0]);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    editTodo(editTask.id, editTask);
    setTodos((todos) =>
      todos.map((item) => (item.id == editTask.id ? editTask : item))
    );
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button onClick={showModal}>Edit</Button>
      <Modal
        title="Edit"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>
          Заголовок
          <input
            value={editTask.title}
            onChange={(e) =>
              setEditTask((editTask) => ({
                ...editTask,
                [e.target.name]: e.target.value,
              }))
            }
            name="title"
          />
        </p>
        <p>
          Описание
          <input
            value={editTask.description}
            onChange={(e) =>
              setEditTask((editTask) => ({
                ...editTask,
                [e.target.name]: e.target.value,
              }))
            }
            name="description"
          />
        </p>
      </Modal>
    </>
  );
};

export default EditTask;
