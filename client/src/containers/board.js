import React from 'react';
import Card from '../components/card';
import CARDS from '../constants/cards';
import '../stylesheets/board.scss'

class Board extends React.Component {
  showCards = () => {
    return this.props.cards.map((cardId, i) => {
      return <Card data={CARDS[cardId]}
        key={i}
        selectCard={this.props.selectCard} 
        selected={this.props.selectedCards.includes(cardId)} />
    })
  }

  render(){
    return (
      <div id="board">
        {this.showCards()}
      </div>
    )}
}

export default Board;