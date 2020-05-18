import React from 'react';
import CARDS from '../constants/cards';

class Game extends React.Component {
  state = {
    selectedCards: []
  }

  listNames = () => {
    return this.props.gameData.players.map((player, i) => {
      return <li key={i}>{player.name}: {player.score}</li>
    })
  }

  render() {
    return <>
      Game: {this.props.gameData.room}
      <ul>
        {this.listNames()}
      </ul>
      <button onClick={this.props.handleLogout}>Logout</button>
    </>
  }
}

export default Game;