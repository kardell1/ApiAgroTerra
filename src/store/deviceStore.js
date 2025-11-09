import Device from "../app/Models/Device.js";
import Sensor from "../app/Models/Sensor.js";

let devicesCache = {}; // uuid -> true

export const DeviceStore = {
  // Cargar todos los devices desde la base de datos solo con uuid
  async getDevices() {
    const devices = await Device.findAll({
      attributes: ["uuid"],
      include: [
        {
          model: Sensor,
          as: "sensors",
          attributes: ["id", "code", "maxvalue", "minvalue"],
        },
      ],
    });

    devicesCache = {};
    devices.forEach((d) => {
      devicesCache[d.uuid] = d.sensors.map((data_sensor) => ({
        id: data_sensor.id,
        code: data_sensor.code,
        min: data_sensor.minvalue,
        max: data_sensor.maxvalue,
      }));
    });
    // console.log(devices);
    // console.log("Devices cargados en cache:", devicesCache);
    return devicesCache;
  },

  // Agregar o actualizar un device en el cache con sus sensores
  async setDevice(uuid, sensors = []) {
    // console.log("datos recibidos, sensores");
    // console.log(sensors);
    if (!uuid) throw new Error("Se debe enviar un uuid válido");

    // Si no envían sensores, lo dejamos vacío
    devicesCache[uuid] = sensors.map((s) => ({
      id: s.id,
      code: s.code,
      min: s.min ?? s.minvalue ?? 0,
      max: s.max ?? s.maxvalue ?? 0,
    }));

    // console.log(
    // `Device agregado/actualizado en cache: ${uuid}`,
    // devicesCache[uuid],
    // );
    return devicesCache[uuid];
  },

  // Devolver los sensores de un device dado su uuid
  async getDevice(uuid) {
    // console.log("en el device store recibimos : " + uuid);
    // console.log("datos almacenados de cache son : ");
    // console.log(devicesCache);
    const deviceSensors = devicesCache[uuid];
    if (!deviceSensors) {
      console.log(`Device ${uuid} no encontrado en cache`);
      return null;
    }
    // console.log(`Device ${uuid} encontrado:`, deviceSensors);
    return deviceSensors;
  },
};
