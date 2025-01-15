// Server MQTT INSTANCE
export const mqttURL = "ws://38.43.134.172:1884";
export const mqttDominio = "ws://telemetriaperu.com:1884";

// Para pruebas locales
export const mqttLocalURL = "ws://localhost:1883";

// Temas MQTT
export const mqttTopics = {
  mapa: "mapa/",
  telData: "telData/",
};

// URL para desarrollo
//const base = "http://192.168.1.232:7078"

// URL para producion en el servidor
export const base = "http://telemetriaperu.com:7070";

export const baseURL = `${base}`;

export const loginURL = `${base}/login`;

const baseAPIURL = `${base}/api`;

// Company Routes
export const companyRoutes = {
  base: `${baseAPIURL}/companies`,
  paged: `${baseAPIURL}/companies/paged`,
  byStatus: `${baseAPIURL}/companies/by-status`,
  byStatusPaged: `${baseAPIURL}/companies/by-status-paged`,
  updateStatus: `${baseAPIURL}/companies/update-status`,
};

// Role Routes
export const roleRoutes = {
  base: `${baseAPIURL}/roles`,
};

// Vehicle Routes
export const vehicleRoutes = {
  base: `${baseAPIURL}/vehicles`,
  byCompany: `${baseAPIURL}/vehicles/by-company`,
  byCompanyPaged: `${baseAPIURL}/vehicles/by-company-paged`,
  byStatus: `${baseAPIURL}/vehicles/by-status`,
  byStatusPaged: `${baseAPIURL}/vehicles/by-status-paged`,
  options: {
    data: `${baseAPIURL}/vehicles/options-data`,
    update: `${baseAPIURL}/vehicles/options-update`,
  },
  statusToggle: `${baseAPIURL}/vehicles/status-toggle`,
  updateDriver: `${baseAPIURL}/vehicles/update-driver`
};

//vehicles
export const vehiclesURL = `${baseAPIURL}/vehicles`;


//vehicles
export const vehiclesTypesURL = `${baseAPIURL}/vehicle-type`;




/** User */
export const UserURL = `${baseAPIURL}/users`;
export const userPagedURL = `${UserURL}/paged`;
export const InfoUserURL = `${UserURL}/info/`;

/** Drivers */
export const driverURL = `${baseAPIURL}/driver`;
export const driverPagedURL = `${driverURL}/paged`;

/** Fuel Records */
export const fuelRecordsURL = `${baseAPIURL}/fuel-records`;
export const fuelRecordsPageURL = `${fuelRecordsURL}/page`;
export const fuelRecordsByVehicleIdURL = `${fuelRecordsURL}/findByVehicleId`;
export const fuelRecordsByVehicleIdPageURL = `${fuelRecordsURL}/findByVehicleId-page`;
export const fuelRecordsHourlyAVLURL = `${fuelRecordsURL}/hourly-averages`;
export const fuelRecordsWeekAVLURL = `${fuelRecordsURL}/week-averages`;
export const fuelRecordsMonthAVLURL = `${fuelRecordsURL}/month-averages`;
export const fuelRecordsYearAVLURL = `${fuelRecordsURL}/year-averages`;

export const fuelEfficiencyURL = `${baseAPIURL}/fuel-efficiency`;
export const fuelEfficiencyByVehicleURL = `${fuelEfficiencyURL}/findByVehicle`;
export const fuelEfficiencyByVehiclePagedURL = `${fuelEfficiencyURL}/findByVehicle-paged`;
export const fuelEfficiencyByDailyAVGURL = `${fuelEfficiencyURL}/daily-averages`;
export const fuelEfficiencyByMothAVGURL = `${fuelEfficiencyURL}/monthly-averages`;
export const fuelEfficiencySummary = `${fuelEfficiencyURL}/summary`;
export const fuelEfficiencyDownload = `${fuelEfficiencyURL}/download-excel`;

export const ignitionRecordsURL = `${baseAPIURL}/vehicle-ignition`;
export const ignitionRecordsPagedURL = `${ignitionRecordsURL}/paged`;
export const ignitionRecordsByVehicleIdURL = `${ignitionRecordsURL}/findByVehicle`;
export const ignitionsByVehicleIdPageURL = `${ignitionRecordsURL}/findByVehicle-paged`;
export const ignitionBasicChartURL = `${ignitionRecordsURL}/active-durations`;
export const ignitionCountingURL = `${ignitionRecordsURL}/count`;
export const ignitionAllMothURL = `${ignitionRecordsURL}/counts-all-months`;
export const ignitionAllDayURL = `${ignitionRecordsURL}/counts-all-days`;

/** Alarm */
export const alarmRecordsURL = `${baseAPIURL}/alarm-record`;
export const alarmRecordsPageURL = `${alarmRecordsURL}/page`;
export const alarmRecordsByVehicleIdURL = `${alarmRecordsURL}/findByVehicle`;
export const alarmRecordsByVehicleIdPageURL = `${alarmRecordsURL}/findByVehicle-paged`;

/** Battery **/
export const batteryURL = `${baseAPIURL}/batteries`;
export const batteryPagedURL = `${batteryURL}/paged`;
export const batteryByVehicleIdURL = `${batteryURL}/findByVehicleId`;
export const batteryByVehicleIdPageURL = `${batteryURL}/findByVehicleId-page`;

/** Battery Records **/
export const batteryRecordURL = `${baseAPIURL}/batteries-records`;
export const batteryRecordByVehicleIdURL = `${batteryRecordURL}/findByBatteryId`;
export const batteryRecordByVehicleIdPageURL = `${batteryRecordURL}/findByBatteryId-page`;

export const batteryRecordByVehicleAndBatteryPageURL = `${batteryRecordURL}/vehicle&battery-paged`;

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
