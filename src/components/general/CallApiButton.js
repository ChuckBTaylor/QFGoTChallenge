import React from 'react';

const CallApiButton = props => {
  const handleClick = () => {
    props.onClick();
    
  }

  return(
    <button className="" onClick={handleClick}>
      {props.buttonName}
    </button>
  )
}

export default CallApiButton;