import React, {Component} from 'react';
import {withStyles} from "material-ui/styles/index";
import TextField from "material-ui/TextField";
import Menu, { MenuItem } from "material-ui/Menu";
import Paper from "material-ui/Paper";
import Button from "material-ui/Button";


class DatePicker extends Component {
  constructor(props){
    super(props);

    this.state = {
      monthSelected: {name: "Enero",       id: "01"},
      menuMonth: false,
      menuTarget: null,
      yearSelected: (new Date()).getFullYear(),
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
  }

  showMonthMenu(e){
    this.setState({ menuMonth : true, menuTarget: e.currentTarget });
  }

  onSelectMonth(k){
    this.setState({ monthSelected: this.month[k], menuMonth: false });
  }

  onSearch() {
    this.props.onSelected(this.state.yearSelected + "/" + this.state.monthSelected.id + "/01");
  }

  onYearChange = e => this.setState({ yearSelected: e.target.value });

  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.datePaper}>
        <div className={classes.selectGrid}>
          <TextField label="Año" type="number" onChange={this.onYearChange} value={this.state.yearSelected}/>
          <Button variant={"raised"} onClick={this.showMonthMenu}
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
        <Button variant={"raised"}
                fullWidth
                color={"primary"}
                onClick={this.onSearch}
                >
          Buscar
        </Button>
      </Paper>
    );

  }
}

const styles = {
  datePaper: {
    margin: "100px auto",
    width: 340,
    height: 80,
    padding: 20,
    overflow: "hidden",
  },
  selectGrid: {
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    position: "relative",
  }
};


export default  withStyles(styles)(DatePicker);
