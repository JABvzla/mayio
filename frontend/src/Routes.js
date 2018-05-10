//Containers
import Login from "./containers/Login";
import Business from "./containers/Business";

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
];

export default Routes;
