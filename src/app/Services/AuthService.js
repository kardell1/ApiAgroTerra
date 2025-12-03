import User from "../Models/User.js";
import bcrypt from "bcrypt";
import generateJsonWebToken from "../Helpers/GenerateJsonWebToken.js";
const authService = async (username, password) => {
  const exist_user = await User.findOne({ where: { username: username } });
  if (!exist_user) {
    return {
      success: false,
      msg: "Usuario es incorrecto.",
      detail: [],
    };
  }
  // hash password
  // const isMatch = await bcrypt.compare(password, exist_user.password);
  const isMatch = password === exist_user.password;
  if (!isMatch) {
    return {
      success: false,
      msg: "La contrasena es incorrecta",
      detail: [],
    };
  }
  // generate tkn
  const token = generateJsonWebToken(exist_user.id, exist_user.username);
  // response
  return {
    success: true,
    msg: token,
    detail: [],
  };
};
export default authService;
