import React from 'react';
import { generateListKey, getIdFromUrlString } from '../../utils/utils';

const SwornMemberList = props => {
  const listName = 'sworn-member'
  const members = props.members.map(member => {
    const clickable = props.characters[getIdFromUrlString(member.url)];
    const className = clickable ? "clickable" : "unclickable";
    return (<li className={className} key={generateListKey(listName, member)}>{member.name ? member.name : (member.aliases[0] + "*")}</li>)
});
  return (
    <ul>
      {members}
    </ul>
  )
}

export default SwornMemberList;