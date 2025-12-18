import express from "express";
const router = express.Router();
import authRequest from "../app/Http/Requests/AuthRequest.js";
import { storeUser } from "../app/Http/Controllers/UserController.js";
import {
  storeDevice,
  dataDevice,
  dataGrafic,
} from "../app/Http/Controllers/DeviceController.js";
import userCreateRequest from "../app/Http/Requests/UserCreateRequest.js";
import { authenticateUser } from "../app/Http/Controllers/AuthController.js";
import authMiddleware from "../app/Http/Middleware/AuthMiddleware.js";
import deviceStoreRequest from "../app/Http/Requests/DeviceCreateRequest.js";
// Ruta de ejemplo
router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.post("/authenticate", authRequest, authenticateUser);

router.post("/user/create", userCreateRequest, storeUser);

// desde este punto todas las rutas internas requieren autenticacion
router.use(authMiddleware);

router.get("/prueba", (req, res) => {
  res.send("tiene el token!");
});

// rutas que faltan -> crear un device o modulo electronico (su uuid es el mismo que se le pone al modulo , con eso se enlaza los datos) , dentro del modulo de device tambien se asocia los sensores que tendra dentro , es decir aca ponemos la clave del sensor que tiene habilitado
// entonces la coleccion de datos debe ser , device uuid
// cuando sea un dato que deba guardarse entonces recien ponemos la busqueda de esos codigos de sensor , sino se los registra no se los guarda
router.post("/sensor/create", deviceStoreRequest, storeDevice);

// dentro del auth , enviar los datos de los devices -> con sus sensores , que seria el minimo, maximo , type , codigo-sensor , la uuid-device

// ruta para devolver los datos de las medidas del sensor segun una cama
router.get("/sensor/historic", dataDevice);

router.get("/sensor/grafics", dataGrafic);
export default router;
//Nota -> para que funcione el postman debes agregar en
// headers -> content-type application/json
