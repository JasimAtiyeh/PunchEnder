import React, { useEffect, useState } from 'react';
import { useApolloClient, useMutation } from '@apollo/react-hooks';
import { Redirect } from 'react-router-dom';
import Queries from '../../graphql/queries';
import Mutations from '../../graphql/mutations';
const { CURRENT_USER, FETCH_USER_BALANCE } = Queries;
const { ADD_USER_BALANCE } = Mutations;

const countDecimals = function (value) {
  if (typeof value === "String") return 0;
  const arr = value.toString().split(".");
  if (Math.floor(value) !== value) {
    if (arr.length < 2) return 0;
    return arr[1].length || 0;
  } else {
    return 0;
  }
}

const ReloadPage = props => {
  const client = useApolloClient();
  const [loaded, setLoaded] = useState(false);
  const [checked, setChecked] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [amount, setAmount] = useState(0);
  const [addUserBalance] = useMutation(ADD_USER_BALANCE);
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

  if (confirmed) return <Redirect to={{
    pathname: 'confirmed',
    state: { amount }
  }} />

  return (
    <div className="reload-page">
      <p>Current Balance: {funBucks} FunBucks</p>
      <form 
        onSubmit={ e => { 
          e.preventDefault();
          addUserBalance({ variables: { _id: currentUser, amount: parseFloat(amount) }})
            .then(() => setConfirmed(true))
            .catch(err => console.log(err))
        } }>
        <label>Amount:</label>
        <input type="number" 
          min={0} 
          value={amount} 
          onChange={e => {
            setAmount(e.target.value);
          }}
        />
        <div className="reload-checkbox-container">
          <input type="checkbox" checked={checked} onChange={() => setChecked(!checked)}/>
          <p>
            I hereby authorize PunchEnder to add FunBucks to my balance.
            I promise to only use FunBucks for good, and not evil.
          </p>
        </div>
        <button disabled={!checked || amount <= 0 || countDecimals(amount) > 2}>Add to balance</button>
      </form>
    </div>
  )
};

export default ReloadPage;