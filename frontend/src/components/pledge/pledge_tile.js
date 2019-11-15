import React from 'react';
import { Mutation } from "react-apollo";
import Mutations from "../../graphql/mutations";

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
    return (
      <div className='pledge-tiles-rewards-tile'>
        <div className='pledge-tiles-rewards-tile-option'>
          <input
            type='radio'
            name='pledge'
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
              {PLEDGE_PROJECT => (
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
                      e.preventDefault();
                      PLEDGE_PROJECT({
                        variables: {
                          user_id: localStorage.userId,
                          project_id: this.props.projectId,
                          pledgeAmount: this.state.pledge
                        }
                      })
                      this.props.ownProps.history.push(`/projects/${this.props.projectId}`)
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

export default PledgeTile;