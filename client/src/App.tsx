
import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Typography, Button, Input } from "@mui/material";
import Todo from "./components/Todo";


export default function App() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        mt: 10,

        "& > :not(style)": {
          m: 1,
          width: "35vw",
          height: "80vh",
        },
      }}
    >
      <Paper
        elevation={3}
        sx={{
          backgroundColor: "#265073",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          fontFamily: "cursive",
          textShadow: "2px 4px 6px rgba(0,0,0,0.3)",
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
            sx={{ width: "30rem", color: "#fff" }}
          />

          <Button
            variant="contained"
            href="#contained-buttons"
            sx={{
              backgroundColor: "#070F2B",
              "&:hover": {
                backgroundColor: "#001254",
              },
            }}
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

        {/* <Todo/> */}
       
      </Paper>
    </Box>
  );
}
