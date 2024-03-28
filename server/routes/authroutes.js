 const express = require("express");
 const router = express.Router();
 const pool = require("../db");

   //create todo
 router.post('/todos',async(req, res)=>{
    try {
       const {description}=req.body; 
       console.log(description)
       const newTodo = await pool.query("INSERT INTO todo(description) VALUES($1) RETURNING *",[description]);
       res.json(newTodo.rows)
    } catch (error) {
        console.error(error)
    }
 })

 //get all todos

 router.get('/todos',async(req, res)=>{
   try {
      const allTodos = await pool.query("SELECT *FROM todo"); 
      res.json(allTodos.rows)
   } catch (error) {
      console.error(error)
   }
 })

 //get a todo

 router.get('/todos/:id', async(req, res)=>{
   try {
      const {id} = req.params;
      const todo = await pool.query("SELECT *FROM todo WHERE todo_id = $1",[id]);
      res.json(todo.rows)
   } catch (error) {
      console.error(error)
   }
 })

 //update a todo

 router.put('/todos/:id',async (req, res)=>{
   try {
      const {id}= req.params;
      const {description}= await req.body;
      const updateTodo = await pool.query("UPDATE todo SET description=$1 WHERE todo_id = $2 RETURNING *",[description , id] );
      res.json(updateTodo.rows);
   } catch (error) {
      console.log(error)
   }
 })

 //delete a todo

 router.delete('/todos/:id', async (req, res)=>{
   try {
      const {id}= req.params;
      const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1",[id]);
      res.json("todo is deleted")
   } catch (error) {
      console.error(error)
   }
 })

module.exports = router;