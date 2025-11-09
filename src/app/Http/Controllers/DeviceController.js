import responseGeneric from "../../Helpers/ResponseGeneric.js";
import { deviceService } from "../../Services/DeviceService.js";

export const storeDevice = async (req, res) => {
  const { device_name, device_uuid, device_section, device_sensors } = req.body;
  // recuperamos el id del usuario del cuerpo de la solicitud, viene del middlware
  const userId = req.user.user_id;
  const response = await deviceService(
    device_name,
    device_uuid,
    device_section,
    device_sensors,
    userId,
  );
  // console.log(req.body);
  // console.log(req.user);

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
