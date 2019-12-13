import React from 'react';
import { Mutation } from "react-apollo";
import Mutations from "../../graphql/mutations";
import { withApollo } from 'react-apollo';

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
  	const currentUser = this.props.client.cache.data.data.ROOT_QUERY.currentUser;
    const inactiveOnCampaign = this.props.onCampaign && this.props.num !== this.props.show;
    return (
      <div 
        className={`pledge-tiles-rewards-tile ${inactiveOnCampaign ? 'inactive-campaign-reward-tile' : ''}`}
        onClick={() => this.props.setShow(this.props.num)}>
        <div className='pledge-tiles-rewards-tile-option'>
          <input
            type='radio'
            name='pledge'
            checked={this.props.num === this.props.show}
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
                      e.stopPropagation();
                      e.preventDefault();
                      PLEDGE_PROJECT({
                        variables: {
                          user_id: currentUser,
                          project_id: this.props.projectId,
                          reward_id: this.props.reward._id,
                          pledgeAmount: parseInt(this.state.pledge)
                        }
                      })
                      this.props.ownProps.history.push(`/projects/${this.props.projectId}`)
                    }}></input>
                </div>
              )}
            </Mutation>
          </div>
        </div> }
      </div>
    )
  }
}

export default withApollo(RewardTile);