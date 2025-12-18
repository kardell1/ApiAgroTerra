import User from "../Models/User.js";
import bcrypt from "bcrypt";
import generateJsonWebToken from "../Helpers/GenerateJsonWebToken.js";
import Device from "../Models/Device.js";
import Sensor from "../Models/Sensor.js";
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
  // recuperar el devices de el usuario y devolverlo en la respuesta
  // el device debe contener los datos de los sensores , como el code , el type
  const found_device = await Device.findAll({
    where: { user_id: exist_user.id },
    attributes: ["uuid", "name"],
    include: {
      model: Sensor,
      as: "sensors",
      attributes: ["name", "minvalue", "maxvalue", "code"],
    },
  });

  return {
    success: true,
    msg: token,
    detail: found_device,
  };
};
export default authService;
