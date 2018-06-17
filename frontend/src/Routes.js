//Containers
import Login from "./containers/Login";
import Menu from "./containers/Menu";
import Daily from "./containers/Daily";
import Major from "./containers/Major";
import Checkup from "./containers/Checkup";

const Routes = [
  {
    text: "Login",
    icon: "home_outline",
    route: "/login",
    component: Login
  },
  {
    text: "Menu",
    icon: "home_outline",
    route: "/",
    component: Menu
  },
  {
    text: "Daily",
    icon: "home_outline",
    route: "/daily",
    component: Daily
  },
  {
    text: "Major Analytics",
    icon: "home_outline",
    route: "/major",
    component: Major
  },
  {
    text: "Checkup",
    icon: "home_outline",
    route: "/checkup",
    component: Checkup
  },
];

export default Routes;
