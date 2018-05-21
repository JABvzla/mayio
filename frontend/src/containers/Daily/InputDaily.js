import React, {Component} from 'react';
import Connection from "../../Connection";
import { withStyles } from "material-ui/styles";
import Paper from "material-ui/Paper";
import TextField from "material-ui/TextField";
import { MenuItem } from 'material-ui/Menu';


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

    this.onAccountPress = this.onAccountPress.bind(this)
    this.onAddDaily = this.onAddDaily.bind(this);
    this.onAccountChange = this.onAccountChange.bind(this);
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
          // this.setState(this.initialState);
          this.setState({
            account: '',
            accountIndex: -1,
            accountSelected: [],
            suggest: [],
            suggestShow: false,
            reference: '',
            description: '',
            amount: this.state.amount*-1
          });
        });
    }
  }

  onAccountPress(e) {
    let select = this.state.accountIndex;

    if(!this.state.suggest.length){
      return false;
    }

    if(e.key === "ArrowUp") {
      select = (select <= 0) ? this.state.suggest.length - 1 : select - 1;
    }
    if(e.key === "ArrowDown") {
      select = (select >= this.state.suggest.length - 1) ? 0 : select + 1;
    }

    this.setState({accountIndex: select});

    if(e.key === "Enter" || e.key === "Tab"){
      let selected = this.state.suggest[select];
      this.setState({accountSelected: selected, account: selected.name, suggestShow: false});

    }
  }

  onAccountChange(e){
    const val = e.target.value;
    let suggest = this.props.accounts;

    val.split(' ').forEach( el =>
      suggest = suggest.filter( v =>
        v.name.split(' ').some(str=> str.toLowerCase().match(el.toLowerCase()))
      ));
    this.setState({suggest: suggest, account: val, accountIndex: 0, suggestShow: true});
  }
  onReferenceChange = (e) => this.setState({reference: e.target.value});
  onDescriptionChange = (e) => this.setState({description: e.target.value});
  onAmountChange = (e) => this.setState({amount: e.target.value});

  render() {
    const { classes } = this.props;

    return (
      <div>
        <div className={classes.inputDaily}>
          <TextField label="Cuenta"
                     className={classes.textField}
                     value={this.state.account}
                     autoFocus={true}
                     onChange={this.onAccountChange}
                     onKeyDown={this.onAccountPress}
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
          <Paper className={classes.suggest} style={{display: this.state.suggestShow? "block" : "none"}}>
            {this.state.suggest.map((suggest,k)=>
              <MenuItem key={k} selected={k===this.state.accountIndex}>{suggest.name}</MenuItem>
            )}
          </Paper>
        </div>
      </div>
    );
  }
}


const styles =  ({
  inputDaily: {
    display: "flex",
    width: "100%",
    position: "relative",
    marginBottom: 100,
  },
  textField: {
    margin: 10
  },
  suggest: {
    position: "absolute",
    backgroundColor: "#fff",
    width: 200,
    top: '100%'
  }
});

export default withStyles(styles)(InputDaily);
