import React from 'react';

const CallApiButton = props => {
  const handleClick = () => {
    console.log("Clicked!");
  }

  return(
    <button onClick={handleClick}>
      {props.buttonName}
    </button>
  )
}

export default CallApiButton;