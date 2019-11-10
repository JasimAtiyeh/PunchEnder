import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class BasicsDate extends React.Component {
  constructor(props) {
    super(props);
    this.setDate = props.setDate;
    if (props.date) {
      const date = Date(props.date);
      this.state = { day: date.getDay(), month: date.getMonth() + 1, year: date.getFullYear() };
    } else {
      this.state = { day: undefined, month: undefined, year: undefined }
    }
    this.updateDay = this.updateDay.bind(this);
    this.updateMonth = this.updateMonth.bind(this);
    this.updateYear = this.updateYear.bind(this);
    this.currentYear = new Date().getFullYear();
  }

  updateDay(e) {
    this.setState({ day: e.target.value }, ()=> {
      if (this.state.day < 33 && this.state.day > 0) {
        this.updateFullDate();
      } else {
        return;
      }
    });
  }

  updateMonth(e) {
    this.setState({ month: e.target.value }, () => {
      if (this.state.month < 13 && this.state.month > 0) {
        this.updateFullDate();
      } else {
        return;
      }
    });
  }

  updateYear(e) {
    this.setState({ year: e.target.value }, () => {
      if (this.state.year >= this.currentYear) {
        this.updateFullDate();
      } else {
        return;
      }
    });
  }

  updateFullDate() {
    const { year, month, day } = this.state;
    if (!day || !month || !year) { return };
    const date = new Date(year, month - 1, day, 0, 0, 0, 0);
    if (date > new Date()) {
      this.setDate(date.toISOString());
    }
  }

  render() {
    const { date } = this.props;
    const currentDate = new Date();
    
    return (
      <div className="basics-form">
        <label>End Date</label>
        <div className="date-group">
          <div className="date-input-container">
            <input type="number" 
              min="1" step="1" max="12" 
              value={this.state.month || ''}
              onChange={this.updateMonth}
            />
            <span>Month</span>
          </div>
          <div className="date-input-container">
            <input type="number" 
              min="1" step="1" max="32" 
              value={this.state.day || ''}
              onChange={this.updateDay}
            />
            <span>Day</span>
          </div>
          <div className="date-input-container" id="year-container">
            <input type="number" 
              min="1" step="1" max="12"
              value={this.state.year || ''}
              onChange={this.updateYear}
            />
            <span>Year</span>
          </div>
          <div className="datepicker-container">
            <DatePicker id="date-picker"/>
            <i className="far fa-calendar-plus" 
              onClick={() => {
                const datePicker = document.getElementById('date-picker');
                datePicker.click();
              }} />
          </div>
        </div>
      </div>
    )
  }
};

export default BasicsDate;