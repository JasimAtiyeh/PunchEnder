import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Query } from "react-apollo";
import Queries from "../../graphql/queries";
import { ApolloConsumer } from "react-apollo";
import Search from './search';
import NavImage from './image';
import NavDropDown from './dropdown';
import { withApollo } from 'react-apollo';
const { CURRENT_USER } = Queries;

const Nav = props => {
	const [show, setShow] = useState(false);
	const [searching, setSearching] = useState(false);

	if (searching) { return <Search setSearching={setSearching}/> };
	return (
		<div className='nav'>
			<div className='nav-links'>
				{/* <Link to='/'>Explore</Link> */}
				<Link to='/start'>Start a project</Link>
			</div>
			<Link to="/">
				<h1 className='nav-logo'>
					PUNCHENDER
				</h1>
			</Link>
			<ApolloConsumer>
				{client => (
					<Query query={CURRENT_USER}>
						{({ data, loading, error }) => {
							if (loading) return null;
							if (error) return `Error! ${error.message}`;
							if (data.currentUser) {
								return (
									<div className="nav-right">
										<button
											onClick={() => setSearching(true)}>
											Search <i className="fas fa-search" />
										</button>
										<div className="nav-dropdown">
											<NavImage setShow={setShow}/>
											{ show && <NavDropDown client={client} setShow={setShow}/>}
										</div>
									</div>
								);
							} else {
								return (
									<div className='nav-login-links'>
										<Link to="/login">Log In</Link>
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
};

export default withApollo(Nav);