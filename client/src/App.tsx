import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Typography, Button, Input } from "@mui/material";
import Todo from "./components/Todo";
import "./App.css";

import { createContext } from "react";

export const BlurContext = createContext();
export const DeleteContext = createContext();

export default function App() {
  const [todoText, setTodoText] = useState("");
  const [addTodo, setAddTodo] = useState("");
  const [blurActive, setBlurActive] = useState(false);
  const [bool, setBool] = useState(false);

  useEffect(() => {
    (async () => {
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
        setBool(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [bool]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoText(event.target.value);
  };

  const handleAddTodo = async () => {
    console.log("Todo Text:", todoText);

    if (todoText == "") {
      alert("please, First Add todo");
    } else {
      const response = await fetch("http://localhost:3421/api/v1/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ description: todoText }),
      });

      if (!response.ok) {
        throw new Error("Failed to add todo item");
      }
    }

    setBool(true);

    setTodoText("");
  };

  return (
    <BlurContext.Provider value={{ blurActive, setBlurActive }}>
      <DeleteContext.Provider value={{ addTodo, setAddTodo }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            mt: 10,
            overflowY: "hidden",

            "& > :not(style)": {
              m: 1,
              width: "38vw",
              height: "80vh",
            },
          }}
        >
          <Paper
            elevation={3}
            className={` ${blurActive ? "blur" : ""}`}
            sx={{
              backgroundColor: "#265073",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              fontFamily: "cursive",
              textShadow: "2px 4px 6px rgba(0,0,0,0.3)",

              position: "relative",
            }}
          >
            <Typography
              variant="h4"
              component="h2"
              sx={{
                fontFamily: "fantasy",
                color: "#070F2B",
                padding: 5,
                letterSpacing: 2,
              }}
            >
              Things ToDo
            </Typography>

            <div>
              <Input
                type="text"
                placeholder="Add new todo"
                id="myInput"
                value={todoText}
                required
                onChange={handleChange}
                sx={{ width: "30rem", color: "#fff" }}
              />

              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#070F2B",
                  "&:hover": {
                    backgroundColor: "#001254",
                  },
                }}
                onClick={handleAddTodo}
              >
                Add
              </Button>
            </div>

            <Box
              sx={{
                display: "flex",
                width: "40rem",
                m: 5,
                fontWeight: 700,
                fontSize: 20,
              }}
            >
              <Box sx={{ flex: "5", pl: 4 }}>Description</Box>
              <Box sx={{ flex: "1", textAlign: "center" }}>Edit</Box>
              <Box sx={{ flex: "1", textAlign: "center" }}>Delete</Box>
            </Box>

            <Box
              sx={{ height: "30rem", width: "90%", overflowY: "scroll", pl: 3 }}
            >
              {addTodo}
            </Box>
          </Paper>
        </Box>
      </DeleteContext.Provider>
    </BlurContext.Provider>
  );
}
