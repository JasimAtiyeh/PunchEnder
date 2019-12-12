import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import Queries from "../../graphql/queries";
import { withApollo } from 'react-apollo';
const { FETCH_USER_IMAGE } = Queries;

const NavImage = props => {
  const { setShow } = props;
	const currentUser = props.client.cache.data.data.ROOT_QUERY.currentUser;
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