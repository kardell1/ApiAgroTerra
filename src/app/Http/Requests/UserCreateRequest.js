import { body, validationResult } from "express-validator";
import responseError from "../../Helpers/ResponseError.js";
const userCreateRequest = [
  body("fullname")
    .notEmpty()
    .withMessage("El nombre completo es obligatorio")
    .isLength({ min: 3, max: 60 })
    .withMessage("El nombre completo debe tener entre 3 y 60 caracteres"),

  body("username")
    .notEmpty()
    .withMessage("El usuario es obligatorio")
    .isLength({ min: 5, max: 15 })
    .withMessage("El nombre de usuario debe tener entre 5 y 15 caracteres")
    .matches(/^[a-zA-Z0-9._-]+$/)
    .withMessage("El nombre de usuario contiene caracteres inválidos"),

  body("password")
    .notEmpty()
    .withMessage("La contraseña es obligatoria")
    .isLength({ min: 6 })
    .withMessage("La contraseña es demasiado corta"),

  body("cellphone")
    .optional()
    .isMobilePhone("es-BO")
    .withMessage("Número de teléfono inválido"),

  body("email").optional().isEmail().withMessage("Correo electrónico inválido"),
  body("cellphone")
    .optional()
    .isMobilePhone("es-BO")
    .withMessage("Número de teléfono inválido"),

  (req, res, next) => {
    const errors = validationResult(req);
    console.log(req.body);
    if (!errors.isEmpty()) {
      const messages = errors.array().map((err) => err.msg);
      return responseError(res, "Validación fallida.", 422, messages);
    }
    next();
  },
];
export default userCreateRequest;
