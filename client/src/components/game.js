import React from 'react';

class Game extends React.Component {
  names = () => {
    return this.props.gameData.players.map((player, i) => {
      return <li key={i}>{player.name}</li>
    })
  }

  render() {
    return <>
      Game: {this.props.gameData.room}
      <ul>
        {this.names()}
      </ul>
      <button onClick={this.props.handleLogout}>Logout</button>
    </>
  }
}

export default Game;