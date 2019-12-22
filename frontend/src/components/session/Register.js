import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { withRouter } from "react-router-dom";
import Mutations from "../../graphql/mutations";
const { SIGNUP_USER } = Mutations;

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
			name: "",
      email: "",
      password: "",
      errors: []
    };
    this.updateCache = this.updateCache.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  handleError(err) {
    this.setState({ errors: err.graphQLErrors.map(err => err.message) });
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  updateCache(client, { data }) {
    client.writeData({
      data: { 
        isLoggedIn: data.register.loggedIn,
        currentUser: data.register._id,
        funBucks: data.login.funBucks
      }
    });
  }

  render() {
    const errorLis = this.state.errors.map(err => <li>{err}</li>);

    return (
      <Mutation
        mutation={SIGNUP_USER}
        onCompleted={data => {
          const { token } = data.register;
          localStorage.setItem("auth-token", token);
          localStorage.setItem("userId", data.register._id);
          this.props.history.goBack();
        }}
        onError={error => this.handleError(error)}
        update={(client, data) => this.updateCache(client, data)}
      >
        {signupUser => (
          <div className="signup-form-container">
            <form
              className="signup-form"
              onSubmit={e => {
                e.preventDefault();
                signupUser({
                  variables: {
										name: this.state.name,
                    email: this.state.email,
                    password: this.state.password
                  }
                });
              }}
            >
              <label>Sign Up</label>
              <input
                value={this.state.name}
                onChange={this.update("name")}
                placeholder="Name"
              />
							<input
                value={this.state.email}
                onChange={this.update("email")}
                placeholder="Email"
              />
              <input
                value={this.state.password}
                onChange={this.update("password")}
                type="password"
                placeholder="Password"
              />
              <button className="signup-button" type="submit">Sign Up</button>
              {this.state.errors.length > 0 &&
                <ul className="session-errors">
                  {errorLis}
                </ul>
              }
            </form>
          </div>
        )}
      </Mutation>
    );
  }
};

export default withRouter(Register);
