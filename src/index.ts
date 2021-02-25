import "reflect-metadata";
import express from "express";
import cors from "cors";
import { createRoutes } from "./routes/routes";
import { createConnection, Connection } from "typeorm";
import config from './databaseConfig';

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: "GET, PUT, POST, PATCH, DELETE"
  }));
}

const port = 5000;

app.use(express.json());

app.use("/api", createRoutes());

app.get("/", (_req, res) => res.send("Server is running."));

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});

createConnection(config).then(async () => {
  console.log("Server is connected to PostgreSQL database.");
}).catch(e => console.log(e));