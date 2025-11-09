import express from "express";
import startServer from "./server/startServer.js";
import router from "./router/router.js";
import dotenv from "dotenv";
import cors from "cors";
import initMqttService from "./app/Services/MqttService.js";
import { DeviceStore } from "./store/deviceStore.js";
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
    // inicializar la recuperacion de los sensores
    DeviceStore.getDevices();
    //iniicalizar la conexion al mqtt
    initMqttService();
  })
  .catch((err) => {
    console.error("Error iniciando el servidor:", err);
  });
