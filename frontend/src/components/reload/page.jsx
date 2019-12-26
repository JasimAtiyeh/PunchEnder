import React, { useEffect, useState } from 'react';
import { useApolloClient } from '@apollo/react-hooks';
import Queries from '../../graphql/queries';
const { CURRENT_USER, FETCH_USER_BALANCE } = Queries;

const ReloadPage = props => {
  const client = useApolloClient();
  const [loaded, setLoaded] = useState(false);
  const [checked, setChecked] = useState(false);
  const [amount, setAmount] = useState(0);
  const currentUser = client.readQuery({ query: CURRENT_USER }).currentUser;
  let funBucks;

  useEffect(() => {
    const currentUser = client.readQuery({ query: CURRENT_USER }).currentUser;
    client.query({
      query: FETCH_USER_BALANCE,
      variables: { _id: currentUser }
    }).then(() => setLoaded(true));
  }, [])

  try {
    const { user } = client.readQuery({
      query: FETCH_USER_BALANCE,
      variables: { _id: currentUser }
    });
    funBucks = user.funBucks;
  } catch 
  {};

  if (!loaded) return null;

  return (
    <div className="reload-page">
      <p>Current Balance: {funBucks} FunBucks</p>
      <form 
        onSubmit={ e => e.preventDefault() }>
        <label>Amount:</label>
        <input type="number" value={amount} onChange={e => setAmount(e.target.value)}/>
        <div className="reload-checkbox-container">
          <input type="checkbox" checked={checked} onChange={() => setChecked(!checked)}/>
          <p>
            I hereby authorize PunchEnder to add FunBucks to my balance.
            I promise to only use FunBucks for good, and not evil.
          </p>
        </div>
        <button disabled={!checked}>Add to balance</button>
      </form>
    </div>
  )
};

export default ReloadPage;