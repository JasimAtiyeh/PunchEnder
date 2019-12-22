import React from 'react';
import { Mutation } from "react-apollo";
import Mutations from "../../graphql/mutations";
import { withApollo } from 'react-apollo';
import swal from 'sweetalert';

class PledgeTile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pledge: 10
    };
    this.history = this.props;
  }

  update(field) {
    return e => this.setState({ [field]: e.currentTarget.value });
  }

  render() {
  	const currentUser = this.props.client.cache.data.data.ROOT_QUERY.currentUser;
  	const funBucks = this.props.client.cache.data.data.ROOT_QUERY.funBucks;
    return (
      <div 
        className='pledge-tiles-rewards-tile'
        onClick={() => this.props.setShow(this.props.num)}>
        <div className='pledge-tiles-rewards-tile-option'>
          <input
            type='radio'
            name='pledge'
            checked={this.props.num === this.props.show}
            onChange={() => this.props.setShow(this.props.num)}></input>
          <div className='pledge-tiles-rewards-tile-option-info'>
            <div className='pledge-tiles-rewards-tile-option-info-title'>Pledge without a reward</div>
            <div className='pledge-tiles-rewards-tile-option-info-sub-no-reward'>Back it because you believe in it.</div>
          </div>
        </div>
        { this.props.show === this.props.num && <div className='pledge-tiles-rewards-tile-option-pledge'>
          <div className='pledge-tiles-rewards-tile-option-pledge-title'>
            Pledge amount
          </div>
          <div>
            <Mutation mutation={Mutations.PLEDGE_PROJECT}>
              {pledgeProject => (
                <div className='pledge-tiles-rewards-tile-option-pledge-inputs'>
                  <div className='pledge-tiles-rewards-tile-option-pledge-inputs-number'>
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
        </div>}
      </div>
    )
  }
}

export default withApollo(PledgeTile);