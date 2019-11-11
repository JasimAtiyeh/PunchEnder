import React from 'react';

class RewardsForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <form className="reward-form" onSubmit={e => e.preventDefault()}>
          <label>Title</label>
          <input type="text" />
          <label>Pledge Amount</label>
          <input type="number" />
          <label>Description</label>
          <textarea></textarea>
        </form>
      </div>
    )
  }
};

export default RewardsForm;