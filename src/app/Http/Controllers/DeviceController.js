import responseGeneric from "../../Helpers/ResponseGeneric.js";
import {
  deviceDataService,
  deviceService,
  infoForGrafic,
} from "../../Services/DeviceService.js";

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

export const dataDevice = async (req, res) => {
  // recuperar el device-uuid
  const deviceUUID = req.headers["x-device-uuid"];
  //recuperar los meses
  const monthsBackRaw = req.headers["x-months-back"] || 1;

  if (!deviceUUID) {
    return {
      success: false,
      msg: "No se puede conectar a este uuid.",
      detail: [],
    };
  }
  const response = await deviceDataService(monthsBackRaw, deviceUUID);

  // console.log(response);
  return responseGeneric(res, "mensaje", 201, true, response.detail);
};

export const dataGrafic = async (req, res) => {
  const deviceUUID = req.headers["x-device-uuid"];
  const monthsBackRaw = req.headers["x-months-back"] || 1;
  if (!deviceUUID) {
    return {
      success: false,
      msg: "No se puede conectar a este uuid.",
      detail: [],
    };
  }
  const response = await infoForGrafic(monthsBackRaw, deviceUUID);

  return responseGeneric(res, "mensaje", 201, true, response.detail);
};

export const graficInformation = async (req, res) => {};
