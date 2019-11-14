import React from 'react';

class RewardsEditForm extends React.Component {
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
    const { name, description, pledgeAmount, setName, setPledgeAmount, setDescription } = this.props;
    const message = "If you made a mistake with your reward, now is the time to fix it. Remember that you can't change rewards after your project launches!";

    return (
      <div className="reward-form-container" ref={this.container}>
        <h2>Edit your tier {this.props.tier} reward</h2>
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

export default RewardsEditForm;