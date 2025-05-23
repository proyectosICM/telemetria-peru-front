import { MapaBase } from "./maps/mapaBase";
import { AdminPanel } from "./pages/adminPanel/adminPanel";
import { ChecklistPanel } from "./pages/checklistPanel/checklisPanel";
import { Example } from "./pages/checklistPanel/example";
import { Example2 } from "./pages/checklistPanel/example2";
import { Login } from "./pages/auth/login";
import { WelcomeAndRedirect } from "./pages/auth/welcomeAndRedirect";
import { TireSensorsDetails } from "./pages/records/tire/tireSensorsDetails";
import { Example4 } from "./pages/checklistPanel/example4";
import { Example3 } from "./pages/checklistPanel/example3";
import { CompanyAdminPanel } from "./pages/adminPanel/companyAdmin/companyAdminPanel";
import { UserAdminPanel } from "./pages/adminPanel/userAdmin/userAdminPanel";
import { DriverAdminPanel } from "./pages/adminPanel/driverAdmin/driverAdminPanel";
import { BatteriesAdminPanel } from "./pages/adminPanel/batteriesAdmin/batteriesAdminPanel";
import { RoleAdminPanel } from "./pages/adminPanel/rolAdmin/roleAdminPanel";
import { VerCL } from "./pages/checklistPanel/verCL";
import { RecordsPanel } from "./pages/recordsPanel/recordsPanel";
import { AddBatteryForm } from "./pages/adminPanel/batteriesAdmin/addBatteryForm";
import { AddDriverForm } from "./pages/adminPanel/driverAdmin/addDriverForm";
import { AddCompanyForm } from "./pages/adminPanel/companyAdmin/addCompanyForm";
import { AddUserForm } from "./pages/adminPanel/userAdmin/addUserForm";
import { AddRolForm } from "./pages/adminPanel/rolAdmin/addRolForm";
import { VehicleInfoPanel } from "./pages/records/vehicleInfo/vehicleInfoPanel";
import { MainPanel } from "./pages/mainPanel/mainPanel";
import { AlarmRecords } from "./pages/records/alarm";
import { IgnitionRecords } from "./pages/records/ignitions";
import { BatteryRecords } from "./pages/records/batteries";
import { IgnitionDetails } from "./pages/records/ignitions/details";
import { IssuesRecords } from "./pages/records/issues";
import { FuelRecords } from "./pages/records/fuel";
import { ImpactIncidentLoggingRecords } from "./pages/records/impactIncident/impactIncidentLoggingRecords";
import ManageVehicles from "./pages/adminPanel/manage_vehicles";
import { CamerasPanel } from "./pages/camerasPanel";

export const routes = [
  { path: "/", component: <MainPanel /> },
  { path: "/mapa", component: <MapaBase /> },
  { path: "/login", component: <Login /> }, 
  { path: "/redirectandW", component: <WelcomeAndRedirect /> },
  { path: "/admin", component: <AdminPanel /> },
  { path: "/cameras", component: <CamerasPanel /> },

  { path: "/vehicle-info", component: <VehicleInfoPanel /> },

  { path: "/fuel-Records", component: <FuelRecords /> },
  { path: "/alarm-Records", component: <AlarmRecords /> },
  { path: "/ignition-Records", component: <IgnitionRecords /> },
  { path: "/ignition-Details", component: <IgnitionDetails /> },
  { path: "/battery-Records", component: <BatteryRecords /> },

  { path: "/issues-Records", component: <IssuesRecords /> },
  { path: "/impact-incident-logging-records", component: <ImpactIncidentLoggingRecords /> },

  { path: "/tire-sensors-details", component: <TireSensorsDetails /> },
  { path: "/checklist-panel", component: <ChecklistPanel /> },

  { path: "/example/:type", component: <Example /> },
  { path: "/example2/:type", component: <Example2 /> },
  { path: "/example3", component: <Example3 /> },
  { path: "/example3/:licensePlate", component: <Example3 /> },
  { path: "/example2", component: <Example4 /> },

  // Admin
  { path: "/manage-vehicles", component: <ManageVehicles /> },

  { path: "/company-admin", component: <CompanyAdminPanel /> },
  { path: "/add-company", component: <AddCompanyForm /> },
  { path: "/edit-company/:id", component: <AddCompanyForm /> },

  { path: "/user-admin", component: <UserAdminPanel /> },
  { path: "/add-user", component: <AddUserForm /> },
  { path: "/edit-user/:id", component: <AddUserForm /> },

  { path: "/driver-admin", component: <DriverAdminPanel /> },
  { path: "/add-driver", component: <AddDriverForm /> },
  { path: "/edit-driver/:id", component: <AddDriverForm /> },

  { path: "/batteries-admin", component: <BatteriesAdminPanel /> },
  { path: "/add-battery", component: <AddBatteryForm /> },
  { path: "/edit-battery/:id", component: <AddBatteryForm /> },

  { path: "/roles-admin", component: <RoleAdminPanel /> },
  { path: "/add-role", component: <AddRolForm /> },
  { path: "/edit-role/:id", component: <AddRolForm /> },

  { path: "/tire-admin", component: <RoleAdminPanel /> },

  { path: "/ver-cl/:idcl", component: <VerCL /> },
  { path: "/records-panel", component: <RecordsPanel /> },
];
