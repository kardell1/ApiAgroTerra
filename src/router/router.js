import express from "express";
const router = express.Router();
import authRequest from "../app/Http/Requests/AuthRequest.js";
import { storeUser } from "../app/Http/Controllers/UserController.js";
import userCreateRequest from "../app/Http/Requests/UserCreateRequest.js";
import { authenticateUser } from "../app/Http/Controllers/AuthController.js";
import authMiddleware from "../app/Http/Middleware/AuthMiddleware.js";
// Ruta de ejemplo
router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.post("/authenticate", authRequest, authenticateUser);

router.post("/user/create", userCreateRequest, storeUser);

router.use(authMiddleware);

router.get("/prueba", (req, res) => {
  res.send("tiene el token!");
});

//router.use(miiddlware de proteccion para token)

//definir las rutas protegitas por el token crf que generamos
// rutas faltantes  :
// devolver perfil de usuario
// mostrar los devices con su informacion agregada

export default router;
//Nota -> para que funcione el postman debes agregar en
// headers -> content-type application/json
