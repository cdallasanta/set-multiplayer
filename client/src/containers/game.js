import React from 'react';
import GameWebSocket from '../components/gameWebSocket';
import Board from './board';
import { checkForMatch } from '../constants/gameLogic';
import { API_ROOT, HEADERS } from '../constants';

class Game extends React.Component {
  state = {
    selectedCards: []
  }

  listNames = () => {
    return this.props.gameData.players.map((player, i) => {
      return <li key={i}
      className={player.name === this.props.currentUser ? "strong" : ""}>
        {player.name}: {player.score}
      </li>
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

  drawThree = () => { 
    fetch(`${API_ROOT}/games/${this.props.room}`,{
      headers: HEADERS,
      body: JSON.stringify({actionToTake: "draw 3"}),
      method: "PATCH"
    })
  }

  render() {
    return <>
      Game: {this.props.gameData.room}
      <ul>
        {this.listNames()}
      </ul>
      <button onClick={this.props.handleLogout}>Logout</button>
      <button onClick={this.drawThree}>Draw 3 more</button>

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