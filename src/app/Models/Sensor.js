import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";
import Device from "./Device.js";
// declaramos que un device tiene n sensores
// n sensores pertenecen a solo un device
// definimos la clave de cada sensor para que sea registrado (clave unica para cada tipo de sensor)
//
const Sensor = sequelize.define("Sensor", {
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "El nombre del sensor no puede estar vacío.",
      },
      len: {
        args: [3, 50],
        msg: "El nombre debe tener entre 3 y 50 caracteres.",
      },
      is: {
        args: /^[a-zA-Z0-9\s._-]+$/i,
        msg: "El nombre solo puede contener letras, números, espacios, puntos, guiones y guiones bajos.",
      },
    },
  },

  minvalue: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      isFloat: {
        msg: "El valor mínimo debe ser un número válido.",
      },
    },
  },

  maxvalue: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      isFloat: {
        msg: "El valor máximo debe ser un número válido.",
      },
      isGreaterThanMin(value) {
        if (value <= this.minvalue) {
          throw new Error(
            "El valor máximo debe ser mayor que el valor mínimo.",
          );
        }
      },
    },
  },

  type: {
    type: DataTypes.ENUM(
      "temperature",
      "humidity",
      "pressure",
      "light",
      "motion",
      "custom",
    ),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "El tipo de sensor no puede estar vacío.",
      },
      isIn: {
        args: [
          ["temperature", "humidity", "pressure", "light", "motion", "custom"],
        ],
        msg: "Tipo de sensor no válido.",
      },
    },
  },

  code: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "El codigo de sensor no puede estar vacío.",
      },
    },
  },

  description: {
    type: DataTypes.STRING(200),
    allowNull: true,
    validate: {
      len: {
        args: [0, 200],
        msg: "La descripción no puede superar los 200 caracteres.",
      },
    },
  },

  device_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Device,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
    validate: {
      notNull: {
        msg: "El campo device_id es obligatorio.",
      },
      isInt: {
        msg: "El campo device_id debe ser un número entero.",
      },
    },
  },
});
console.log(Sensor === sequelize.models.Sensor); // true
export default Sensor;
