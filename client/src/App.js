import React from 'react';
import Game from './containers/game';
import Login from './components/login';
import { API_ROOT, HEADERS } from './constants';

class App extends React.Component {
  state = {
    currentUser: "",
    room: "",
    game: null
  }

  handleSignIn = (e, data) => {
    e.preventDefault();
    
    fetch(`${API_ROOT}/games/${data.room}?username=${data.username}`)
      .then(resp => resp.json())
      .then(resp => {
        if (resp.status === "success"){
          this.setState({
            currentUser: data.username,
            room: resp.game.room,
            game: resp.game
          });
        } else {
          console.log(resp.message);
        }
      });
  }

  createGame = (e, username) => {
    e.preventDefault();
    fetch(`${API_ROOT}/games`, {
      headers: HEADERS,
      body: JSON.stringify({game: {username: username}}),
      method: "POST"
    })
      .then(resp => resp.json())
      .then(resp => {
        if (resp.status === "success"){
          this.setState({
            currentUser: username,
            room: resp.game.room,
            game: resp.game
          });
        } else {
          console.log(resp.message);
        }
      });
  }

  handleLogout = () => {
    this.setState({
      currentUser: "",
      room: "",
      game: null
    })
  }

  broadcastReceived = data => {
    this.setState({
      game: data
    });
  }

  sendMatch = (cards) => {
    fetch(`${API_ROOT}/games/${this.state.room}`, {
      method: "PATCH",
      headers: HEADERS,
      body: JSON.stringify({
        game: {
          room: this.state.room,
          username: this.state.currentUser,
          cards: cards
        },
        actionToTake: "score"
      })
    }).then(resp => resp.json())
      .then(resp => {
        if (resp.status === "error") {
          console.log(resp.message);
        }
      })
  }
  
  render() {
    return (
      <div className="App">
        {this.state.currentUser !== "" ?
          <Game gameData={this.state.game}
            handleLogout={this.handleLogout}
            CableApp={this.props.CableApp}
            broadcastReceived={this.broadcastReceived}
            sendMatch={this.sendMatch}
            room={this.state.game.room}
            currentUser={this.state.currentUser}
          /> :
          <Login handleSignIn={this.handleSignIn} createGame={this.createGame} />
        }
      </div>
    )
  }
}

export default App;
