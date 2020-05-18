import React from 'react';
import GameWebSocket from '../components/gameWebSocket';
import Board from './board';

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

      <GameWebSocket
          CableApp={this.props.CableApp}
          fetchGame={this.fetchGame}
          gameId={this.props.gameData.id}
          broadcastReceived={this.props.broadcastReceived}
        />
      
      <Board cards={this.props.gameData.board} />
    </>
  }
}

export default Game;