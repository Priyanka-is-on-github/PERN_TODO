import React, { useState } from "react";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import EditTodo from "./EditTodo";
import { useContext, createContext } from "react";
import { BlurContext, DeleteContext } from "../App.tsx";

export const DeleteEditContext = createContext();

type Props = { todo: { task: string; index: number; id: number } };

function Todo(props: Props) {
  const { blurActive, setBlurActive } = useContext(BlurContext);
  const { addTodo, setAddTodo } = useContext(DeleteContext);

  const [isEditing, setIsEditing] = useState("");

  const deleteTodo = async () => {
    try {
      const response = await fetch(
        `http://localhost:3421/api/v1/todos/${props.todo.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const deltodo = await response.json();
      // console.log(deltodo.message)
    } catch (error) {
      console.log(error);
    }

    try {
      const request = await fetch("http://localhost:3421/api/v1/todos", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const allTodos = await request.json();
      //  console.log(allTodos)

      const todosComponents = allTodos.map((currele, index) => {
        const id = currele.todo_id;
        const task = currele.description;

        return <Todo key={index} todo={{ task, index, id }} />;
      });

      setAddTodo(todosComponents);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditClick = async () => {
    setBlurActive(!blurActive);

    let editTask;

    try {
      const response = await fetch(
        `http://localhost:3421/api/v1/todos/${props.todo.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const tobeEdit = await response.json();
      // console.log(tobeEdit[0].description)
      editTask = tobeEdit[0].description;
    } catch (error) {
      console.log(error);
    }
    setIsEditing(
      <EditTodo value={{ editTask: editTask, id: props.todo.id }} />
    );
  };

  return (
    <>
      <DeleteEditContext.Provider value={{ isEditing, setIsEditing }}>
        {isEditing}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "38rem",
            fontWeight: 700,
            fontSize: 20,
            backgroundColor: "#070F2B",
            borderRadius: 5,
            boxShadow: "2px 4px 6px rgba(0,0,0,0.4)",
            p: "10px 0px",
            mb: 2,
          }}
        >
          <Box sx={{ flex: "6", pl: 4, color: "#fff", fontSize: "16px" }}>
            {`${props.todo.index + 1}. ${props.todo.task}`}
          </Box>

          <Box sx={{ flex: "1", textAlign: "center" }}>
            <IconButton
              aria-label="edit"
              sx={{ color: "#fff" }}
              onClick={handleEditClick}
            >
              <EditIcon />
            </IconButton>
          </Box>

          <Box sx={{ flex: "1", textAlign: "center" }}>
            <IconButton
              aria-label="delete"
              sx={{ color: "#fff" }}
              onClick={deleteTodo}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
      </DeleteEditContext.Provider>
    </>
  );
}

export default Todo;
