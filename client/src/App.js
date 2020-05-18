import React from 'react';
import './App.css';

class App extends React.Component {
  state = {
    currentUser: "",
    room: ""
  }
  
  render() {
    return (
      <div className="App">
        {this.state.currentUser != "" ? <Game /> : <Login />}
      </div>
    )
  }
}

export default App;
