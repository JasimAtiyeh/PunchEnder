import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { withApollo } from 'react-apollo';
import { useQuery } from '@apollo/react-hooks';
import Queries from '../../graphql/queries';
import Panel from './dropdown_panel';
const { FETCH_USER } = Queries;

const NavDropdown = props => {
  const { client, setShow } = props;

  useEffect(() => {
    props.client.query({
      query: FETCH_USER,
      variables: { _id: localStorage.userId }
    });
  }, []);

  const { loading, error, data } = useQuery(FETCH_USER, { variables: { _id: localStorage.userId } });
  if (loading) return null;
  if (error) return <div>Error!</div>;
  const { user } = data;
  const launchedProjects = user.projects.filter(p => p.launched);
  const unfinishedProjects = user.projects.filter(p => !p.launched);
  const tableLength = Math.min(5, Math.max(launchedProjects.length, unfinishedProjects.length));
  const tableRows = [];
  
  for (let i = 0; i < tableLength; i++) {
    const row = (
      <tr key={i}>
        { launchedProjects[i] && 
          <Panel key={launchedProjects[i]._id} setShow={setShow} project={launchedProjects[i]}/> }
        {unfinishedProjects[i] && 
          <Panel key={unfinishedProjects[i]._id} setShow={setShow} project={unfinishedProjects[i]} /> }
      </tr>
    )
    tableRows.push(row);
  };

  return (
    <>
      <div className="nav-modal" onClick={() => setShow(false)} />
      <div className="nav-dropdown-content">
        <div className="nav-dropdown-account">
          <span>ACCOUNT</span>
          <Link
            to='/user'
            onClick={() => setShow(false)}>
            User Profile
          </Link>
          <button
            onClick={e => {
              setShow(false)
              e.preventDefault();
              localStorage.removeItem("auth-token");
              localStorage.removeItem("userId");
              client.writeData({ data: { isLoggedIn: false, currentUser: null } });
              window.location.reload();
            }} >
            Logout
          </button>
        </div>
        { tableLength > 0 && <table className="nav-dropdown-table">
          <thead>
            <tr>
              { launchedProjects.length > 0 && <th>LAUNCHED PROJECTS</th> }
              { unfinishedProjects.length > 0 && <th>UNFINISHED PROJECTS</th> }
            </tr>
          </thead>
          <tbody>
            {tableRows}
          </tbody>
          </table> }
      </div>
    </>
  )
};

export default withApollo(NavDropdown);