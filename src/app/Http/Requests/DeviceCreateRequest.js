import { body, validationResult } from "express-validator";
import responseError from "../../Helpers/ResponseError.js";

/**
 * Ejemplo de payload esperado:
 * {
 *   "device_name": "Modulo Central",
 *   "device_uuid": "a4b8d5c0-7e2f-4a21-b16d-78d9a8b4f1e9",
 *   "device_section": "invernadero_1",
 *   "device_sensors": [
 *     {
 *       "sensor_name": "Temperatura",
 *       "sensor_code": "TMP",
 *       "sensor_min": 0,
 *       "sensor_max": 100,
 *       "sensor_type": "temperature",
 *       "sensor_description": "Mide la temperatura ambiente"
 *     }
 *   ]
 * }
 */

const deviceStoreRequest = [
  // Datos del dispositivo principal
  body("device_name")
    .notEmpty()
    .withMessage("El nombre del dispositivo es obligatorio.")
    .isLength({ min: 3, max: 50 })
    .withMessage("El nombre debe tener entre 3 y 50 caracteres.")
    .matches(/^[a-zA-Z0-9\s._-]+$/)
    .withMessage(
      "El nombre solo puede contener letras, números, espacios, puntos, guiones y guiones bajos.",
    ),

  body("device_uuid")
    .notEmpty()
    .withMessage("El UUID es obligatorio.")
    .isUUID(4)
    .withMessage("El UUID debe tener un formato válido (UUID v4)."),

  body("device_section")
    .notEmpty()
    .withMessage("La sección es obligatoria.")
    .isLength({ min: 3, max: 30 })
    .withMessage("La sección debe tener entre 3 y 30 caracteres.")
    .matches(/^[a-zA-Z0-9\s._-]+$/)
    .withMessage(
      "La sección solo puede contener letras, números, puntos, guiones y guiones bajos.",
    ),

  // Validar que `device_sensors` sea un array
  body("device_sensors")
    .isArray({ min: 1 })
    .withMessage(
      "Debe incluir al menos un sensor en el arreglo device_sensors.",
    ),

  // Validar cada objeto dentro del array de sensores
  body("device_sensors.*.sensor_name")
    .notEmpty()
    .withMessage("El nombre del sensor no puede estar vacío.")
    .isLength({ min: 3, max: 50 })
    .withMessage("El nombre debe tener entre 3 y 50 caracteres.")
    .matches(/^[a-zA-Z0-9\s._-]+$/)
    .withMessage(
      "El nombre solo puede contener letras, números, espacios, puntos, guiones y guiones bajos.",
    ),

  body("device_sensors.*.sensor_code")
    .notEmpty()
    .withMessage("El código del sensor no puede estar vacío.")
    .isString()
    .withMessage("El código del sensor debe ser texto."),

  body("device_sensors.*.sensor_min")
    .notEmpty()
    .withMessage("El valor mínimo es obligatorio.")
    .isFloat()
    .withMessage("El valor mínimo debe ser un número válido."),

  body("device_sensors.*.sensor_max")
    .notEmpty()
    .withMessage("El valor máximo es obligatorio.")
    .isFloat()
    .withMessage("El valor máximo debe ser un número válido.")
    .custom((value, { req, path }) => {
      // Extrae el índice del sensor desde el path del campo
      const index = path.match(/\d+/)?.[0];
      const min = parseFloat(req.body.device_sensors[index]?.sensor_min);
      if (parseFloat(value) <= min) {
        throw new Error(
          `En el sensor #${parseInt(index) + 1}, el valor máximo debe ser mayor que el mínimo.`,
        );
      }
      return true;
    }),

  body("device_sensors.*.sensor_type")
    .notEmpty()
    .withMessage("El tipo de sensor no puede estar vacío.")
    .isIn(["temperature", "humidity", "pressure", "light", "motion", "custom"])
    .withMessage("Tipo de sensor no válido."),

  body("device_sensors.*.sensor_description")
    .optional()
    .isLength({ max: 200 })
    .withMessage("La descripción no puede superar los 200 caracteres."),

  // Middleware final de control de errores
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const messages = errors.array().map((err) => err.msg);
      return responseError(res, "Validación fallida.", 422, messages);
    }
    next();
  },
];

export default deviceStoreRequest;
