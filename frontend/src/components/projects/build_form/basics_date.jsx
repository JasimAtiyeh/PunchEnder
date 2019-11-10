import React from 'react';

const BasicsDate = props => {
  const currentDate = new Date();
  console.dir(currentDate.getMonth());
  return (
    <div className="basics-form">
      <label>End Date</label>
      <div className="date-group">
        <input type="number" min="1" step="1" max="12" />
        <input type="number" min="1" step="1" max="32" />
        <input type="number" min="1" step="1" max="12" />
      </div>
    </div>
  )
};

export default BasicsDate;