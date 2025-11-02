import responseError from "../../Helpers/ResponseError.js";
import userStoreService from "../../Services/UserService.js";
import responseGeneric from "../../Helpers/ResponseGeneric.js";
export const getAllUsers = (req, res) => {
  res.send("Hello World!");
};

export const storeUser = async (req, res) => {
  // llamar al service para la creacion
  // devolver la respuesta
  const { username, password, fullname, cellphone, email } = req.body;
  // console.log("en storeUser -> " + req.body);
  const response = await userStoreService(
    username,
    password,
    fullname,
    cellphone,
    email,
  );
  // console.log(response);
  // aca enviar el formato de la respuesta
  if (!response.success) {
    return responseError(res, response.msg, 400, response.detail);
  }
  return responseGeneric(
    res,
    response.msg,
    201,
    response.success,
    response.detail,
  );
};
