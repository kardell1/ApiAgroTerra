import sequelize from "../../config/database.js";
import { DeviceStore } from "../../store/deviceStore.js";
import Device from "../Models/Device.js";
import Sensor from "../Models/Sensor.js";
const deviceService = async (
  device_name,
  device_uuid,
  device_section,
  device_sensors,
  userId,
) => {
  // aca creamos los datos del nuevo device
  // creamos los sensores

  // verificar si el uuid ya existe
  const exist_device = await Device.findOne({ where: { uuid: device_uuid } });
  if (exist_device) {
    return {
      success: false,
      msg: "El dispositivo ya se encunetra registrado.",
      detail: [],
    };
  }
  try {
    const transaction = await sequelize.transaction();

    const sensorsData = device_sensors.map((s) => ({
      name: s.sensor_name,
      code: s.sensor_code,
      minvalue: s.sensor_min,
      maxvalue: s.sensor_max,
      type: s.sensor_type,
      description: s.sensor_description || null,
    }));

    const new_device = await Device.create(
      {
        name: device_name,
        uuid: device_uuid,
        section: device_section,
        user_id: userId,
        sensors: sensorsData,
      },
      {
        include: [{ model: Sensor, as: "sensors" }],
        transaction,
      },
    );

    // console.log("los datosj de la creacion de devices es");
    // console.log(new_device);
    const createdSensors = new_device.sensors.map((s) => ({
      id: s.id,
      code: s.code,
      min: s.minvalue ?? 0,
      max: s.maxvalue ?? 0,
    }));
    // console.log("los datos que debemos enviar son");
    // console.log(createdSensors);

    await DeviceStore.setDevice(device_uuid, createdSensors);

    await transaction.commit();
    // console.log(newDevice);
    return {
      success: true,
      msg: "El dispositivo se registro exitosamente.",
      detail: [],
    };
  } catch (error) {
    console.log(error);
    await transaction.rollback();
    return {
      success: false,
      msg: "No pudo crearse el recurso",
      detail: error,
    };
  }
};
export { deviceService };
