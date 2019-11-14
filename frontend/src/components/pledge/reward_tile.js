import React from 'react';
import { Mutation } from "react-apollo";
import Mutations from "../../graphql/mutations";

class RewardTile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      pledge: this.props.reward.pledgeAmount
    };
  }

  update(field) {
    return e => this.setState({ [field]: e.currentTarget.value });
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
            <Mutation mutation={Mutations.PLEDGE_PROJECT}>
              {PLEDGE_PROJECT => (
                <input
                  type='submit'
                  value='Pledge'
                  onClick={e => {
                    e.preventDefault();
                    PLEDGE_PROJECT({
                      variables: {
                        user_id: localStorage.userId,
                        project_id: this.props.projectId,
                        reward_id: this.props.reward._id,
                        pledgeAmount: this.state.pledge
                      }
                  })}}></input>
              )}
            </Mutation>
          </div>
        </div>}
      </div>
    )
  }
}

export default RewardTile;