import React from 'react';
import { Redirect, withRouter, Link } from 'react-router-dom';

const ReloadConfirmation = props => {
  if (!props.location.state) return <Redirect to='/' />;
  const { amount } = props.location.state;

  return (
    <div className='reload-confirmation'>
      <p>${amount} has been added to your balance!</p>
      <Link to='/'>Return Home</Link>
    </div>
  )
}

export default withRouter(ReloadConfirmation);