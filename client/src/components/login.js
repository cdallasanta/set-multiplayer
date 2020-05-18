import React from 'react';

class Login extends React.Component {
  state = {
    room: "",
    username: ""
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return <div>
      <h1>Welcome to Set!</h1>
      <form onSubmit={e => this.props.handleSignIn(e, this.state)}>
        <div>
          What is your name? <input value={this.state.username} onChange={this.handleChange} name="username" placeholder="username" />
        </div>
        <div>
          Join a game in progress: <input value={this.state.room} onChange={this.handleChange} name="room" placeholder="room code" />
          <input type="submit" value="Join Game" />
          OR
          <button onClick={e => this.props.createGame(e, this.state.username)} >Create a Game</button>
        </div>
      </form>
    </div>
  }
}

export default Login;