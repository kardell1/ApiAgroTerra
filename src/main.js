import express from "express";
import startServer from "./server/startServer.js";
import router from "./router/router.js";
import dotenv from "dotenv";
import { initMQTT } from "./config/mqtt.js";
import cors from "cors";
dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

startServer()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        `Servidor corriendo en http://localhost:${process.env.PORT} `,
      );
    });
    initMQTT();
  })
  .catch((err) => {
    console.error("Error iniciando el servidor:", err);
  });
