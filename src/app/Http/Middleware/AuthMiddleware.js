import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import responseError from "../../Helpers/ResponseError.js";
dotenv.config();
export default async function authMiddleware(req, res, next) {
  // console.log("Headers recibidos:", req.headers);
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return responseError(res, "No tiene acceso a la pagina", 401, []);
  }
  // Separar la palabra "Bearer" y el token
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; //recuperamos los datos del token para rutas internas
    next();
  } catch (err) {
    console.error("Error de token:", err.message);
    return responseError(res, "Vuelva a iniciar sesion", 401, []);
  }
}
