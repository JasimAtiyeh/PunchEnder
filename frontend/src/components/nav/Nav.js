import React from "react";
import { Link } from "react-router-dom";
import { Query } from "react-apollo";
import Queries from "../../graphql/queries";
import { ApolloConsumer } from "react-apollo";
import { withRouter } from "react-router-dom";
const { IS_LOGGED_IN } = Queries;

class Nav extends React.Component {
	constructor(props) {
		super(props);

    this.handleClick = this.handleClick.bind(this);
		this.state = {
			show: false
		};
	}

	handleClick() {
		this.setState({
			show: true
		});
	}

	render() {

		return (
			<div className='nav'>
				<div className='nav-links'>
					<Link to='/'>Explore &nbsp;&nbsp;&nbsp;</Link>
					<Link to='/start'>Start a project</Link>
				</div>
				<Link to="/">
					<h1 className='nav-logo'>
						PUNCHENDER
					</h1>
				</Link>
				<ApolloConsumer>
					{client => (
						<Query query={IS_LOGGED_IN}>
							{({ data, loading, error }) => {
								if (loading) { return <p>loading...</p> }
								if (error) return `Error! ${error.message}`;
								if (data.isLoggedIn) {
									return (
										<div className="nav-dropdown">
											<img
												className = 'nav-dropdown-button'
												onClick={this.handleClick}
												src = "https://ksr-ugc.imgix.net/missing_user_avatar.png?ixlib=rb-2.1.0&w=80&h=80&fit=crop&v=&auto=format&frame=1&q=92&s=d89e3180fafd307918a94a3c9dd79c45"
												alt = 'user avatar logo' />
											{this.state.show &&
												(<>
													<div className="nav-modal" onClick={() => this.setState({
														show: false
													})}></div>
													<div className="nav-dropdown-content">
														<Link
															to='/user'
															onClick={() => this.setState({ show: false })}>
																User Profile
														</Link>
														<button
															onClick={() => this.setState({ show: false })}
															onClick={e => {
																e.preventDefault();
																localStorage.removeItem("auth-token");
																localStorage.removeItem("userId");
																client.writeData({ data: { isLoggedIn: false } });
																this.props.history.push("/");
															}} >
															Logout
														</button>
													</div>
												</>)
											}
										</div>
									);
								} else {
									return (
										<div className='nav-login-links'>
											<Link to="/login">Log In &nbsp;&nbsp;&nbsp;</Link>
											<Link to="/signup">Sign Up</Link>
										</div>
									);
								}
							}}
						</Query>
					)}
				</ ApolloConsumer>
			</div>
		);
	}
};

export default withRouter(Nav);