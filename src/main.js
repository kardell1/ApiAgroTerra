// express es un framework de node, es decir que esta sobre node
// express es un framework minimalista, que significa?
// que nosotro spodemos tener el control sobre la arquitectura que vamos a armar sobre este proyecto
// tenemos mas control sobre cada proceso del sistema
import express from "express";
import startServer from "./server/startServer.js";
import router from "./router/router.js";
// es una libreria para node , que lo que hace es reconocer tu archivo .env
// que es el .env?
// el .env es un archivo oculto que guarda las credenciales del sistema
// estas son variables de conexion que se definen en tu aplicacion , que no deben ser conocidas por otras personas
import dotenv from "dotenv";
// el cors es una libreria de enrutamiento -> en el cors tu puedes asignarle una direccion ip estatica , para que solamente ese dispositivo pueda hacer uso de tu api
import cors from "cors";
import initMqttService from "./app/Services/MqttService.js";
import { DeviceStore } from "./store/deviceStore.js";
dotenv.config();

// es decirle :  dame una instancia de express, la cual se va llamar app
const app = express();
// la aplicacion que es app, va hacer uso de estas herramientas , que son : cors
app.use(cors());
// te ayuda a que el framework pueda entender el formato json
app.use(express.json());
// esto es para entender el http
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
