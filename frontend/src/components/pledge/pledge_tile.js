import React from 'react';
import { Mutation } from "react-apollo";
import Mutations from "../../graphql/mutations";
import Queries from "../../graphql/queries";
import { withApollo } from 'react-apollo';
import swal from 'sweetalert';
const { CURRENT_USER, FETCH_USER_BALANCE } = Queries;

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
    const currentUser = this.props.client.readQuery({ query: CURRENT_USER }).currentUser;
    let funBucks;
    try {
      const { user } = this.props.client.readQuery({
        query: FETCH_USER_BALANCE,
        variables: { _id: currentUser }
      });
      funBucks = user.funBucks;
    } catch {};

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
<<<<<<< HEAD
=======
                            reward_id: null,
>>>>>>> 4403eed... update production readme
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