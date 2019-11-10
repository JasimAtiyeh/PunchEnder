import React from 'react';

const BoldMark = props => {
  return (
    <strong className="bold">
      {props.children}
    </strong>
  )
};

export default BoldMark;