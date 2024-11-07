// Server MQTT INSTANCE
//export const mqttURL = "ws://38.43.134.172:1884"
//export const mqttDominio = "ws://telemetriaperu.com:1884"
export const mqttDominio = "ws://localhost.com:1883"
// Para pruebas locales
export const mqttLocalURL = "ws://telemetriaperu:1883"

// Temas MQTT
export const mqttTopics = {
    mapa: "prueba",
    tmp_gasPressure: "tmp_gasPressure/",
    sensorsData: "sensorsData/",
};