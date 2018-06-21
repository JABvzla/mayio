import React, {Component} from 'react';
import Connection from "../../Connection";
import { withStyles } from "material-ui/styles";
import Paper from "material-ui/Paper";
import List, { ListItem } from "material-ui/List";
import Button from "material-ui/Button";
import TextField from "material-ui/TextField";
import Icon from "material-ui/Icon";

class Accounts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accountSections: [],
      sectionName: '',
    };

    this.sectionTarget = {};
    this.addSection = this.addSection.bind(this);
  }

  componentWillMount(){
    this.getAccountSections();
  }

  getAccountSections(){
    Connection.call("accountsection")
    .then(r => this.setState({accountSections: r.data}));
  }

  addSection(){
    const data = {
      name: this.state.sectionName
    };

    console.log(data);
    Connection.call("accountsection", data, "POST")
    .then(()=> this.getAccountSections());
  }

  addAccount(name,section){
    const data = {
      name: name,
      section: section
    };

    Connection.call("account", data, "POST")
    .then(()=> this.getAccountSections());
  }

  onSectionChange = e => this.setState({sectionName: e.target.value});

  render() {
    const { classes } = this.props;
    let key = 0;

    return ([
      <Button key={key++} variant="raised" onClick={() => this.props.history.goBack()}>Volver</Button>,
      <Paper className={classes.paper} key={key++}>
        <h2 className={classes.title}>Secciones y Cuentas</h2>
        <div>
          <TextField type="text" label="Sección"
                     className={classes.sectionText}
                     onChange={this.onSectionChange} />
          <Button onClick={this.addSection} variant="fab" color="primary">
            <Icon>add_icon</Icon>
          </Button>
        </div>

        <List component="nav" className={classes.list}>
        {this.state.accountSections.map(section =>
        <div key={key++}>
          {section.name}
          <ListItem key={key++}>
            <TextField label="Cuenta"
                       onChange={e => this.sectionTarget[section.id] = e.target} />
            <Button variant="fab" mini color="primary"
                    onClick={() => this.addAccount(this.sectionTarget[section.id].value, section.id)}
                    className={classes.accountButton}>
              <Icon>add_icon</Icon>
            </Button>
          </ListItem>
          <List>
            {section.accounts.map(account =>
              <ListItem key={key++}>{account.name}</ListItem>
            )}
          </List>
        </div>
        )}
        </List>
      </Paper>
    ]);
  }
}

const styles =  ({
  paper: {
    maxWidth: 350,
    minHeight: 300,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    padding: 20,
    margin: 'auto',
    marginTop: 100,
  },
  title:{
    margin: '15px auto',
  },
  list:{
    height: 500,
    maxHeight: 500,
    overflowY: "scroll",
    overflowX: "hidden",
  },
  sectionText: {
    width: 250,
    marginRight: 20
  },
  accountButton: {
    marginLeft: 10,
  }
});

export default withStyles(styles)(Accounts);
