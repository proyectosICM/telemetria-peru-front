// Server MQTT INSTANCE
export const mqttURL = "ws://38.43.134.172:1884";
export const mqttDominio = "ws://telemetriaperu.com:1884";

// Para pruebas locales
export const mqttLocalURL = "ws://localhost:1883";

// URL para desarrollo
//const base = "http://192.168.1.232:7078"

// URL para producion en el servidor
//export const base = "http://telemetriaperu.com:7070";
export const baseURL = "http://telemetriaperu.com:7070";
export const loginURL = `${baseURL}/login`;
export const baseAPIURL = `${baseURL}/api`;

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
  base: `${baseAPIURL}/role`,
};

// User Routes
export const userRoutes = {
  base: `${baseAPIURL}/users`,
  paged: `${baseAPIURL}/users/paged`,
  info: `${baseAPIURL}/users/info`,
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
  updateDriver: `${baseAPIURL}/vehicles/update-driver`,
};

// Driver Routes
export const driverRoutes = {
  base: `${baseAPIURL}/driver`,
  paged: `${baseAPIURL}/driver/paged`,
  byStatus: `${baseAPIURL}/driver/by-status`,
  byStatusPaged: `${baseAPIURL}/driver/by-status-paged`,
  byCompanyAndStatus: `${baseAPIURL}/driver/by-company-and-status`,
  byCompanyAndStatusPaged: `${baseAPIURL}/driver/by-company-and-status-paged`,
  statusToggle: `${baseAPIURL}/driver/status-toggle`,
  updateRFID: `${baseAPIURL}/driver/update-RFID`,
};

// Alarm Routes
export const alarmRecordRoutes = {
  byVehicle: `${baseAPIURL}/alarm-record/by-vehicle`,
  byVehiclePaged: `${baseAPIURL}/alarm-record/by-vehicle-paged`,
};

// Fuel Records Routes
export const fuelRecordsRoutes = {
  base: `${baseAPIURL}/fuel-records`,
  paged: `${baseAPIURL}/fuel-records/paged`,
  byVehicle: `${baseAPIURL}/fuel-records/by-vehicle`,
  byVehiclePaged: `${baseAPIURL}/fuel-records/by-vehicle-paged`,
  hourlyAVL: `${baseAPIURL}/fuel-records/hourly-averages`,
  weekAVL: `${baseAPIURL}/fuel-records/week-averages`,
  monthAVL: `${baseAPIURL}/fuel-records/month-averages`,
  yearAVL: `${baseAPIURL}/fuel-records/year-averages`,
};

// Fuel Efficiency Routes
export const fuelEfficiencyRoutes = {
  base: `${baseAPIURL}/fuel-efficiency`,
  downloadExcel: `${baseAPIURL}/fuel-efficiency/download-excel`,
  byVehicle: `${baseAPIURL}/fuel-efficiency/by-vehicle`,
  byVehiclePaged: `${baseAPIURL}/fuel-efficiency/by-vehicle-paged`,
  dailyAverages: `${baseAPIURL}/fuel-efficiency/daily-averages`,
  monthlyAverages: `${baseAPIURL}/fuel-efficiency/monthly-averages`,
  summary: `${baseAPIURL}/fuel-efficiency/summary`,
};

export const gasRecordsRoutes = {
  byVehicle: `${baseAPIURL}/gas-records/by-vehicle`,
  byVehiclePaged: `${baseAPIURL}/gas-records/by-vehicle-paged`,
};

export const gasChangesRoutes = {
  byVehicle: `${baseAPIURL}/gas-changes/by-vehicle`,
  byVehiclePaged: `${baseAPIURL}/gas-changes/by-vehicle-paged`,
};

// Ignition Routes
export const ignitionRoutes = {
  base: `${baseAPIURL}/vehicle-ignition`,
  paged: `${baseAPIURL}/vehicle-ignition/paged`,
  byVehicle: `${baseAPIURL}/vehicle-ignition/by-vehicle`,
  byVehiclePaged: `${baseAPIURL}/vehicle-ignition/by-vehicle-paged`,
  count: `${baseAPIURL}/vehicle-ignition/count`, 
  countsAllDays: `${baseAPIURL}/vehicle-ignition/counts-all-days`,
  countsAllMonths:`${baseAPIURL}/vehicle-ignition/counts-all-months`
};

// Tire Sensor Routes
export const tireSensorRoutes = {
  base: `${baseAPIURL}/tire-sensor`,
  byVehicle: `${baseAPIURL}/tire-sensor/by-vehicle`,
};

