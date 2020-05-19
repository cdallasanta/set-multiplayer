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
        {player.name}: {player.score}{player.status !== "" ? ` - ${player.status}` : ""}
      </li>
    })
  }

  selectCard = e => {
    if (this.props.gameData.status === "started") {
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
  }

  vote = (choice) => { 
    fetch(`${API_ROOT}/games/${this.props.room}`,{
      headers: HEADERS,
      body: JSON.stringify({
        actionToTake: `${choice}`,
        game: {
          username: this.props.currentUser,
          room: this.props.room
        }
      }),
      method: "PATCH"
    })
  }

  board = () => {
    switch (this.props.gameData.status) {
      case "started":
        return <Board cards={this.props.gameData.board}
          selectCard={this.selectCard}
          selectedCards={this.state.selectedCards} />
      case "ended":
        return <div>Game Over</div>
      case "not started":
        return <div>Waiting for all players to be ready.</div>
    }
  }

  buttons = () => {
    switch (this.props.gameData.status){
      case "not started":
        return <button onClick={() => this.vote("ready")}>Ready to begin</button>
      case "started":
        return <>
          <button onClick={() => this.vote("draw")}>Draw 3 more</button>
          <button onClick={() => this.vote("end game")}>End game</button>
        </>
      case "ended":
        return <button onClick={this.props.clearGameData}>Back to lobby</button>
    }
  }

  render() {
    return <>
      Game: {this.props.gameData.room}
      <ul>
        {this.listNames()}
      </ul>
      <button onClick={this.props.handleLogout}>Logout</button>

      { this.buttons() }
      { this.board() }

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