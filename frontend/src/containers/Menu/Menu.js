import React, {Component} from "react";
import DatePicker from "../../components/DatePicker";
import Business from "../Business";

class Menu extends Component {

  constructor(props) {
    super(props);
    const location = this.props.history.location;
    let businessId = (location.state && location.state.business)? location.state.business : 0;

    this.state = {
      business: businessId,
    };

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

  render() {
    if(!this.state.business) return <Business onSelect={this.onSelectBusiness}/>;

    return (
      <div>
        <DatePicker title={"Asiento de Diario"} actionName={"Entrar"} onSelected={this.toDaily}/>
        <DatePicker title={"Mayor Analitico"} actionName={"Ver"} withDateEnd={true} onSelected={this.toMajor} />
        <DatePicker title={"Balance de Comprobación"} actionName={"Ver"} onSelected={this.toCheckUp}/>
      </div>
    );
  }
}

export default Menu;
