import responseError from "../../Helpers/ResponseError.js";
import responseGeneric from "../../Helpers/ResponseGeneric.js";
import authService from "../../Services/AuthService.js";

export const authenticateUser = async (req, res) => {
  const { username, password } = req.body;
  const response = await authService(username, password);
  // console.log(response);
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
