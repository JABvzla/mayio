import React, {Component} from "react";
import Connection from "../../Connection";
import { withStyles } from "material-ui/styles";
import TexField from "material-ui/TextField";
import Button from "material-ui/Button";
import Paper from "material-ui/Paper";
import List, { ListItem, ListItemText } from 'material-ui/List';

class Business extends Component {
  constructor(props){
    super(props);

    this.state = {
      business: [],
      name: ""
    };

    this.addBusiness = this.addBusiness.bind(this);
    this.onSelectBusiness = this.onSelectBusiness.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.getBusiness();
  }

  getBusiness() {
    Connection.call("user/"+localStorage.getItem("user"))
      .then(r=> this.setState({business:r.data.businesses}));
  }

  addBusiness() {
    var data = {
      users: localStorage.getItem("user"),
      name: this.state.name
    };

    Connection.call("business", data, "POST")
      .then(r=> this.getBusiness());
  }

  onSelectBusiness(business) {
    this.props.history.push({
      pathname: "/daily",
      state: { business: business }
    });
  }

  onNameChange = e => this.setState({name: e.target.value});

  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.paper} >
        <div>
          <TexField type="text" label="Nombre" style={{width:260, marginRight: 20}} onChange={this.onNameChange} />
          <Button onClick={this.addBusiness} variant="fab" color="primary">+</Button>
        </div>

        <List component="nav">
          {this.state.business.map((business,k)=>
            <ListItem button key={k} onClick={() => this.onSelectBusiness(business)}>
              <ListItemText primary={business.name} />
            </ListItem>
          )}
        </List>
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
    marginTop: '50%',
    transform: "translateY(-50%)"
  }
});

export default withStyles(styles)(Business);
