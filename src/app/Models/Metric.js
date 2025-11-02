import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";
import Sensor from "./Sensor.js";

const Metric = sequelize.define("Metric", {
  sensor_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Sensor,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
    validate: {
      notNull: { msg: "El campo sensor_id es obligatorio." },
      isInt: { msg: "El campo sensor_id debe ser un número entero." },
    },
  },
  //inicio de la medicion , o ciclo de tiempo
  timestamp_start: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      isDate: { msg: "timestamp_start debe ser una fecha válida." },
    },
  },
  // finalizacion del ciclo de tiempo medido
  timestamp_end: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      isDate: { msg: "timestamp_end debe ser una fecha válida." },
      isAfterStart(value) {
        if (value <= this.timestamp_start) {
          throw new Error("timestamp_end debe ser mayor que timestamp_start.");
        }
      },
    },
  },
  // promedio en el ciclo de tiempo
  avg_value: {
    type: DataTypes.FLOAT,
    allowNull: true,
    validate: {
      isFloat: { msg: "avg_value debe ser un número válido." },
    },
  },
  //valor minimo registrad en ese ciclo
  min_value: {
    type: DataTypes.FLOAT,
    allowNull: true,
    validate: {
      isFloat: { msg: "min_value debe ser un número válido." },
    },
  },
  //valor maximo registrado en ese ciclo
  max_value: {
    type: DataTypes.FLOAT,
    allowNull: true,
    validate: {
      isFloat: { msg: "max_value debe ser un número válido." },
    },
  },
  //cantidad de datos obtenidos en ese ciclo
  samples: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      isInt: { msg: "samples debe ser un número entero." },
      min: {
        args: [0],
        msg: "samples no puede ser negativo.",
      },
    },
  },
  // estado del sensor
  status: {
    type: DataTypes.ENUM("normal", "alert", "offline", "equal"),
    allowNull: false,
    defaultValue: "normal",
    validate: {
      isIn: {
        args: [["normal", "alert", "offline", "equal"]],
        msg: "Estado no válido para metric.",
      },
    },
  },
});
console.log(Metric === sequelize.models.Metric); // true

export default Metric;
