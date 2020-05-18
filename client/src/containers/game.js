import React from 'react';
import GameWebSocket from '../components/gameWebSocket';
import Board from './board';
import { checkForMatch } from '../constants/gameLogic';
import { API_ROOT } from '../constants';

class Game extends React.Component {
  state = {
    selectedCards: []
  }

  listNames = () => {
    return this.props.gameData.players.map((player, i) => {
      return <li key={i}>{player.name}: {player.score}</li>
    })
  }

  selectCard = e => {
    let card = parseInt(e.target.dataset.id);

    if (this.state.selectedCards.includes(card)){
      let index = this.state.selectedCards.indexOf(card);
      this.state.selectedCards.splice(index, 1);
      this.setState({
        selectedCards: this.state.selectedCards
      });
    } else {
      this.setState({
        selectedCards: [...this.state.selectedCards, card]
      }, () => {
        if (this.state.selectedCards.length === 3) {
          if (checkForMatch(this.state.selectedCards)){
            this.props.sendMatch(this.state.selectedCards);
          }
          this.setState({
            selectedCards: []
          });
        }
      });
    }
  }

  render() {
    return <>
      Game: {this.props.gameData.room}
      <ul>
        {this.listNames()}
      </ul>
      <button onClick={this.props.handleLogout}>Logout</button>

      <Board cards={this.props.gameData.board}
        selectCard={this.selectCard}
        selectedCards={this.state.selectedCards} />

      <GameWebSocket
          CableApp={this.props.CableApp}
          fetchGame={this.fetchGame}
          gameId={this.props.gameData.id}
          broadcastReceived={this.props.broadcastReceived}
        />
    </>
  }
}

export default Game;