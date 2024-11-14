// Server MQTT INSTANCE
export const mqttURL = "ws://38.43.134.172:1884"
export const mqttDominio = "ws://telemetriaperu.com:1884"

// Para pruebas locales
export const mqttLocalURL = "ws://localhost:1883"

// Temas MQTT
export const mqttTopics = {
    mapa: "mapa/",
    tmp_gasPressure: "telData/",
};

// URL para desarrollo
const base = "http://192.168.1.232:7078"
 
// URL para producion en el servidor
//export const base = "http://telemetriaperu.com:7070";



export const baseURL = `${base}`;

export const loginURL = `${base}/login`;

const baseAPIURL = `${base}/api`;

// Company
export const companiesURL = `${baseAPIURL}/companies`;
export const companiesPageURL = `${companiesURL}/page`;

export const rolesURL = `${baseAPIURL}/role`;

//vehicles
export const vehiclesURL = `${baseAPIURL}/vehicles`;
export const vehiclesByCompanyURL = `${vehiclesURL}/findByCompanyId`;
export const vehiclesByCompanyPagedURL = `${vehiclesURL}/findByCompanyId-paged`;

//vehicles
export const vehiclesTypesURL = `${baseAPIURL}/vehicle-type`;

export const vehiclesOptionsDataURL = `${vehiclesURL}/options-data`;
export const vehiclesOptionsUpdateURL = `${vehiclesURL}/options-update`;

/** User */
export const UserURL = `${baseAPIURL}/users`;
export const userPagedURL = `${UserURL}/paged`;
export const InfoUserURL = `${UserURL}/info/`;

/** Drivers */
export const driverURL = `${baseAPIURL}/driver`;
export const driverPagedURL = `${driverURL}/paged`;

/** Gas Records */
export const fuelRecordsURL = `${baseAPIURL}/fuel-records`;
export const fuelRecordsPageURL = `${fuelRecordsURL}/page`;
export const fuelRecordsByVehicleIdURL = `${fuelRecordsURL}/findByVehicleId`;
export const fuelRecordsByVehicleIdPageURL = `${fuelRecordsURL}/findByVehicleId-page`;

/** Battery **/
export const batteryURL = `${baseAPIURL}/batteries`;
export const batteryPagedURL = `${batteryURL}/paged`;
export const batteryByVehicleIdURL = `${batteryURL}/findByVehicleId`;
export const batteryByVehicleIdPageURL = `${batteryURL}/findByVehicleId-page`;

/** Battery Records **/
export const batteryRecordURL = `${baseAPIURL}/batteries-records`;
export const batteryRecordByVehicleIdURL = `${batteryRecordURL}/findByBatteryId`;
export const batteryRecordByVehicleIdPageURL = `${batteryRecordURL}/findByBatteryId-page`;

/** Tire Sensor **/
export const tireSensorURL = `${baseAPIURL}/tire-sensor`;
export const tireSensorByVehicleIdURL = `${tireSensorURL}/findByVehicleModelId`;

/** Checklist */
export const checklistRecordsURL = `${baseAPIURL}/checklist-records`;
export const checklistRecordsPageURL = `${checklistRecordsURL}/paged`;
export const checklistJSONURL = `${checklistRecordsURL}/json`;
export const checklistRecordsVehicleURL = `${checklistRecordsURL}/findByVehicle`;
export const checklistRecordsVehiclePageURL = `${checklistRecordsURL}/findByVehicle-paged`;

/** Image Checklist */
export const ImagesCLURL = `${baseAPIURL}/images-cl`;
export const ImagesCLIdURL = `${ImagesCLURL}/findByChecklistRecord`;
export const ImagesCLIdPagedURL = `${ImagesCLURL}/findByChecklistRecord-paged`;
export const ImagesCLNameViewURL = `${ImagesCLURL}/images`;

/**  **/
export const impactIncidentLoggingURL = `${baseAPIURL}/impact_incident_logging`;
export const impactIncidentLoggingByVehicleURL = `${impactIncidentLoggingURL}/findByVehicleId`;
export const impactIncidentLoggingByVehiclePageURL = `${impactIncidentLoggingURL}/findByVehicleId-page`;

/* */
export const speedExcessLoggerURL = `${baseAPIURL}/speed_excess_logger`;
export const speedExcessLoggerByVehicleURL = `${speedExcessLoggerURL}/findByVehicleId`;
export const speedExcessLoggerByVehiclePageURL = `${speedExcessLoggerURL}/findByVehicleId-page`;

/* */
export const truckLoadRecordURLURL = `${baseAPIURL}/truck-loads`;
export const truckLoadRecordURLByVehicleURL = `${truckLoadRecordURLURL}/findByVehicle`;
export const truckLoadRecordURLByVehiclePageURL = `${truckLoadRecordURLURL}/findByVehicle-paged`;
export const truckLoadRecordByVehicleCountURL = `${truckLoadRecordURLURL}/count-day`;
export const truckLoadRecordByVehicleCountAllURL = `${truckLoadRecordURLURL}/daily-load-counts`;