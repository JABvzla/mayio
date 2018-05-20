import React, {Component} from 'react';
import Connection from "../../Connection";
import { withStyles } from "material-ui/styles";
import TextField from "material-ui/TextField";


class InputDaily extends Component {
  constructor(props){
    super(props);
    this.initialState = {
      account: '',
      reference: '',
      description: '',
      debit: 0,
      credit: 0,
    };
    this.state = this.initialState;

    this.onAddDaily = this.onAddDaily.bind(this);
    this.onAccountChange = this.onAccountChange.bind(this);
    this.onReferenceChange = this.onReferenceChange.bind(this);
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
    this.onDebitChange = this.onDebitChange.bind(this);
    this.onCreditChange = this.onCreditChange.bind(this);
  }

  onAddDaily(e) {
    if(e.key==="Enter"){
      const data = {
        business: this.props.business,
        date: this.props.date,
        account: this.state.account,
        reference: this.state.reference,
        description: this.state.description,
        balance: this.state.credit? this.state.credit : this.state.debit,
      };

      Connection.call("daily", data, "POST")
        .then(r=>{
          this.props.onRefresh();
          this.setState(this.initialState);
        });
    }
  }

  onAccountChange = (e) => this.setState({account: e.target.value});
  onReferenceChange = (e) => this.setState({reference: e.target.value});
  onDescriptionChange = (e) => this.setState({description: e.target.value});
  onDebitChange = (e) => this.setState({debit: e.target.value});
  onCreditChange = (e) => this.setState({credit: e.target.value});

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.inputDaily}>
        <TextField className={classes.textField} label="Cuenta" value={this.state.account} autoFocus={true}  onChange={this.onAccountChange} />
        <TextField className={classes.textField} label="Referencia" value={this.state.reference} onChange={this.onReferenceChange} />
        <TextField className={classes.textField} label="Descripcion" value={this.state.description} onChange={this.onDescriptionChange} />
        <TextField className={classes.textField} label="Debe" value={this.state.debit} type="number" onChange={this.onDebitChange } disabled={this.state.credit} onKeyPress={this.onAddDaily} />
        <TextField className={classes.textField} label="Haber" value={this.state.credit} type="number" onChange={this.onCreditChange } disabled={this.state.debit} onKeyPress={this.onAddDaily} />
      </div>
    );
  }
}


const styles =  ({
  inputDaily: {
    display: "flex",
    width: "100%",
  },
  textField: {
    margin: 10
  }
});

export default withStyles(styles)(InputDaily);
