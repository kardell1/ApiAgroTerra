import sequelize from "../config/database.js";
import User from "../app/Models/User.js";
import Device from "../app/Models/Device.js";
import Sensor from "../app/Models/Sensor.js";
import Metric from "../app/Models/Metric.js";
import Event from "../app/Models/Event.js";
import PersonalToken from "../app/Models/PersonalToken.js";
import applyAssociations from "../app/Models/Relations.js";

const startServer = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
    applyAssociations();
    console.log("Conexion exitosa");
  } catch (error) {
    console.error("Unable to start server:", error);
    process.exit(1);
  }
};

export default startServer;
