import React, {Component} from 'react';
import connection from "../../connection";
import axios from "axios";
import TextField from "material-ui/TextField";

class InputDaily extends Component {
  constructor(props){
    super(props);

    this.state = {
      account: 1,
      reference: '0124',
      description: 'descripcion',
      balance: 160000000,
    };

    this.onAddDaily = this.onAddDaily.bind(this);
    this.onAccountChange = this.onAccountChange.bind(this);
    this.onReferenceChange = this.onReferenceChange.bind(this);
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
    this.onBalanceChange = this.onBalanceChange.bind(this);
  }

  onAddDaily(e) {
    if(e.key==="Enter"){
      var data = {
        business: this.props.business,
        date: this.props.date,
        account: this.state.account,
        reference: this.state.reference,
        description: this.state.description,
        balance: this.state.balance,
      };

      axios.post(connection.auth('daily'),data)
        .then(r=> this.props.onRefresh());
    }
  }

  onAccountChange = (e) => this.setState({account: e.target.value});
  onReferenceChange = (e) => this.setState({reference: e.target.value});
  onDescriptionChange = (e) => this.setState({description: e.target.value});
  onBalanceChange = (e) => this.setState({balance: e.target.value});

  render() {
    return (
      <div>
        <TextField label="Cuenta" onChange={this.onAccountChange} />
        <TextField label="Referencia" onChange={this.onReferenceChange} />
        <TextField label="Descripcion" onChange={this.onDescriptionChange} />
        <TextField label="Debe" onChange={this.onBalanceChange } />
        <TextField label="Haber" onChange={this.onBalanceChange } onKeyPress={this.onAddDaily} />
      </div>
    );
  }
}


export default InputDaily;
