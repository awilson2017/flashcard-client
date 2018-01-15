import React, { Component } from 'react';
import './App.css';
import ReactCardFlip from 'react-card-flip';
// import Immutable from 'immutable';
// import _ from 'underscore';
// import ReactDOM from 'react-dom';

// Custom Components
import Login from './Login'
import Logout from './Logout'
import Translate from './Translate'

class App extends Component {

  render() {
    return (
      <div>
        <div>
          <Login />
        </div>
        <div>
          <Logout />
        </div>

        <br />

        <div>

          <Translate />
        </div>

        <div className="page-container">
          <Card front="안녕" back="hi"/>
        </div>
      </div>
    );
  }
}



class Card extends React.Component {
  constructor () {
    super();
    this.state = {
      isFlipped: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.setState({ isFlipped: !this.state.isFlipped });
  }

  render() {
    return (
      <ReactCardFlip isFlipped={this.state.isFlipped}>
        <div key="front" className="card">
          <div className="word">
            {this.props.front}
            <br />
            <button onClick={this.handleClick}>Click to flip</button>
          </div>
        </div>

        <div key="back" className="card">
          <div className="word">
            {this.props.back}
            <br/>
            <button onClick={this.handleClick}>Click to flip</button>
          </div>
        </div>
      </ReactCardFlip>
    )
  }
  // render() {
  //   return (
  //     <div className="card">
  //       <div className="word">
  //         {this.props.word}
  //       </div>
  //     </div>
  //   )
  // }
}

export default App;
