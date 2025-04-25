import express, { Express, Response } from "express";
import cors from "cors"
import dotenv from "dotenv"
import { errorHandler } from "./middleware/errorHandler";
import todoRoutes from "./routes/todoRoutes"

dotenv.config()

const app: Express = express()

app.use(cors())
app.use(express.json())

app.get("/ping", (_, res: Response) => {
    res.json({ msg: "Success to ping" })
})
app.use("/api", todoRoutes)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`)
})




