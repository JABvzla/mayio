import React, {Component} from "react";
import InputDaily from "./InputDaily";
import Table, { TableBody, TableCell, TableHead, TableRow } from "material-ui/Table";
import Connection from "../../Connection";

class Daily extends Component {
  constructor(props){
    super(props);
    if(this.props.history.location.state && this.props.history.location.state.business) {
      this.state = {
        business: this.props.history.location.state.business,
        dailys: [],
        accounts: [],
      };
      this.getDailys = this.getDailys.bind(this);
      this.getAccounts = this.getAccounts.bind(this);
      this.getAccounts();
      this.getDailys();
    }else{
      this.props.history.push("/");
    }
  }

  getAccounts() {
    Connection.call("accountdefault")
      .then(r=> this.setState({accounts: r.data }));
  }

  getDailys() {
    let data = {
      business: this.state.business.id,
      date: "2018-05"
    };
    Connection.call("daily", data, "GET")
      .then(r => this.setState({dailys: r.data}));
  }

  render() {
    if(!this.state) return null;
    //
    // console.log(this.state.dailys);
    // console.log(this.state.business);


    return (
      <div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Cuenta</TableCell>
              <TableCell>Referencia</TableCell>
              <TableCell>Descripcion</TableCell>
              <TableCell>Debe</TableCell>
              <TableCell>Haber</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.dailys.map((daily,k) =>
              <TableRow key={k}>
                <TableCell component="th" scope="row">
                  {this.state.accounts.filter(a=>a.id === daily.account)[0].name}
                </TableCell>
                <TableCell>{daily.reference}</TableCell>
                <TableCell>{daily.description}</TableCell>
                <TableCell>{daily.balance}</TableCell>
                <TableCell>{daily.balance}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <InputDaily business={this.state.business.id} date={"2018-05-09"} onRefresh={this.getDailys}/>
      </div>
    );
  }
}


export default Daily;
