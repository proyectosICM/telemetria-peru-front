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
 const base = "http://192.168.1.232:7078"
// export const base = "http://telemetriaperu.com:7070";
// const base = "http://192.168.0.200:7078"

export const baseURL = `${base}`;

export const loginURL = `${base}/login`;

const baseAPIURL = `${base}/api`;

//vehicles
export const vehiclesURL = `${baseAPIURL}/vehicles`;
export const vehiclesByCompanyURL = `${vehiclesURL}/findByCompanyId`;
export const vehiclesByCompanyPagedURL = `${vehiclesURL}/findByCompanyId-paged`;

//vehicles
export const vehiclesTypesURL = `${baseAPIURL}/vehicle-type`;

export const vehiclesAlarmOnURL = `${vehiclesURL}/update-alarm`;
export const vehiclesLockOnURL = `${vehiclesURL}/update-lock`;
export const vehiclesEngineOnURL = `${vehiclesURL}/update-engine`;

/** User */
export const UserURL = `${baseAPIURL}/users`;
export const InfoUserURL = `${UserURL}/info/`;

/** Gas Records */
export const gasRecordsURL = `${baseAPIURL}/gas-records`;
export const gasRecordsPageURL = `${gasRecordsURL}/page`;
export const gasRecordsByVehicleIdURL = `${gasRecordsURL}/findByVehicleId`;
export const gasRecordsByVehicleIdPageURL = `${gasRecordsURL}/findByVehicleId-page`;

/** Battery **/
export const batteryURL = `${baseAPIURL}/batteries`;
export const batteryByVehicleIdURL = `${batteryURL}/findByVehicleId`;
export const batteryByVehicleIdPageURL = `${batteryURL}/findByVehicleId-page`;

/** Battery Records **/
export const batteryRecordURL = `${baseAPIURL}/batteries-records`;
export const batteryRecordByVehicleIdURL = `${batteryRecordURL}/findByBatteryId`;
export const batteryRecordByVehicleIdPageURL = `${batteryRecordURL}/findByBatteryId-page`;

/** Tire Sensor **/
export const tireSensorURL = `${baseAPIURL}/tire-sensor`;
export const tireSensorByVehicleIdURL = `${tireSensorURL}/findByVehicleModelId`;

/**  **/
export const impactIncidentLoggingURL = `${baseAPIURL}/impact_incident_logging`;
export const impactIncidentLoggingByVehicleURL = `${impactIncidentLoggingURL}/findByVehicleId`;
export const impactIncidentLoggingByVehiclePageURL = `${impactIncidentLoggingURL}/findByVehicleId-page`;