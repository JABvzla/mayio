import React, {Component} from "react";
import axios from "axios";
import connection from "../../connection";

class Business extends Component {
  constructor(props){
    super(props);

    this.state = {
      business: [],
      name: ""
    };
    this.addBusiness = this.addBusiness.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
  }

  componentDidMount() {
    this.getBusiness();
  }

  getBusiness() {
    axios.get(connection.auth("user/"+localStorage.getItem("user")))
      .then(r=> this.setState({business:r.data.businesses}))
      .catch(e=> console.log(e));
  }

  addBusiness() {
    var data = {
      users: localStorage.getItem("user"),
      name: this.state.name
    };

    axios.post(connection.auth("business"),data)
      .then(r=> this.getBusiness())
      .catch(e=> console.log(e));
  }

  onNameChange = e => this.setState({name: e.target.value});

  render() {
    return (
      <div>
        <div>
          <input type="text" onChange={this.onNameChange}/>
          <input type="button" value="agregar" onClick={this.addBusiness}/>
        </div>
        <ul>
          {this.state.business.map((e,k)=>
            <li key={k}>{e.name}</li>
          )}
        </ul>
      </div>
    );
  }
}


export default Business;
