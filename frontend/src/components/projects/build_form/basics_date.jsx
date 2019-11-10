import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class BasicsDate extends React.Component {
  constructor(props) {
    super(props);
    this.setDate = props.setDate;
    if (props.date) {
      const date = new Date(props.date);
      console.dir(date);
      this.state = { day: date.getDate(), month: date.getMonth() + 1, year: date.getFullYear(), error: {} };
    } else {
      this.state = { day: undefined, month: undefined, year: undefined, error: {} }
    }
    this.updateDay = this.updateDay.bind(this);
    this.updateMonth = this.updateMonth.bind(this);
    this.updateYear = this.updateYear.bind(this);
    this.currentYear = new Date().getFullYear();
    this.handleCalendar = this.handleCalendar.bind(this);
  }

  updateDay(e) {
    this.setState({ day: e.target.value }, ()=> {
      if (this.state.day < 33 && this.state.day > 0) {
        this.updateFullDate();
        this.setState({ error: { day: null } })
      } else {
        this.setState({ error: { day: "Select a valid day!"}})
      }
    });
  }

  updateMonth(e) {
    this.setState({ month: e.target.value }, () => {
      if (this.state.month < 13 && this.state.month > 0) {
        this.updateFullDate();
        this.setState({ error: { month: null } })
      } else {
        this.setState({ error: { month: "Select a valid month!" } });
      }
    });
  }

  updateYear(e) {
    this.setState({ year: e.target.value }, () => {
      this.updateFullDate();
    });
  }

  updateFullDate() {
    const { year, month, day } = this.state;
    if (!day || !month || !year) { return };

    const date = new Date(year, month - 1, day, 0, 0, 0, 0);
    const timeDiff = date.getTime() - new Date().getTime();
    const dayDiff = timeDiff / (1000 * 3600 * 24);

    if (dayDiff < 0) {
      this.setState({ error: { date: "You must select a future date!" } });
    } else if (dayDiff > 60) {
      this.setState({ error: { date: "Cannot be past 60 days!" } })
    } else {
      this.setDate(date.toISOString());
      this.props.setNeedSave(true);
      this.setState({ error: { date: null } } );
    }
  }

  handleCalendar(date) {
    if (date > new Date()) {
      this.setState({ 
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear() 
      }, () => this.updateFullDate());
    }
  }

  render() {
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
            <DatePicker 
              id="date-picker"
              onChange={this.handleCalendar}
              selected={ this.props.date ? Date.parse(this.props.date) : new Date() }
            />
            <i className="far fa-calendar-plus" 
              onClick={() => {
                const datePicker = document.getElementById('date-picker');
                datePicker.click();
              }} />
          </div>
        </div>
        <div className="date-error">
          { Object.values(this.state.error).find(err => err !== null) }
        </div>
      </div>
    )
  }
};

export default BasicsDate;