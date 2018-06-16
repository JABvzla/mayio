//Containers
import Login from "./containers/Login";
import Business from "./containers/Business";
import Daily from "./containers/Daily";
import Major from "./containers/Major";

const Routes = [
  {
    text: "Login",
    icon: "home_outline",
    route: "/login",
    component: Login
  },
  {
    text: "Business",
    icon: "home_outline",
    route: "/",
    component: Business
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
];

export default Routes;
