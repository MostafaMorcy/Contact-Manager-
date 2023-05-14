process.on("uncaughtException", (err) => {
  console.log("error", err);
});
import { Server } from "socket.io";
import  cors from "cors";
import express from "express";
import * as dotenv from "dotenv";
import morgan from "morgan";
dotenv.config();
import { dbConnection } from "./database/dbConfig/dbconnection.js";
import { init } from "./src/modules/index.routes.js";
const app = express();
app.use(cors());
app.use(express.json());
const port = 3000 || 3001;
dbConnection();
init(app);
app.use(morgan("dev"));

let server= app.listen(port, () => console.log(`Example app listening on port ${port}!`));
const io=new  Server(server)
io.on("connection", (socket) => {
  console.log("A user connected.");
  socket.on("edit", (contact) => {
      io.emit("edited", contact)
  })
})
// Handle rejection outside express
process.on("unhandledRejection", (err) => {
  console.error(`UnhandledRejection Errors: ${err.name} | ${err.message}`);
  server.close(() => {
    console.error(`Shutting down....`);
    process.exit(1);
  });
});