import React from 'react';
import { Mutation } from "react-apollo";
import Mutations from "../../graphql/mutations";
import { withApollo } from 'react-apollo';
import swal from 'sweetalert';
import Queries from "../../graphql/queries";
const { FETCH_USER_BALANCE, CURRENT_USER } = Queries;

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
    const currentUser = this.props.client.readQuery({ query: CURRENT_USER }).currentUser;
    let funBucks;
    try {
      const { user } = this.props.client.readQuery({
        query: FETCH_USER_BALANCE,
        variables: { _id: currentUser }
      });
      funBucks = user.funBucks;
    } catch {};

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
            <Mutation
              update={(client, { data }) => {
                const amount = data.pledgeProject.amount;
                const currentUser = client.readQuery({ query: CURRENT_USER }).currentUser;

                const { user } = client.readQuery({
                  query: FETCH_USER_BALANCE,
                  variables: { _id: currentUser },
                });

                user.funBucks -= amount;

                client.writeQuery({
                  query: FETCH_USER_BALANCE,
                  variables: { _id: currentUser },
                  data: { user },
                });
              }}  
              mutation={Mutations.PLEDGE_PROJECT}>
              {pledgeProject => (
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
                      if (funBucks > 0) {
                        e.stopPropagation();
                        e.preventDefault();
                        pledgeProject({
                          variables: {
                            user_id: currentUser,
                            project_id: this.props.projectId,
                            reward_id: this.props.reward._id,
                            pledgeAmount: Number(this.state.pledge)
                          }
                        })
                        this.props.ownProps.history.push(`/projects/${this.props.projectId}`)
                      } else {
                          swal("Insufficient funds", "Please add funds to your account", "warning");
                      }
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