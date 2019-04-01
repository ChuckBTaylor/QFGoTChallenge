import React from 'react';
import { generateListKey, getIdFromUrlString } from '../../utils/utils';

const SwornMemberList = props => {
  const listName = 'sworn-member'
  const onMemberClick = event => {
    if (event.currentTarget.value !== 0)
      props.onMemberClick(event.currentTarget.value);
  }
  const members = props.members.map(member => {
    const memberId = getIdFromUrlString(member);
    const character = props.characters[memberId];
    const isCharacterLoaded = !!character;
    let id, className, name, key;
    if (isCharacterLoaded) {
      id = getIdFromUrlString(character.url);
      className = "clickable";
      name = !!character.name ? character.name : (character.aliases[0] + "*");      
      key = generateListKey(listName, character);
    } else {
      id = 0;
      className = "unclickable";
      name = "Loading...";
      key = generateListKey(listName, `${memberId}`);
    }
    return (<li onClick={onMemberClick} className={className} value={id} key={key}>{name}</li>)
  });
  return (
    <ul>
      {members}
    </ul>
  )
}

export default SwornMemberList;