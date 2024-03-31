import { Paper, Box, Typography, Input, IconButton } from "@mui/material";
import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useContext } from "react";
import Todo, { DeleteEditContext } from "./Todo";
import { DeleteContext } from "../App";

function EditTodo({ value }) {
  const [editing, setEditing] = useState(value.editTask);
  const { isEditing, setIsEditing } = useContext(DeleteEditContext);
  const { addTodo, setAddTodo } = useContext(DeleteContext);

  const handelEditing = (event) => {
    setEditing(event.target.value);
  };

  const edditedTodo = async () => {
    try {
      const response = await fetch(
        `http://localhost:3421/api/v1/todos/${value.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({ description: editing }),
        }
      );
     
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

      const todosComponents = allTodos.map((currele, index) => {
        const id = currele.todo_id;
        const task = currele.description;

        return <Todo key={index} todo={{ task, index, id }} />;
      });

      setAddTodo(todosComponents);
    } catch (error) {
      console.log(error);
    }

    setIsEditing("");
  };

  const delEdit = async () => {
    try {
      const response = await fetch(
        `http://localhost:3421/api/v1/todos/${value.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const deltodo = await response.json();
      console.log(deltodo.message);
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
      // console.log(todosComponents)
      setAddTodo(todosComponents);
    } catch (error) {
      console.log(error);
    }

    setIsEditing("");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": {
          m: 1,
          width: "35rem",
          height: "15rem",
        },
        position: "absolute",
        top: "12rem",
        left: "3.5rem",
      }}
    >
      <Paper elevation={3}>
        <Typography variant="h5" sx={{ pl: 2, pt: 3, fontWeight: 700 }}>
          EditTodo
        </Typography>

        <Input
          type="text"
          placeholder="EditTodo"
          id="Inputtodo"
          sx={{ width: "30rem", color: "#000", m: 4, mt: 6 }}
          value={editing}
          onChange={handelEditing}
        />

        <Box sx={{ display: "flex", mt: 2 }}>
          <Box sx={{ flex: "5" }} />

          <Box sx={{ flex: "1", textAlign: "center" }}>
            <IconButton
              aria-label="edit"
              sx={{ color: "#070F2B" }}
              onClick={edditedTodo}
            >
              <EditIcon />
            </IconButton>
          </Box>

          <Box sx={{ flex: "1", textAlign: "center" }}>
            <IconButton
              aria-label="delete"
              sx={{ color: "#070F2B" }}
              onClick={delEdit}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default EditTodo;
