import React from 'react';
import { generateListKey, getIdFromUrlString } from '../../utils/utils';

const SwornMemberList = props => {
  const listName = 'sworn-member'
  const onMemberClick = event => {
    props.onMemberClick(event.currentTarget.value);
  }
  const members = props.members.map(member => {
    const clickable = !!props.characters[getIdFromUrlString(member.url)];
    const className = clickable ? "clickable" : "unclickable";
    const id = getIdFromUrlString(member.url);
    return (<li onClick={onMemberClick} className={className} value={id} key={generateListKey(listName, member)}>{member.name ? member.name : (member.aliases[0] + "*")}</li>)
});
  return (
    <ul>
      {members}
    </ul>
  )
}

export default SwornMemberList;