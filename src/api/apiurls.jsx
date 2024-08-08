export const mqttURL = "ws://38.43.134.172:1884"
export const mqttLocalURL = "ws://localhost:1883"

// Temas MQTT
export const mqttTopics = {
    prueba: "prueba",
    tmp_gasPressure: "tmp_gasPressure/",

    //Option
    tmp_alarmOn : "tmp_alarmOn/",
    tmp_vehicleOn: "tmp_vehicleOn/",
    tmp_areLocksOn: "tmp_areLocksOn/"
};

// URL base común
const base = "http://192.168.1.232:6061"

//const base = "http://192.168.0.200:6061"

const baseURL = `${base}/api`;

//vehicles
export const vehiclesURL = `${baseURL}/vehicles`;
export const vehiclesByCompanyURL = `${vehiclesURL}/findByCompanyId`;
export const vehiclesByCompanyPagedURL = `${vehiclesURL}/findByCompanyId-paged`;






