import express from "express";
import * as dotenv from "dotenv";
import { usersRouter, studentsRouter } from "./routes/index.js";
import connect from "./database/database.js";

dotenv.config();

const app = express();
const port = process.env.PORT ?? 3000;
app.use(express.json());

app.use("/users", usersRouter);
app.use("/students", studentsRouter);

app.get("/", (req, res) => {
  res.send("response from root router, hehe");
});
app.listen(port, async () => {
  await connect();
  console.log(`listen on port ${port}`);
});
