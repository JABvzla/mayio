import React, {Component} from 'react';
import {withStyles} from "material-ui/styles/index";
import TextField from "material-ui/TextField";
import Menu, { MenuItem } from "material-ui/Menu";
import Button from "material-ui/Button";

class DatePicker extends Component {
  constructor(props){
    super(props);

    this.state = {
      monthSelected: {name: "Enero", id: "01"},
      menuMonth: false,
      menuTarget: null,
      yearSelected: (new Date()).getFullYear(),

      monthEndSelected: {name: "Enero", id: "01"},
      yearEndSelected: (new Date()).getFullYear(),
      menuMonthEnd: false,
      menuTargetEnd: null,
    };

    this.month = [
      {name: "Enero",      id: "01"},
      {name: "Febrero",    id: "02"},
      {name: "Marzo",      id: "03"},
      {name: "Abril",      id: "04"},
      {name: "Mayo",       id: "05"},
      {name: "Junio",      id: "06"},
      {name: "Julio",      id: "07"},
      {name: "Agosto",     id: "08"},
      {name: "Septiembre", id: "09"},
      {name: "Octubre",    id: "10"},
      {name: "Noviembre",  id: "11"},
      {name: "Diciembre",  id: "12"},
    ];

    this.onSearch = this.onSearch.bind(this);
    this.showMonthMenu = this.showMonthMenu.bind(this);
    this.showMonthMenuEnd = this.showMonthMenuEnd.bind(this);
  }

  showMonthMenu(e){
    this.setState({ menuMonth : true, menuTarget: e.currentTarget });
  }
  showMonthMenuEnd(e){
    this.setState({ menuMonthEnd : true, menuTargetEnd: e.currentTarget });
  }
  onSelectMonth(k){
    this.setState({ monthSelected: this.month[k], menuMonth: false });
  }
  onSelectMonthEnd(k){
    this.setState({ monthEndSelected: this.month[k], menuMonthEnd: false });
  }

  onSearch() {
    const dateStart = this.state.yearSelected + "/" + this.state.monthSelected.id + "/01";
    const dateEnd = this.state.yearEndSelected + "/" + this.state.monthEndSelected.id + "/01"
    this.props.onSelected(dateStart, dateEnd);
  }

  onYearChange = e => this.setState({ yearSelected: e.target.value });
  onYearEndChange = e => this.setState({ yearEndSelected: e.target.value });

  render() {
    const { classes, actionName, withDateEnd } = this.props;

    return (
      <div>
        <div className={classes.selectGrid}>
          <TextField label={withDateEnd? "Fecha inicio" : "Fecha"} type="number" onChange={this.onYearChange} value={this.state.yearSelected}/>
          <Button variant={"raised"} onClick={this.showMonthMenu}
                  className={classes.monthButton}
                  aria-owns={this.state.menuTarget ? 'month-menu' : null}
                  aria-haspopup="true">
            {this.state.monthSelected.name? this.state.monthSelected.name : "Mes"}
          </Button>
          <Menu open={this.state.menuMonth} id="month-menu"  anchorEl={this.state.menuTarget}  className={classes.menu}>
            {this.month.map((m,k) =>
              <MenuItem key={k} onClick={() => this.onSelectMonth(k)}>{m.name}</MenuItem>
            )}
          </Menu>
        </div>

        {withDateEnd ?
          <div className={classes.selectGrid}>
            <TextField label="Fecha fin" type="number" onChange={this.onYearEndChange} value={this.state.yearEndSelected}/>
            <Button variant={"raised"} onClick={this.showMonthMenuEnd}
                    className={classes.monthButton}
                    aria-owns={this.state.menuTargetEnf ? 'month-end-menu' : null}
                    aria-haspopup="true">
              {this.state.monthEndSelected.name ? this.state.monthEndSelected.name : "Mes"}
            </Button>
            <Menu open={this.state.menuMonthEnd} id="month-end-menu" anchorEl={this.state.menuTargetEnd} className={classes.menu}>
              {this.month.map((m, k) =>
                <MenuItem key={k} onClick={() => this.onSelectMonthEnd(k)}>{m.name}</MenuItem>
              )}
            </Menu>
          </div>
          : null
        }

        <Button variant={"raised"}
                fullWidth
                color={"primary"}
                onClick={this.onSearch}
                >
          {actionName}
        </Button>
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


export default  withStyles(styles)(DatePicker);
