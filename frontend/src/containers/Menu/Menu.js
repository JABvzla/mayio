import React, {Component} from "react";
import DatePicker from "../../components/DatePicker";
import Business from "../Business";
import { withStyles } from "material-ui/styles";
import Paper from "material-ui/Paper";
import AccountPicker from "../../components/AccountPicker";

class Menu extends Component {

  constructor(props) {
    super(props);
    const location = this.props.history.location;
    let businessId = (location.state && location.state.business)? location.state.business : 0;

    this.state = {
      business: businessId,
      account: 0,
    };

    this.onAccountSelect = this.onAccountSelect.bind(this);
    this.onSelectBusiness = this.onSelectBusiness.bind(this);
    this.toDaily = this.toDaily.bind(this);
    this.toMajor = this.toMajor.bind(this);
    this.toCheckUp = this.toCheckUp.bind(this);
  }


  onSelectBusiness(business){
    this.setState({business: business.id});
  }

  toDaily(e){
    this.props.history.push({
      pathname: "/daily",
      state: { business: this.state.business, date: e}
    });
  }

  toMajor(start, end){
    this.props.history.push({
      pathname: "/major",
      state: {
        business: this.state.business,
        account: this.state.account,
        startDate: start,
        endDate: end
      }
    });
  }

  toCheckUp(e){
    this.props.history.push({
      pathname: "/checkup",
      state: {
        business: this.state.business,
        endDate: e
      }
    });
  }

  onAccountSelect(account){
    this.setState({ account: account.id})
  }

  render() {
    if(!this.state.business) return <Business onSelect={this.onSelectBusiness}/>;

    const { classes } = this.props;

    return (
      <div>
        <Paper className={classes.datePaper}>
          <h3 className={classes.title}>Asiento de Diario</h3>
          <DatePicker actionName={"Entrar"} onSelected={this.toDaily}/>
        </Paper>
        <Paper className={classes.datePaper}>
          <h3>Mayor Analitico</h3>
          <AccountPicker onSelected={this.onAccountSelect} />
          <DatePicker actionName={"Ver"} withDateEnd={true} onSelected={this.toMajor} />
        </Paper>
        <Paper className={classes.datePaper}>
          <DatePicker title={"Balance de Comprobación"} actionName={"Ver"} onSelected={this.toCheckUp}/>
        </Paper>
      </div>
    );
  }
}

const styles = {
  datePaper: {
    margin: "50px auto",
    width: 340,
    padding: 20,
    overflow: "hidden",
  },
  selectGrid: {
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    position: "relative",
  },
  title: {
    marginTop: 0,
    marginBottom: 20,
    textAlign: "center"
  },
  monthButton: {
    minWidth: 122,
    maxWidth: 122
  }
};

export default withStyles(styles)(Menu);
