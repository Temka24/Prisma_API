import request from "supertest";
import app from "../src/index"; // express instance export хийсэн байх ёстой
import { PrismaClient } from "../src/generated/prisma";

const prisma = new PrismaClient();

jest.mock("../src/generated/prisma", () => {
    const mPrisma = {
        todoList: {
            findMany: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn()
        }
    };
    return { PrismaClient: jest.fn(() => mPrisma), ...mPrisma };
});

describe("Todo Controller", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("GET /todos", () => {
        it("should return all todos", async () => {
            (prisma.todoList.findMany as jest.Mock).mockResolvedValue([
                { id: 1, title: "Test todo", completed: false }
            ]);

            const res = await request(app).get("/api/todos");
            expect(res.status).toBe(200);
            expect(res.body.status).toBe(true);
            expect(res.body.data.length).toBe(1);
        });
    });

    describe("POST /todos", () => {
        it("should create a new todo", async () => {
            const mockTodo = { id: 1, title: "New todo", completed: false };
            (prisma.todoList.create as jest.Mock).mockResolvedValue(mockTodo);

            const res = await request(app).post("/api/todos").send({ title: "New todo" });

            expect(res.status).toBe(200);
            expect(res.body.status).toBe(true);
            expect(res.body.newTodo).toEqual(mockTodo);
        });

        it("should return error when title is missing", async () => {
            const res = await request(app).post("/api/todos").send({});
            expect(res.body.status).toBe(false);
            expect(res.body.msg).toBe("title not find");
        });
    });

    describe("PUT /todos", () => {
        it("should update todo", async () => {
            const mockUpdated = { id: 1, title: "Updated title", completed: true };
            (prisma.todoList.update as jest.Mock).mockResolvedValue(mockUpdated);

            const res = await request(app)
                .put("/api/todos")
                .send({ id: 1, title: "Updated title", completed: true });

            expect(res.status).toBe(200);
            expect(res.body.status).toBe(true);
            expect(res.body.todo).toEqual(mockUpdated);
        });

        it("should return error if inputs missing", async () => {
            const res = await request(app).put("/api/todos").send({});
            expect(res.body.status).toBe(false);
            expect(res.body.msg).toBe("Input is required");
        });
    });

    describe("DELETE /todos", () => {
        it("should delete todo", async () => {
            const mockDeleted = { id: 1, title: "Delete me", completed: false };
            (prisma.todoList.delete as jest.Mock).mockResolvedValue(mockDeleted);

            const res = await request(app).delete("/api/todos").send({ id: 1 });

            expect(res.status).toBe(200);
            expect(res.body.todo).toEqual(mockDeleted);
        });

        it("should return error if id missing", async () => {
            const res = await request(app).delete("/api/todos").send({});
            expect(res.body.status).toBe(false);
            expect(res.body.msg).toBe("id is required");
        });
    });
});
