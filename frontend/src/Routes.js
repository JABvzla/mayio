//Containers
import Login from "./containers/Login";
import Business from "./containers/Business";
import Daily from "./containers/Daily";

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
    route: "/business",
    component: Business
  },
  {
    text: "Daily",
    icon: "home_outline",
    route: "/daily",
    component: Daily
  },
];

export default Routes;
