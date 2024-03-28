import React from 'react'
import {IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";

function Todo() {
  return (
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
          }}
        >
          <Box sx={{ flex: "6", pl: 4, color: "#fff", fontSize: "16px" }}>
            1. hello
          </Box>

          <Box sx={{ flex: "1", textAlign: "center" }}>
            <IconButton aria-label="edit" sx={{ color: "#fff" }}>
              <EditIcon />
            </IconButton>
          </Box>

          <Box sx={{ flex: "1", textAlign: "center" }}>
            <IconButton aria-label="delete" sx={{ color: "#fff" }}>
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>

  )
}

export default Todo