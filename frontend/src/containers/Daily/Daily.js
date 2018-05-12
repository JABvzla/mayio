import React, {Component} from "react";
import InputDaily from "./InputDaily";
import Table, { TableBody, TableCell, TableHead, TableRow } from "material-ui/Table";
import connection from "../../connection";
import axios from "axios";

class Daily extends Component {
  constructor(props){
    super(props);

    this.state = {
      dailys: [],
      accounts: [],
    };
    this.getDailys = this.getDailys.bind(this);
    this.getAccounts = this.getAccounts.bind(this);
    this.getAccounts();
    this.getDailys();
  }

  getAccounts() {
    axios.get(connection.auth("accountdefault"))
      .then(r=> this.setState({accounts: r.data }));
  }

  getDailys() {
    let data = {
      business: 1,
      date: "2018-05"
    };

    axios.get(connection.auth("daily"),{params:data})
      .then(r => this.setState({dailys: r.data}))
      .catch(e => console.log(e));

  }

  render() {

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
            {this.state.dailys.map((e,k) =>
              <TableRow key={k}>
                <TableCell component="th" scope="row">
                  {this.state.accounts.filter(a=>a.id === e.account)[0].name}
                </TableCell>
                <TableCell>{e.reference}</TableCell>
                <TableCell>{e.description}</TableCell>
                <TableCell>{e.balance}</TableCell>
                <TableCell>{e.balance}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <InputDaily business={1} date={"2018-05-09"} onRefresh={this.getDailys}/>
      </div>
    );
  }
}


export default Daily;
