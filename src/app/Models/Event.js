import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";
import Sensor from "./Sensor.js";

// log de eventos
// relacionado a un Sensor
// seleccion del tipo de evento ocurrido (solo para las alertas)
// dato recopilado
// mensaje generado por el sistema
// severidad de la alerta emitida
// timestamps fecha creada la alerta
const Event = sequelize.define(
  "Event",
  {
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
    //evento ocurrido
    event_type: {
      type: DataTypes.ENUM("alert", "warning", "recovery", "offline", "custom"),
      allowNull: false,
      validate: {
        notEmpty: { msg: "El tipo de evento no puede estar vacío." },
        isIn: {
          args: [["alert", "warning", "recovery", "offline", "custom"]],
          msg: "Tipo de evento no válido.",
        },
      },
    },
    // dato medido durante ese evento
    data: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    // mesansaje de alerta generado por el sistema
    message: {
      type: DataTypes.STRING(200),
      allowNull: false,
      validate: {
        notEmpty: { msg: "El mensaje no puede estar vacío." },
        len: {
          args: [3, 200],
          msg: "El mensaje debe tener entre 3 y 200 caracteres.",
        },
      },
    },
    // gravedad del evento -> bajo criterio
    severity: {
      type: DataTypes.ENUM("low", "medium", "high", "critical"),
      allowNull: false,
      defaultValue: "low",
      validate: {
        isIn: {
          args: [["low", "medium", "high", "critical"]],
          msg: "Nivel de severidad no válido.",
        },
      },
    },
    //momento exacto en el que ocurrio el evento
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      validate: {
        isDate: { msg: "El campo timestamp debe ser una fecha válida." },
      },
    },
  },
  {
    timestamps: false,
  },
);
console.log(Event === sequelize.models.Event); // true

export default Event;
