import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";
import User from "./User.js";
const Device = sequelize.define(
  "Device",
  {
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "El nombre del dispositivo no puede estar vacío.",
        },
        len: {
          args: [3, 50],
          msg: "El nombre debe tener entre 3 y 50 caracteres.",
        },
      },
    },

    uuid: {
      type: DataTypes.STRING(36),
      unique: {
        msg: "El UUID debe ser único.",
      },
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "El UUID no puede estar vacío.",
        },
        isUUID: {
          args: 4,
          msg: "El UUID debe tener un formato válido (UUID v4).",
        },
      },
    },

    section: {
      type: DataTypes.STRING(200),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "La sección no puede estar vacía.",
        },
        len: {
          args: [3, 200],
          msg: "La sección debe tener entre 3 y 30 caracteres.",
        },
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
      validate: {
        notNull: {
          msg: "El campo user_id es obligatorio.",
        },
        isInt: {
          msg: "El campo user_id debe ser un número entero.",
        },
      },
    },
  },
  {
    // Other model options go here
    timestamps: false,
  },
);
console.log(Device === sequelize.models.Device); // true
// relacion del del modelo
// User.hasMany(Device);

export default Device;
