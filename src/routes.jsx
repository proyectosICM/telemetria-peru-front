import { TruckMenuPanel } from "./common/truckMenuPanel";
import { MapaBase } from "./maps/mapaBase";
import { Login } from "./pages/login/login";
import { WelcomeAndRedirect } from "./pages/login/welcomeAndRedirect";
import { MainPanel } from "./pages/mainPanel";

export const routes = [
  { path: "/", component: <MainPanel /> },
  { path: "/2", component: <TruckMenuPanel /> },
  { path: "/mapa", component: <MapaBase /> },
  { path: "/login", component: <Login /> },
  { path: "/redirectandW", component: <WelcomeAndRedirect/> },
];
