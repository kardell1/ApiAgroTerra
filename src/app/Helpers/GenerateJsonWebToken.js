// datos que recibe son la id del user
// y el username para validar que los datos son validos
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const generateJsonWebToken = (id, username) => {
  return jwt.sign({ user_id: id, username: username }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
export default generateJsonWebToken;
