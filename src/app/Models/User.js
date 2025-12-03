import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";

const User = sequelize.define(
  "User",
  {
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        is: /^[a-zA-Z0-9]([a-zA-Z0-9._-]*[a-zA-Z0-9])?$/,
        notEmpty: true,
        len: [5, 15],
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6, 255], // solo valida longitud, no el contenido
      },
    },
    cellphone: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        is: /^\+[1-9]\d{7,14}$/, // + seguido de 8–15 dígitos (sin ceros iniciales)
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isEmail: true,
      },
    },
  },
  {
    // Other model options go here
    timestamps: false,
  },
);
console.log(User === sequelize.models.User); // true

export default User;