// Checklist Routes 
export const checklistRecordsRoutes = {
  base: `${baseAPIURL}/checklist-records`,
  paged: `${baseAPIURL}/checklist-records/paged`,
  json: `${baseAPIURL}/checklist-records/json`,
  byVehicle: `${baseAPIURL}/checklist-records/by-vehicle`,
  byVehiclePages: `${baseAPIURL}/checklist-records/by-vehicle-paged`,
};

// Image Checklist Routes
export const imageChecklistRoutes = {
  base: `${baseAPIURL}/images-cl`,
  nameView: `${baseAPIURL}/images-cl/images`,
  byChecklist: `${baseAPIURL}/images-cl/by-checklist`,
  byChecklistPaged: `${baseAPIURL}/images-cl/by-checklist-paged`,
};

// Impact Incident Logging Routes
export const impactIncidentLoggingRoutes = {
  base: `${baseAPIURL}/impact_incident_logging`,
  paged: `${baseAPIURL}/impact_incident_logging/paged`,
  byVehicle: `${baseAPIURL}/impact_incident_logging/by-vehicle`,
  byVehiclePaged: `${baseAPIURL}/impact_incident_logging/by-vehicle-paged`,
};

// Speed Excess Logger Routes
export const speedExcessLoggerRoutes = {
  base: `${baseAPIURL}/speed_excess_logger`,
  paged: `${baseAPIURL}/speed_excess_logger/paged`,
  byVehicle: `${baseAPIURL}/speed_excess_logger/by-vehicle`,
  byVehiclePaged: `${baseAPIURL}/speed_excess_logger/by-vehicle-paged`,
};

// Truck Load Record Routes
export const truckLoadRecordRoutes = {
  base: `${baseAPIURL}/truck-loads`,
  paged: `${baseAPIURL}/truck-loads/paged`,
  byVehicle: `${baseAPIURL}/truck-loads/by-vehicle`,
  byVehiclePaged: `${baseAPIURL}/truck-loads/by-vehicle-paged`,
  countDay: `${baseAPIURL}/truck-loads/count-day`,
  dailyLoadCounts: `${baseAPIURL}/truck-loads/daily-load-counts`,
  monthCounts: `${baseAPIURL}/truck-loads/month-counts`
};

// Vehicle Types Routes
export const vehiclesTypesRoutes = {
  base: `${baseAPIURL}/vehicle-type`,
};

// Battery Routes
export const batteryRoutes = {
  base: `${baseAPIURL}/batteries`,
  paged: `${baseAPIURL}/batteries/paged`,
  byVehicle: `${baseAPIURL}/batteries/by-vehicle`,
  byVehiclePaged: `${baseAPIURL}/batteries/by-vehicle-paged`,
  byCompany: `${baseAPIURL}/batteries/by-company`,
  byCompanyPaged: `${baseAPIURL}/batteries/by-company-paged`,
};

// Battery Records Routes
export const batteryRecordsRoutes = {
  base: `${baseAPIURL}/batteries-records`,
  paged: `${baseAPIURL}/batteries-records/paged`,
  byBattery: `${baseAPIURL}/batteries-records/by-battery`,
  byBatteryPaged: `${baseAPIURL}/batteries-records/by-battery-paged`,
  byVehicle: `${baseAPIURL}/batteries-records/by-vehicle`,
  byVehiclePaged: `${baseAPIURL}/batteries-records/by-vehicle-paged`,
  byVehicleAndBattery: `${baseAPIURL}/batteries-records/by-vehicle-battery`,
  byVehicleAndBatteryPaged: `${baseAPIURL}/batteries-records/by-vehicle-battery-paged`,
  countsByDays: `${baseAPIURL}/batteries-records/counts-by-days`
};

// Alternator Routes
export const alternatorRoutes = {
  byVehicle: `${baseAPIURL}/alternator/by-vehicle`,
  byVehiclePaged: `${baseAPIURL}/alternator/by-vehicle-paged`,
  countsByDays: `${baseAPIURL}/alternator/counts-by-days`
};

// Engine Starter Routes
export const engineStarterRoutes = {
  base: `${baseAPIURL}/engine-starter`,
  paged: `${baseAPIURL}/engine-starter/paged`,
  byVehicle: `${baseAPIURL}/engine-starter/by-vehicle`,
  byVehiclePaged: `${baseAPIURL}/engine-starter/by-vehicle-paged`,
    countsByDays: `${baseAPIURL}/engine-starter/counts-by-days`
};