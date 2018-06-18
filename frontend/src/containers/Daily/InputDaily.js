import React, {Component} from 'react';
import Connection from "../../Connection";
import { withStyles } from "material-ui/styles";
import TextField from "material-ui/TextField";
import AccountPicker from "../../components/AccountPicker";

class InputDaily extends Component {
  constructor(props){
    super(props);

    this.state = {
      account: '',
      accountIndex: -1,
      accountSelected: [],
      suggest: [],
      suggestShow: false,
      reference: '',
      description: '',
      amount: 0,
    };

    this.accountTarget = null;

    this.onAccountChange = this.onAccountChange.bind(this);
    this.onAccountSelect = this.onAccountSelect.bind(this);
    this.onAddDaily = this.onAddDaily.bind(this);
    this.onReferenceChange = this.onReferenceChange.bind(this);
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
    this.onAmountChange = this.onAmountChange.bind(this);
  }

  onAddDaily(e) {
    if(e.key==="Enter"){
      const data = {
        business: this.props.business,
        date: new Date(this.props.date),
        account: this.state.accountSelected.id,
        reference: this.state.reference,
        description: this.state.description,
        balance: this.state.amount,
      };
      Connection.call("daily", data, "POST")
        .then(r=>{
          this.props.onRefresh(this.props.date);
          this.setState({
            account: '',
            accountIndex: -1,
            accountSelected: [],
            suggest: [],
            suggestShow: false,
            reference: '',
            description: '',
            amount: (this.state.amount<=0)? 0 : this.state.amount*-1
          });
          this.accountTarget.focus();
        });
    }
  }
  onAccountChange(e) {
    this.accountTarget = e.target;
  }
  onAccountSelect(selected) {
    this.setState({accountSelected: selected, account: selected.name});
  }


  onReferenceChange = (e) => this.setState({reference: e.target.value});
  onDescriptionChange = (e) => this.setState({description: e.target.value});
  onAmountChange = (e) => this.setState({amount: e.target.value});

  render() {
    const { classes } = this.props;

    return (
      <div>
        <div className={classes.inputDaily}>
          <AccountPicker fullWidth
                         canAdd
                         onSelected={this.onAccountSelect}
                         onChange={this.onAccountChange}
          />
          <TextField label="Referencia"
                     className={classes.textField}
                     value={this.state.reference}
                     onChange={this.onReferenceChange}
          />
          <TextField label="Descripcion"
                     className={classes.textField}
                     value={this.state.description}
                     onChange={this.onDescriptionChange}
          />
          <TextField label="Monto"
                     className={classes.textField}
                     value={this.state.amount}
                     type="number"
                     onChange={this.onAmountChange }
                     onKeyPress={this.onAddDaily}
          />
        </div>
      </div>
    );
  }
}


const styles =  ({
  inputDaily: {
    display: "flex",
    justifyContent: "space-around",
    width: "100%",
    position: "relative",
    marginBottom: 100,
  },
  textField: {
    margin: 10
  },
});

export default withStyles(styles)(InputDaily);
