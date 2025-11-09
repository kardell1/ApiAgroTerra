import mqtt from "mqtt";
import dotenv from "dotenv";
dotenv.config();
//conexion al mqtt
const connectUrl = `${process.env.MQTT_PROTOCOL}://${process.env.MQTT_HOST}:${process.env.MQTT_PORT}`;

const mqtt_client = mqtt.connect(connectUrl, {
  username: process.env.MQTT_USERNAME,
  password: process.env.MQTT_PASSWORD,
});

// logs de conexion
mqtt_client.on("connect", () => {
  (console.log("✅ Conectado al broker MQTT"),
    mqtt_client.subscribe(process.env.MQTT_TOPIC_EVENT, (err) => {
      if (!err) console.log("Suscrito al topico que recibe");
    }));
});
mqtt_client.on("error", (err) => console.error("❌ MQTT Error:", err.message));
mqtt_client.on("reconnect", () => console.log("♻️ Reconnecting..."));
mqtt_client.on("close", () => console.log("🔌 Conexión MQTT cerrada"));

export default mqtt_client;
