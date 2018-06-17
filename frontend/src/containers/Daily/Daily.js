import React, {Component} from "react";
import Connection from "../../Connection";
import InputDaily from "./InputDaily";
import { withStyles } from "material-ui/styles";
import Table, { TableBody, TableCell, TableHead, TableRow } from "material-ui/Table";
import Paper from "material-ui/Paper";
import Button from "material-ui/Button";

class Daily extends Component {
  constructor(props){
    super(props);
    if(this.props.history.location.state && this.props.history.location.state.business) {
      this.state = {
        business: this.props.history.location.state.business,
        date: this.props.history.location.state.date,
        dailys: [],
        accounts: [],
      };
      this.getAccounts();
      this.getDailys = this.getDailys.bind(this);
      this.toMenu = this.toMenu.bind(this);
    }else{
      this.props.history.push("/");
    }
  }

  getAccounts() {
    Connection.call("account")
      .then(r=>{
        this.setState({accounts: r.data });
        this.getDailys();
      });
  }

  getDailys() {
    let data = {
      business: this.state.business,
      date: this.state.date,
    };
    Connection.call("daily", data, "GET")
      .then(r => this.setState({dailys: r.data}));
  }

  toMenu(){
    this.props.history.push({
      pathname: "/",
      state: { business: this.state.business}
    });

  }
  render() {
    const { classes } = this.props;
    if(!this.state) return null;

    return (
      <Paper className={classes.paper}>
        <Button variant={"raised"} onClick={this.toMenu}>Menu</Button>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Cuenta</TableCell>
              <TableCell>Referencia</TableCell>
              <TableCell>Descripcion</TableCell>
              <TableCell>Monto</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.dailys.map((daily,k) =>
              <TableRow key={k} className={classes.row}>
                <TableCell component="th" scope="row">
                  {this.state.accounts.filter(a=>a.id === daily.account)[0].name}
                </TableCell>
                <TableCell>{daily.reference}</TableCell>
                <TableCell>{daily.description}</TableCell>
                <TableCell>{daily.balance}</TableCell>
              </TableRow>
            )}
          </TableBody>

        </Table>

        <InputDaily business={this.state.business} date={this.state.date} accounts={this.state.accounts} onRefresh={this.getDailys}/>
      </Paper>
    );
  }
}

const styles = {
  paper:{
    maxWidth: 1000,
    margin: "100px auto"
  },
  row: {
    "&:nth-of-type(even)": {
      backgroundColor: "#F8F8F8",
    },
  }
};

export default withStyles(styles)(Daily);
