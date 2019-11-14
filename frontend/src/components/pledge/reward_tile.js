import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import Mutations from "../../graphql/mutations";

class RewardTile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      pledge: this.props.reward.pledgeAmount
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(field) {
    return e => this.setState({ [field]: e.currentTarget.value });
  }

  handleSubmit() {
    const { loading, error, data } = useMutation(
      Mutations.PLEDGE_PROJECT_REWARD,
      { variables: {
        user_id: localStorage.userId,
        project_id: this.props.project._id,
        reward_id: this.props.reward._id,
        pledgeAmount: this.state.pledge
      } }
    );
    if (loading) { return <div>Loading...</div>};
    if (error) { return <div>Error!</div> };
    // redirect to the project show page
  }

  render() {
    return (
      <div>
        <div>
          <input
            type='radio'
            name='pledge'
            onChange={() => this.setState({ show: !this.state.show })}></input>
          <div>
            <div>${this.props.reward.pledgeAmount} or more</div>
            <div>{this.props.reward.name}</div>
            <div>{this.props.reward.description}</div>
          </div>
        </div>
        { this.state.show && <div>
          <div>
            Pledge amount
          </div>
          <div>
            <i className="fas fa-dollar-sign"></i>
            <input
              type='number'
              value={this.state.pledge}
              onChange={this.update('pledge')}></input>
            <input
              type='submit'
              value='Pledge'
              onSubmit={this.handleSubmit}></input>
          </div>
        </div>}
      </div>
    )
  }
}

export default RewardTile;