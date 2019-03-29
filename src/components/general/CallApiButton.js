import React from 'react';
import './CallApiButton.css';

const CallApiButton = props => {
  const handleClick = () => {
    props.onClick();
    
  }

  return(
    <button className="query-api" onClick={handleClick}>
      {props.buttonName}
    </button>
  )
}

export default CallApiButton;