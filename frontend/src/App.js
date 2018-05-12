import React, { Component } from "react";
import { Router, Route } from "react-router-dom";
import Routes from "./Routes";
import createHistory from "history/createBrowserHistory";
import connection from "./connection";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);

    this.history = createHistory();
    // this.isSignIn();
  }

  isSignIn(){
    axios.get(connection.auth("me"))
      .then(r=> console.log(r))
      .catch(e=> console.log(e));

  }

  render() {
    return (
      <Router history={this.history}>
        <div>
          {Routes.map((element, key) =>
            <Route exact path={element.route} component={element.component} key={key} />
          )}
        </div>
      </Router>
    );
  }
}

export default App;