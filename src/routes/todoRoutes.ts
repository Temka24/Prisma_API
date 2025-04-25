import { Router } from "express";
import { getAllTodos, addTodo, updateTodo, deleteTodo } from "../controller/todoController";

const router = Router()

router.get("/todos", getAllTodos)
router.post("/todos", addTodo)
router.put("/todos", updateTodo)
router.delete("/todos", deleteTodo)

export default router;