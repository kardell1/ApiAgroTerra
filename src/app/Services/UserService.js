import User from "../Models/User.js";
import sequelize from "../../config/database.js";
import bcrypt from "bcrypt";
const userStoreService = async (
  username,
  password,
  fullname,
  cellphone,
  email,
) => {
  //verificar que existe
  const user = await User.findOne({ where: { username: username } });
  if (user) {
    return {
      success: false,
      msg: "El nombre de usuario no esta disponible.",
      detail: [],
    };
  }
  const exist_cellphone = await User.findOne({
    where: { cellphone: cellphone },
  });
  if (exist_cellphone) {
    return {
      success: false,
      msg: "El numero celular ya se encuentra registrado.",
      detail: [],
    };
  }
  const exist_email = await User.findOne({ where: { email: email } });
  if (exist_email) {
    return {
      success: false,
      msg: "El correo ya se encuentra registrado.",
      detail: [],
    };
  }
  try {
    const transaction = await sequelize.transaction();
    //hashear el password para agregarlo a la db
    const hashedPassword = await bcrypt.hash(password, 10);
    //crear el recurso
    await User.create(
      {
        fullname: fullname,
        username: username,
        password: hashedPassword,
        cellphone: cellphone,
        email: email,
      },
      { transaction },
    );
    await transaction.commit();
    // devolver la respuesta o un error
    // la respuesta debe ser de tipo obj
    return {
      success: true,
      msg: "creado con exito",
      detail: [],
    };
  } catch (error) {
    // console.log(error);
    await transaction.rollback();
    return {
      success: false,
      msg: "No pudo crearse el recurso",
      detail: error,
    };
  }
};
export default userStoreService;
