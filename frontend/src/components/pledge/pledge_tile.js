import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import Mutations from "../../graphql/mutations";

class PledgeTile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      pledge: 10
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(field) {
    return e => this.setState({ [field]: e.currentTarget.value });
  }

  handleSubmit() {
    const { loading, error, data } = useMutation(
      Mutations.PLEDGE_PROJECT,
      { variables: {
        user_id: localStorage.userId,
        project_id: this.props.project._id,
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

export default PledgeTile;