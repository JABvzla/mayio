import React, {Component} from "react";
import Connection from "../../Connection";
import ReactToPrint from "react-to-print";
import "./checkup.css";
import Button from "material-ui/Button";

class Checkup extends Component {

  constructor(props){
    super(props);
    this.state = {
      checkup : null
    };

    const locationState = this.props.history.location.state;
    this.business = locationState.business;
    this.enddate = locationState.endDate;

    this.getCheckup();

  }

  getCheckup(){
    const data = {
      business: this.business,
      enddate: this.enddate
    };

    Connection.call("checkup", data, "GET")
      .then(r => this.setState({checkup: r.data}) );
  }

  getRows(){
    const data = this.state.checkup;
    let rows = [];
    let key = 0;

    for(let account in data){
      if(Array.isArray(data[account])){
        data[account].map(e => {
          rows.push(
            <tr key={key++}>
              <td>{e.name}</td>
              <td>{e.balanceBefore}</td>
              <td>{e.credits}</td>
              <td>{e.debits}</td>
              <td>{e.totalMonth}</td>
              <td>{e.total}</td>
            </tr>
          );
          return null;
        });
      }
    }
    return rows;
  }

  render() {
    if(!this.state.checkup){
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
            <h3>Balance de Comprobación</h3>
            <span>Hasta el {this.enddate}</span>
          </div>
          <table className={"checkup"}>
            <thead>
              <tr>
                <td>Cuenta</td>
                <td>Saldo Anterior</td>
                <td>Debe</td>
                <td>Haber</td>
                <td>Total Mes</td>
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

export default Checkup;
