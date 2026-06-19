import React, { useState } from "react";
import { Button, Modal } from "antd";
import { localStorageHelpers } from "../../helpers/localStorageHelpers";

const EditTask = ({ todos, id, setTodos, edit, setEdit }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTask, setEditTask] = useState(
    todos.filter((item) => item.id == id)[0]
  );

  const func = (e) => {
    setEditTask((editTask) => ({
      ...editTask,
      [e.target.name]: e.target.value,
    }));
  };
  const editFunc = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_URL}/${id}`, {
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
      setEdit((edit) => !edit);
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    editFunc();
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
            onChange={(e) => func(e)}
            name="title"
          ></input>
        </p>
        <p>
          Описание
          <input
            value={editTask.description}
            onChange={(e) => func(e)}
            name="description"
          ></input>
        </p>
      </Modal>
    </>
  );
};

export default EditTask;
