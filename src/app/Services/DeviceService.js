import { Op } from "sequelize";
import sequelize from "../../config/database.js";
import { DeviceStore } from "../../store/deviceStore.js";
import Device from "../Models/Device.js";
import Sensor from "../Models/Sensor.js";
import Event from "../Models/Event.js";

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
     const exist_device = await Device.findOne({
          where: { uuid: device_uuid },
     });
     if (exist_device) {
          return {
               success: false,
               msg: "El dispositivo ya se encuentra registrado.",
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

const deviceDataService = async (months, uuid) => {
     // 1. Buscar device
     const found_device = await Device.findOne({
          where: { uuid },
          include: {
               model: Sensor,
               as: "sensors", // viene de las relaciones definidas
               include: {
                    model: Event,
                    as: "events",
                    attributes: ["data", "message", "severity", "timestamp"], //seleccion de atributos especificos
                    where: {
                         timestamp: {
                              //seleccion de un tiempo para traer los datos
                              [Op.gte]: new Date(
                                   new Date().setMonth(
                                        new Date().getMonth() - months,
                                   ),
                              ),
                         },
                    },
                    required: false, // para que traiga sensores aunque no tengan eventos
               },
          },
     });

     if (!found_device) {
          return {
               success: false,
               msg: "El dispositivo no existe",
               detail: [],
          };
     }

     return {
          success: true,
          msg: "Datos obtenidos",
          detail: found_device,
     };
};

const infoForGrafic = async (months, uuid) => {
     // 1. Buscar device
     const found_device = await Device.findOne({
          where: { uuid },
          include: {
               model: Sensor,
               as: "sensors",
               include: {
                    model: Event,
                    as: "events",
                    attributes: ["data", "message", "severity", "timestamp"],
                    where: {
                         timestamp: {
                              [Op.gte]: new Date(
                                   new Date().setMonth(
                                        new Date().getMonth() - months,
                                   ),
                              ),
                         },
                    },
                    required: false,
               },
          },
     });

     if (!found_device) {
          return {
               success: false,
               msg: "El dispositivo no existe",
               detail: {},
          };
     }

     // ⬇️ NUEVO FORMATO: array de objetos
     const formattedData = found_device.sensors.map((sensor) => {
          const sortedEvents = sensor.events.sort(
               (a, b) => new Date(a.timestamp) - new Date(b.timestamp),
          );

          const formattedEvents = sortedEvents.map((event) => ({
               date: event.timestamp.toISOString(),
               value: Number(event.data ?? null),
          }));

          return {
               code: sensor.code,
               name: sensor.name,
               min: sensor.minvalue,
               max: sensor.maxvalue,
               data: formattedEvents,
          };
     });
     return {
          success: true,
          msg: "Datos obtenidos para gráficos",
          detail: formattedData,
     };
};

const findDeviceService = async (device_uuid) => {
     const exist_device = await Device.findOne({
          where: { uuid: device_uuid },
          include: [
               {
                    model: Sensor,
                    as: "sensors",
               },
          ],
     });

     if (!exist_device) {
          return {
               success: false,
               msg: "El dispositivo no se ha encontrado.",
               detail: [],
          };
     }

     const unitByType = (type) => {
          switch (type) {
               case "temperature":
                    return "°C";
               case "humidity":
                    return "%";
               default:
                    return "";
          }
     };

     const response = {
          device_name: exist_device.name,
          device_section: exist_device.section,
          device_uuid: exist_device.uuid,
          device_sensors: exist_device.sensors.map((s) => ({
               sensor_name: s.name,
               sensor_code: s.code,
               sensor_type: s.type,
               unit: s.unit ?? unitByType(s.type),
               sensor_min: s.minvalue ?? "",
               sensor_max: s.maxvalue ?? "",
          })),
     };

     return {
          success: true,
          msg: "Dispositivo encontrado",
          detail: response,
     };
};

export { deviceService, deviceDataService, infoForGrafic, findDeviceService };
