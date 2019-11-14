import React from 'react';
import { Mutation } from "react-apollo";
import Mutations from "../../graphql/mutations";

class RewardTile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pledge: this.props.reward.pledgeAmount
    };
  }

  update(field) {
    return e => this.setState({ [field]: e.currentTarget.value });
  }

  render() {
    return (
      <div className='pledge-tiles-rewards-tile'>
        <div className='pledge-tiles-rewards-tile-option'>
          <input
            type='radio'
            name='pledge'
            onChange={() => this.props.setShow(this.props.num)}></input>
          <div className='pledge-tiles-rewards-tile-option-info'>
            <div className='pledge-tiles-rewards-tile-option-info-title'>${this.props.reward.pledgeAmount} or more</div>
            <div className='pledge-tiles-rewards-tile-option-info-sub'>{this.props.reward.name}</div>
            <div className='pledge-tiles-rewards-tile-option-info-description'>{this.props.reward.description}</div>
          </div>
        </div>
        { this.props.show === this.props.num && <div className='pledge-tiles-rewards-tile-option-pledge'>
          <div className='pledge-tiles-rewards-tile-option-pledge-title'>
            Pledge amount
          </div>
          <div>
            <Mutation mutation={Mutations.PLEDGE_PROJECT}>
              {PLEDGE_PROJECT => (
                <div className='pledge-tiles-rewards-tile-option-pledge-inputs'>
                  <div  className='pledge-tiles-rewards-tile-option-pledge-inputs-number'>
                    <i className="fas fa-dollar-sign"></i>
                    <input
                      type='number'
                      value={this.state.pledge}
                      onChange={this.update('pledge')}></input>
                  </div>
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
                </div>
              )}
            </Mutation>
          </div>
        </div> }
      </div>
    )
  }
}

export default RewardTile;