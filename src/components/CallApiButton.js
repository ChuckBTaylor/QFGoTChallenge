import React from 'react';

const CallApiButton = props => {
  const handleClick = () => {
    props.onClick();
    
  }

  return(
    <button onClick={handleClick}>
      {props.buttonName}
    </button>
  )
}

export default CallApiButton;