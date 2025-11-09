import { DeviceStore } from "../../store/deviceStore.js";
import Event from "../Models/Event.js";

const eventService = async (payload) => {
  console.log("dentro del eventService tenemos los siguientes datos:", payload);

  const [device_code, ...data] = payload.split(",");
  const find_device = await DeviceStore.getDevice(device_code);

  if (!find_device) return;
  for (const p of data) {
    const [key, rawValue] = p.split("=");
    const value = parseFloat(rawValue);

    const found_data = find_device.find(
      (sensor_data) => sensor_data.code == key,
    );

    if (!found_data) continue;

    const min = parseFloat(found_data.min);
    const max = parseFloat(found_data.max);

    if (value <= min || value >= max) {
      const message =
        value <= min
          ? "Valor por debajo del mínimo establecido"
          : "Alerta crítica, valor demasiado alto";

      await Event.create({
        sensor_id: found_data.id,
        event_type: "alert",
        data: value,
        message,
        severity: "high",
        timestamp: new Date(),
      });
    }
  }
};

export default eventService;

// import { DeviceStore } from "../../store/deviceStore.js";
// import Event from "../Models/Event.js";

// const eventService = async (payload) => {
//   console.log(
//     "dentro del eventService tenemos los siguientes datos : " + payload,
//   );
//   const [device_code, ...data] = payload.split(",");
//   const find_device = await DeviceStore.getDevice(device_code);
//   if (!find_device) {
//     return;
//   }
//   Object.fromEntries(
//     data.map((p) => {
//       const [key, value] = p.split("=");
//       const found_data = find_device.find(
//         (sensor_data) => sensor_data.code == key,
//       );
//       if (found_data) {
//         if (
//           parseFloat(value) <= parseFloat(found_data.min) ||
//           parseFloat(value) >= parseFloat(found_data.max)
//         ) {
//           const new_msg =
//             parseFloat(value) <= parseFloat(found_data.min)
//               ? "Valor por debajo del minimo establecido"
//               : "Alerta critica, valores demasiados alto";
//           Event.create({
//             sensor_id: found_data.id,
//             event_type: "alert",
//             data: value,
//             message: new_msg,
//             severity: "high",
//             timestamp: new Date(),
//           });
//         }
//       }
//     }),
//   );
// };

// export default eventService;
