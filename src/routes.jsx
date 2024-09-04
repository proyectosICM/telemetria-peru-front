import { MapaBase } from "./maps/mapaBase";
import { AdminPanel } from "./pages/adminPanel/adminPanel";
import { BatteryRecords } from "./pages/batteryRecords/batteryRecords";
import { GasRecords } from "./pages/gasRecords/gasRecords";
import { ImpactIncidentLoggingRecords } from "./pages/impactIncidentLoggingRecords/impactIncidentLoggingRecords";
import { IssuesRecords } from "./pages/issuesRecords/issuesRecords";
import { Login } from "./pages/login/login";
import { WelcomeAndRedirect } from "./pages/login/welcomeAndRedirect";
import { MainPanel } from "./pages/mainPanel";

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
];
