import React, {Component} from "react";
import Connection from "../../Connection";
import ReactToPrint from "react-to-print";
import "./major.css";
import Button from "material-ui/Button";

class Major extends Component {

  constructor(props){
    super(props);
    this.state = {
      major : null
    };
    const locationState = this.props.history.location.state;
    this.business = locationState.business;
    this.account = locationState.account;
    this.startdate = locationState.startDate;
    this.enddate = locationState.endDate;
    this.accountName = "Banco de Venezuela";

    this.getMajor();
    this.key = 0;
  }

  getMajor(){
    const data = {
      business: this.business,
      account: this.account,
      startdate: this.startdate,
      enddate: this.enddate
    };

    Connection.call("major", data, "GET")
      .then(r => this.setState({major: r.data}));
  }

  getRows(){
    const data = this.state.major;
    let rows = [];

    rows.push(<tr key={this.key++}><td> </td><td> </td><td className={"textRight"}>Saldo Anterior : </td><td> </td><td> </td><td>{data["beforeBalance"]}</td></tr>);
    for(let daily in data){

      if(Array.isArray(data[daily])){
        rows = this.addRows(data[daily], rows, daily);
      }
    }
    return rows;
  }

  addRows(arr, rows, daily){
    rows.push(<tr key={this.key++}><td> </td></tr>);
    rows.push(<tr key={this.key++}><td>{daily}</td></tr>);

    let totalCredits = 0, totalDebits = 0;
    arr.map(e => {
      rows.push(
        <tr key={this.key++}>
          <td> </td>
          <td>{e.reference}</td>
          <td>{e.description}</td>
          <td>{e.credits}</td>
          <td>{e.debits}</td>
          <td>{e.total}</td>
        </tr>
      );
      totalCredits += e.debits;
      totalDebits += e.credits;
      return null;
    });

    rows.push(
      <tr key={this.key++}>
        <td> </td>
        <td> </td>
        <td className={"textRight"}>Total {daily} : </td>
        <td >{totalDebits}</td>
        <td >{totalCredits}</td>
        <td >{totalDebits + totalCredits}</td>
      </tr>
    );

    return rows;
  }
  render() {
    if(!this.state.major){
      return <div>Cargando...</div>;
    }

    return (
      <div>
        <ReactToPrint
          trigger={() => <Button color="primary" variant="raised">Imprimir</Button>}
          content={() => this.componentRef}
        />
        <div ref={el => (this.componentRef = el)}>
          <div className={"title"}>
            <h3>Major Analitico</h3>
            <span>Desde el {this.startdate} hasta el {this.enddate}</span>
            <span>Cuenta: {this.accountName}</span>
          </div>
          <table className={"major"}>
            <thead>
              <tr>
                <td>Fecha</td>
                <td>Referencia</td>
                <td>Descripcion</td>
                <td>Debe</td>
                <td>Haber</td>
                <td>Total</td>
              </tr>
            </thead>
            <tbody>
              {this.getRows()}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Major;
