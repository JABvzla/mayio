import React, {Component} from "react";
import Connection from "../../Connection";

import { withStyles } from "material-ui/styles";
import Paper from "material-ui/Paper";
import TextField from "material-ui/TextField";
import Button from "material-ui/Button";
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from "material-ui/Typography";

class Login extends Component {

  constructor(props){
    super(props);

    this.state = {
      email: "",
      password: "",
      isLoggin: false,
      loading: false
    };

    this.onLogin = this.onLogin.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
  }

  onLogin() {
    if(!this.state.isLoggin  && this.state.email && this.state.password){
      let data = {
        email: this.state.email.toLowerCase(),
        password: this.state.password
      };
      this.setState({loading: true});
      Connection.call("jwt/auth", data, "POST")
        .then( r => {
          localStorage.setItem("_token", r.data.token);
          localStorage.setItem("user", r.data.user.id);
          this.setState({loading: false});
          this.props.history.push("/");
        })
        .catch(() => this.setState({loading: false}));
    }
  }

  onEmailChange = e => this.setState({email: e.target.value});
  onPasswordChange = e => this.setState({password: e.target.value});

  render() {
    const { classes } = this.props;

    if(this.state.loading) return <CircularProgress className={classes.loading}/>

    return (
      <Paper className={classes.paper}>
        <Typography variant="headline" align="center">Iniciar Sesión</Typography>
        <TextField label={"Usuario"} onChange={this.onEmailChange} type="email" autoFocus />
        <TextField label={"Contraseña"} onChange={this.onPasswordChange} type="password"/>
        <Button onClick={this.onLogin} variant="raised" color="primary" >Entrar</Button>
      </Paper>
    );
  }
}

const styles =  ({
  paper: {
    maxWidth: 350,
    height: 300,
    maxHeight: 300,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    padding: 20,
    margin: 'auto',
    marginTop: 100
  },
  loading: {
    marginTop: 100,
    marginLeft: "50%",
  }
});

export default withStyles(styles)(Login);
