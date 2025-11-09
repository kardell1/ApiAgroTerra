import mqtt_client from "../../config/mqtt.js";
import eventService from "./EventService.js";
// importar el dotenv
import dotenv from "dotenv";
dotenv.config();

const initMqttService = () => {
  mqtt_client.on("message", async (topic, message) => {
    try {
      if (!topic.startsWith(process.env.MQTT_TOPIC_EVENT)) return;
      const payload = message.toString();
      // esta funcion lo que hace es evaluar y registrar los datos
      // en la base de datos , en la tabla de events
      await eventService(payload);
      // reenviar el mensaje al fronted
      mqtt_client.publish(process.env.MQTT_TOPIC_EMIT_EVENT, payload, (err) => {
        if (err) {
          console.error("❌ Error reenviando al frontend:", err);
        } else {
          console.log(
            "📤 Reenviado al frontend:",
            process.env.MQTT_TOPIC_EMIT_EVENT,
          );
        }
      });
      //f47ac10b-58cc-4372-a567-0e02b2c3d442,TMP=23,HMD=45.6,LGT=12.56
      console.log("MQTT:", topic, payload);
    } catch (error) {
      console.error("❌ Error procesando MQTT:", error);
    }
  });
};

export default initMqttService;
