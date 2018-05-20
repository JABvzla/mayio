import React, { Component } from "react";
import { Router, Route } from "react-router-dom";
import Routes from "./Routes";
import createHistory from "history/createBrowserHistory";
import Connection from "./Connection";

class App extends Component {
  constructor(props) {
    super(props);

    this.history = createHistory();
    this.isSignIn();
  }

  isSignIn(){

    if(localStorage.getItem("_token") && localStorage.getItem("user")){
      Connection.call("me")
        .then(r=> { if(this.history.location.pathname === "/login") this.history.push("/") });
    }else{
      localStorage.clear();
      if(this.history.location.pathname !== "/login"){
        this.history.push("/login");
      }
    }
  }

  render() {
    return (
      <Router history={this.history}>
        <div>
          {Routes.map((element, key) =>
            <Route exact path={element.route} component={element.component} key={key} history={this.history}/>
          )}
        </div>
      </Router>
    );
  }
}

export default App;