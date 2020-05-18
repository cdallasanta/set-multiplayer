import React from 'react';
import Game from './components/game';
import Login from './components/login';
import { API_ROOT, HEADERS } from './constants';

class App extends React.Component {
  state = {
    currentUser: "",
    room: ""
  }

  handleSignIn = (e, data) => {
    e.preventDefault();
    
    fetch(`${API_ROOT}/games/${data.room}?name=${data.username}`)
      .then(resp => resp.json())
      .then(data => {
        debugger;
      });
  }

  createGame = (e, username) => {
    e.preventDefault();
    fetch(`${API_ROOT}/games`, {
      headers: HEADERS,
      body: {name: username},
      method: "POST"
    })
      .then(resp => resp.json())
      .then(data => {
        debugger;
      });
  }
  
  render() {
    return (
      <div className="App">
        {this.state.currentUser !== "" ?
          <Game /> :
          <Login handleSignIn={this.handleSignIn} createGame={this.createGame} />
        }
      </div>
    )
  }
}

export default App;
