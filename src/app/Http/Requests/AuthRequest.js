import responseError from "../../Helpers/ResponseError.js";
export default async function authRequest(req, res, next) {
  const { username, password } = req.body;
  const test = /^[a-zA-Z0-9]([a-zA-Z0-9._-]*[a-zA-Z0-9])?$/;
  if (!username || !password) {
    return responseError(res, "El campo no puede estar vacio", 400, []);
  }
  if (username && username.length < 5) {
    return responseError(res, "Longitud incorrecta", 400, []);
  }
  if (username && username.length > 15) {
    return responseError(res, "Demasiado largo", 400, []);
  }

  if (!test.test(username)) {
    return responseError(
      res,
      "Nombre de usuario contiene caracteres invalidos ",
      400,
      [],
    );
  }

  if (password && password.length < 6) {
    return responseError(res, "Contraseña es incorrecta", 400, []);
  }
  next();
}
