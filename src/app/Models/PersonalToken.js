// models/PersonalToken.js
import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";
import User from "./User.js";

const PersonalToken = sequelize.define("PersonalToken", {
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
  token: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  expires_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  revoked: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

export default PersonalToken;
