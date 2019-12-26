import React from 'react';
import { useApolloClient } from '@apollo/react-hooks';
import Queries from '../../graphql/queries';
const { CURRENT_USER, FETCH_USER_BALANCE } = Queries;

const ReloadPage = props => {
  const client = useApolloClient();
  const currentUser = client.readQuery({ query: CURRENT_USER }).currentUser;
  let funBucks;
  try {
    const { user } = client.readQuery({
      query: FETCH_USER_BALANCE,
      variables: { _id: currentUser }
    });
    funBucks = user.funBucks;
  } catch (e){ console.log(e) };

  return (
    <div className="reload-page">
      
    </div>
  )
};

export default ReloadPage;