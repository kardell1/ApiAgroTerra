// associations.js
import Device from "./Device.js";
import Metric from "./Metric.js";
import Sensor from "./Sensor.js";
import User from "./User.js";
import Event from "./Event.js"; // ❌ Import faltante
import Token from "./PersonalToken.js";

export default function applyAssociations() {
  // Usuario ↔ Device
  User.hasMany(Device, { foreignKey: "user_id", as: "devices" });
  Device.belongsTo(User, { foreignKey: "user_id", as: "user" });

  // Device ↔ Sensor
  Device.hasMany(Sensor, { foreignKey: "device_id", as: "sensors" });
  Sensor.belongsTo(Device, { foreignKey: "device_id", as: "device" });

  // Sensor ↔ Metric
  Sensor.hasMany(Metric, { foreignKey: "sensor_id", as: "metrics" });
  Metric.belongsTo(Sensor, { foreignKey: "sensor_id", as: "sensor" });

  // Sensor ↔ Event
  Sensor.hasMany(Event, { foreignKey: "sensor_id", as: "events" });
  Event.belongsTo(Sensor, { foreignKey: "sensor_id", as: "sensor" });

  // token
  User.hasMany(Token, { foreignKey: "user_id", as: "tokens" });
  Token.belongsTo(User, { foreignKey: "user_id", as: "user" });
}
