import React from 'react';

class RewardsForm extends React.Component {
  constructor(props) {
    super(props);
    this.container = React.createRef();
    this.scrollToForm = this.scrollToForm.bind(this);
  }

  componentDidMount() {
    this.scrollToForm();
  }

  scrollToForm() { 
    window.scrollTo(0, this.container.current.offsetTop - 100)  
  }

  render() {
    const { tier, name, description, pledgeAmount, setName, setPledgeAmount, setDescription } = this.props;
    const message = tier > 1 ? 
      "The more rewards, the better. Help promote your cause by adding rewards that speak to the hearts of your backers."
      : "Offer rewards to congratulate backers on picking and supporting your wonderful cause."

    return (
      <div className="reward-form-container" ref={this.container}>
        <h2>Add a tier {this.props.tier} reward</h2>
        <span>{message}</span>
        <form className="reward-form" onSubmit={e => e.preventDefault()}>
          <div>
            <label>Title</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} />
            <label>Pledge Amount</label>
            <div className="reward-input-group">
              <div className="reward-input-group-sign">$</div>
              <input type="number" value={pledgeAmount} onChange={e => setPledgeAmount(e.target.value)} />
            </div>
            <label>Description</label>
            <textarea maxLength={135} value={description} onChange={e => setDescription(e.target.value)} />
          </div>
        </form>
      </div>
    )
  }
};

export default RewardsForm;