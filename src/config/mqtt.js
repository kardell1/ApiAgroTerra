import mqtt from "mqtt";
import dotenv from "dotenv";
dotenv.config();

const connectUrl = `${process.env.MQTT_PROTOCOL}://${process.env.MQTT_HOST}:${process.env.MQTT_PORT}`;

const mqtt_client = mqtt.connect(connectUrl, {
  username: process.env.MQTT_USERNAME,
  password: process.env.MQTT_PASSWORD,
});

// Logs básicos de conexión
mqtt_client.on("connect", () => console.log("✅ Conectado al broker MQTT"));
mqtt_client.on("error", (err) => console.error("❌ MQTT Error:", err.message));
mqtt_client.on("reconnect", () => console.log("♻️ Reconnecting..."));
mqtt_client.on("close", () => console.log("🔌 Conexión MQTT cerrada"));

//topics
// teffiot/:mod/:value -> cama 1 y 2
// teffiot/front/:mod/:val  -> mod 1 y 2

// Inicialización del servicio (suscripciones y listeners)
const initMQTT = () => {
  // mqtt_client.subscribe("pets/updates", (err) => {
  //   if (!err) console.log("📡 Suscrito a pets/updates");
  // });

  mqtt_client.on("message", (topic, message) => {
    console.log(`📩 Mensaje recibido en ${topic}: ${message.toString()}`);
  });
};

// 👇 Exportamos ambos
export { mqtt_client, initMQTT };
