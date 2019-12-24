import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import Queries from "../../graphql/queries";
import { withApollo } from 'react-apollo';
const { FETCH_USER_IMAGE, FETCH_USER, CURRENT_USER } = Queries;

const NavImage = props => {
  const { setShow, client } = props;
  const currentUser = client.readQuery({ query: CURRENT_USER }).currentUser;

  useEffect(() => {
    client.query({
      query: FETCH_USER,
      variables: { _id: currentUser }
    })
  })
  const { loading, error, data } = useQuery(FETCH_USER_IMAGE, { variables: { _id: currentUser } });
  if (loading) return null;
  if (error) { return <div>Error!</div> };

  const { user } = data;
  const image = user.image ?
    user.image : "https://ksr-ugc.imgix.net/missing_user_avatar.png?ixlib=rb-2.1.0&w=80&h=80&fit=crop&v=&auto=format&frame=1&q=92&s=d89e3180fafd307918a94a3c9dd79c45";


  return (
    <img
      className='nav-dropdown-button'
      onClick={() => setShow(true)}
      src={image}
      alt='user avatar logo' />
  )
};

export default withApollo(NavImage);