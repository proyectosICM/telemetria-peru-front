export const mqttURL = "ws://38.43.134.172:1884"
export const mqttDominio = "ws://telemetriaperu.com:1884"
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

export const baseURL = `${base}`;

export const loginURL = `${base}/login`;

const baseAPIURL = `${base}/api`;

//vehicles
export const vehiclesURL = `${baseAPIURL}/vehicles`;
export const vehiclesByCompanyURL = `${vehiclesURL}/findByCompanyId`;
export const vehiclesByCompanyPagedURL = `${vehiclesURL}/findByCompanyId-paged`;

export const vehiclesAlarmOnURL = `${vehiclesURL}/update-alarm`;
export const vehiclesLockOnURL = `${vehiclesURL}/update-lock`;
export const vehiclesEngineOnURL = `${vehiclesURL}/update-engine`;

/** User */
export const UserURL = `${baseAPIURL}/users`;
export const InfoUserURL = `${UserURL}/info/`;




