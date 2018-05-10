import React, {Component} from "react";
import axios from "axios";
import TextField from "material-ui/TextField";
import Button from "material-ui/Button";
import connection from "../../connection";

class Login extends Component {

  constructor(props){
    super(props);

    this.state = {
      email: "",
      password: "",
      isLoggin: false,
    };

    this.onLogin = this.onLogin.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
  }

  onLogin() {
    if(!this.state.isLoggin  && this.state.email && this.state.password){
      let data = {
        email: this.state.email,
        password: this.state.password
      };

      axios.post(connection.url + 'jwt/auth', data)
        .then( r=> {localStorage.setItem("_token", r.data.token); localStorage.setItem("user", r.data.user.id);console.log(r.data);})
        .catch( e=> console.log(e));
    }
  }

  onEmailChange = e => this.setState({email: e.target.value});
  onPasswordChange = e => this.setState({password: e.target.value});

  render() {
    return (
      <div>
        <TextField label={"Usuario"} onChange={this.onEmailChange} />
        <TextField label={"Contraseña"} onChange={this.onPasswordChange} />
        <Button onClick={this.onLogin}>Iniciar Sessión</Button>
      </div>
    );
  }


}

export default Login;
