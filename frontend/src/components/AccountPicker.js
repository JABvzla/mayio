import React, {Component} from "react";
import { withStyles } from "material-ui/styles";
import Connection from "../Connection";
import Paper from "material-ui/Paper";
import { MenuItem } from "material-ui/Menu";
import TextField from "material-ui/TextField";
import Button from "material-ui/Button";
import Dialog, {
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText
} from "material-ui/Dialog";

class AccountPicker extends Component {

  constructor(props) {
    super(props);

    this.state = {
      account: "",
      accounts: [],
      accountIndex: -1,
      accountSelected: [],
      suggest: [],
      suggestShow: false,
      dialog: false,
    };

    this.getAccounts();

    this.onAccountPress = this.onAccountPress.bind(this);
    this.onAccountChange = this.onAccountChange.bind(this);
    this.onDialogClose = this.onDialogClose.bind(this);
    this.addAccount = this.addAccount.bind(this);
  }

  getAccounts() {
    Connection.call("account")
      .then(r=>{
        this.setState({accounts: r.data });
      });
  }

  addAccount(){
    const data = {
      name: this.state.account,
      section: 1,
    };

    Connection.call("account", data, "POST")
      .then(r=>{
        this.setState({accountSelected: [], account:"", suggestShow: false, accountIndex: -1});
        this.getAccounts();
        this.onDialogClose();
      });

  }

  onAccountPress(e) {
    let select = this.state.accountIndex;
    if(e.key === "Enter" && this.props.canAdd){
      this.setState({dialog: true});
    }
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

    if(e.key === "Tab"){
      let selected = this.state.suggest[select];
      this.setState({accountSelected: selected, account: selected.name, suggestShow: false});
      this.props.onSelected(selected);
    }
    if(e.key === "Escape"){
      this.setState({
        account: "",
        suggestShow: false
      });
    }
  }

  onAccountChange(e){
    const val = e.target.value;
    let suggest = this.state.accounts;

    val.split(" ").forEach( el =>
      suggest = suggest.filter( v =>
        v.name.split(" ").some(str=> str.toLowerCase().match(el.toLowerCase()))
      ));
    this.setState({suggest: suggest, account: val, accountIndex: 0, suggestShow: true});
    if(this.props.onChange) this.props.onChange(e);
  }

  onDialogClose(){
    this.setState({dialog: false});
  }

  render() {
    const { classes, fullWidth } = this.props;

    return (
      <div>
        <Dialog
          open={this.state.dialog}
          onClose={this.onDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Agregar Cuenta</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              ¿ Seguro que desea agregar la cuenta '{this.state.account}' ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.onDialogClose} color="primary">
              Cancelar
            </Button>
            <Button onClick={this.addAccount} color="primary">
              Agregar
            </Button>
          </DialogActions>
        </Dialog>
        <TextField label="Cuenta"
          className={classes.textField}
          value={this.state.account}
          autoFocus={true}
          onChange={this.onAccountChange}
          onKeyDown={this.onAccountPress}
        />
        <Paper className={classes.suggest} style={{display: this.state.suggestShow? "block" : "none", position: fullWidth? "absolute" : ""}}>
          {this.state.suggest.map((suggest,k)=>
            <MenuItem key={k} selected={k===this.state.accountIndex}>{suggest.name}</MenuItem>
          )}
        </Paper>
      </div>
    );
  }
}

const styles =  ({
  textField: {
    margin: 10
  },
  suggest: {
    backgroundColor: "#fff",
    width: "100%",
    top: "101%"
  }
});


export default withStyles(styles)(AccountPicker);
