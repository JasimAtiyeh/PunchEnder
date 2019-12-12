import React, { Component } from "react";
import { Mutation } from "react-apollo";
import Mutations from "../../graphql/mutations";
const { LOGIN_USER } = Mutations;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: [],
    };
    this.updateCache = this.updateCache.bind(this);
    this.demoLogin = this.demoLogin.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  demoLogin(e, loginUser) {
    e.preventDefault();
    loginUser({
      variables: {
        email: "demo@demo.com",
        password: "demouser"
      }
    });
  }

  handleError(err) {
    this.setState({ errors: err.graphQLErrors.map(err => err.message) });
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  updateCache(client, { data }) {
    console.log(data);
    client.writeData({
      data: { 
        isLoggedIn: data.login.loggedIn,
        currentUser: data.login._id
      }
    });
  }

  render() {
    const errorLis = this.state.errors.map(err => <li>{err}</li>);
    
    return (
      <Mutation
        mutation={LOGIN_USER}
        onCompleted={data => {
          const { token } = data.login;
          localStorage.setItem("auth-token", token);
          localStorage.setItem("userId", data.login._id);
          this.props.history.goBack();
        }} 
        onError={error => this.handleError(error)}
        update={(client, data) => this.updateCache(client, data)}
      >
        {loginUser => (
          <div className="login-form-container">
            <form
              className="login-form"
              onSubmit={e => {
                e.preventDefault();
                loginUser({
                  variables: {
                    email: this.state.email,
                    password: this.state.password
                  }
                });
              }}
            >
              <label>Log In</label>
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
              <button className="login-button" type="submit">Log In</button>
              <button className="demo-button" onClick={e => this.demoLogin(e, loginUser)}>Demo Login</button>
              { this.state.errors.length > 0 && 
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

export default Login;
