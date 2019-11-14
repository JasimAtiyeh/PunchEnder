import React from 'react';
import { Mutation } from "react-apollo";
import Mutations from "../../graphql/mutations";

class PledgeTile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      pledge: 10
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
            <div>Pledge without a reward</div>
            <div>Back it because you believe in it.</div>
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

export default PledgeTile;