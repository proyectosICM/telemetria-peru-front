import { MapaBase } from "./maps/mapaBase";
import { AdminPanel } from "./pages/adminPanel/adminPanel";
import { BatteryRecords } from "./pages/batteryRecords/batteryRecords";
import { ChecklistPanel } from "./pages/checklistPanel/checklisPanel";
import { Example } from "./pages/checklistPanel/example";
import { Example2 } from "./pages/checklistPanel/example2";
import { GasRecords } from "./pages/gasRecords/gasRecords";
import { ImpactIncidentLoggingRecords } from "./pages/impactIncidentLoggingRecords/impactIncidentLoggingRecords";
import { IssuesRecords } from "./pages/issuesRecords/issuesRecords";
import { Login } from "./pages/login/login";
import { WelcomeAndRedirect } from "./pages/login/welcomeAndRedirect";
import { MainPanel } from "./pages/mainPanel";
import { TireSensorsDetails } from "./pages/tireSensorsDetails/tireSensorsDetails";
import { Example4 } from './pages/checklistPanel/example4';
import { Example3 } from './pages/checklistPanel/example3';
import { CompanyAdminPanel } from "./pages/adminPanel/companyAdmin/companyAdminPanel";
import { UserAdminPanel } from "./pages/adminPanel/userAdmin/userAdminPanel";
import { DriverAdminPanel } from "./pages/adminPanel/driverAdmin/driverAdminPanel";
import { BatteriesAdminPanel } from "./pages/adminPanel/batteriesAdmin/batteriesAdminPanel";
import { RoleAdminPanel } from "./pages/adminPanel/rolAdmin/roleAdminPanel";
 
export const routes = [
  { path: "/", component: <MainPanel /> },
  { path: "/mapa", component: <MapaBase /> },
  { path: "/login", component: <Login /> },
  { path: "/redirectandW", component: <WelcomeAndRedirect/> },
  { path: "/admin", component: <AdminPanel/> },

  { path: "/gas-Records", component: <GasRecords/> },
  { path: "/battery-Records", component: <BatteryRecords /> },
  
  { path: "/issues-Records", component: <IssuesRecords /> },
  { path: "/impact-incident-logging-records", component: <ImpactIncidentLoggingRecords />},

  { path: "/tire-sensors-details", component: <TireSensorsDetails /> },
  { path: "/checklist-panel", component: <ChecklistPanel /> },

  { path: "/example/:type", component: <Example /> },
  { path: "/example2/:type", component: <Example2 /> },
  { path: "/example3", component: <Example3 /> },
  { path: "/example2", component: <Example4 /> },


  // Admin
  { path: "/company-admin", component: <CompanyAdminPanel /> },
  { path: "/user-admin", component: <UserAdminPanel /> },
  { path: "/driver-admin", component: <DriverAdminPanel /> },
  { path: "/batteries-admin", component: <BatteriesAdminPanel /> },
  { path: "/roles-admin", component: <RoleAdminPanel /> },
  { path: "/tire-admin", component: <RoleAdminPanel /> },
];
