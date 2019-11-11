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
      password: ""
    };
    this.updateCache = this.updateCache.bind(this);
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  updateCache(client, { data }) {
    client.writeData({
      data: { isLoggedIn: data.register.loggedIn }
    });
  }

  render() {
    return (
      <Mutation
        mutation={SIGNUP_USER}
        onCompleted={data => {
          const { token } = data.register;
          localStorage.setItem("auth-token", token);
          localStorage.setItem("userId", data.login._id);
          this.props.history.push("/");
        }}
        update={(client, data) => this.updateCache(client, data)}
      >
        {signupUser => (
          <div>
            <form
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
              <button type="submit">Sign Up</button>
            </form>
          </div>
        )}
      </Mutation>
    );
  }
};

export default withRouter(Register);
