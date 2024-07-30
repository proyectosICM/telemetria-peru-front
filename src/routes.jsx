import { TruckMenuPanel } from "./common/truckMenuPanel";
import { MapaBase } from "./maps/mapaBase";
import { MainPanel } from "./pages/mainPanel";

export const routes = [
  { path: "/", component: <MainPanel /> },
  { path: "/2", component: <TruckMenuPanel /> },
  { path: "/mapa", component: <MapaBase /> },
];
