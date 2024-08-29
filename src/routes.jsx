import { MapaBase } from "./maps/mapaBase";
import { AdminPanel } from "./pages/adminPanel/adminPanel";
import { Login } from "./pages/login/login";
import { WelcomeAndRedirect } from "./pages/login/welcomeAndRedirect";
import { MainPanel } from "./pages/mainPanel";

export const routes = [
  { path: "/", component: <MainPanel /> },
  { path: "/mapa", component: <MapaBase /> },
  { path: "/login", component: <Login /> },
  { path: "/redirectandW", component: <WelcomeAndRedirect/> },
  { path: "/admin", component: <AdminPanel/> },
];
