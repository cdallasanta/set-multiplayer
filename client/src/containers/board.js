import React from 'react';
import Card from '../components/card';
import CARDS from '../constants/cards';

class Board extends React.Component {
  showCards = () => {
    return this.props.cards.map((cardId, i) => {
      return <Card data={CARDS[cardId]} kei={i} />
    })
  }

  render(){
    return (
      <div className="board">
        {this.showCards()}
      </div>
    )}
}

export default Board;