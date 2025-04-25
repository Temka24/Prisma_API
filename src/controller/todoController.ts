import { Response, Request, NextFunction } from "express";
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

export const getAllTodos = async (_: Request, res: Response, next: NextFunction) => {
    try {
        const todos = await prisma.todoList.findMany()
        if (!todos) {
            res.json({ msg: "Rows not find", status: false })
            return;
        }

        res.json({ msg: "Success", status: true, data: todos })
        return;

    } catch (err) {
        next(err)
    }
}

export const addTodo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { title } = req.body;
        if (!title) {
            res.json({ msg: "title not find", status: false })
            return;
        }

        const newTodo = await prisma.todoList.create({
            data: { title }
        })

        if (!newTodo) {
            res.json({ msg: "newTodo doesn't created" })
        }

        res.json({ msg: "Success", status: true, newTodo })
        return;

    } catch (err) {
        next(err)
    }
}

export const updateTodo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { title, id, completed } = req.body;
        if (!title || !id || !completed) {
            res.json({ msg: "Input is required", status: false })
            return;
        }

        const todo = await prisma.todoList.update({
            where: { id: id },
            data: { title, completed }
        })

        if (!todo) {
            res.json({ msg: "No rows affected bro", status: false })
            return;
        }

        res.json({ msg: "Success", status: true, todo })
        return;

    } catch (err) {
        next(err)
    }
}

export const deleteTodo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.body;
        if (!id) {
            res.json({ msg: "id is required", status: false })
        }

        const todo = await prisma.todoList.delete({
            where: { id }
        })

        if (!todo) {
            res.json({ message: 'Todo олдсонгүй' });
            return;
        }
        res.json({ msg: 'Todo устгагдлаа', todo });
        return;

    } catch (err) {
        next(err)
    }
}