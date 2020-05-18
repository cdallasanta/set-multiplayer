import React from 'react';
import Card from '../components/card';
import CARDS from '../constants/cards';

class Board extends React.Component {
  render(){
    return <Card data={CARDS[this.props.cards[0]]} />
  }
}

export default Board;