import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import movieRoutes from "./routes/public/movie.routes.js"
import { errorMiddleware } from "./middleware/error.middleware.js"

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/health", (req, res) => {
    res.json({
        status: "ok",
        uptime: process.uptime(),
    })
})

app.use("/api/movies", movieRoutes);

app.use(errorMiddleware);

export default app;