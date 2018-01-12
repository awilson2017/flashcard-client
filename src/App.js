import React, { Component } from 'react';
import './App.css';
import ReactCardFlip from 'react-card-flip';
import Login from './Login'

// Code for logged-in users
// import { getQueryParams } from './utils';
// import Login from './Login';
// import Main from './Main';

// test button for React TODO: consider deleting

//
// class App extends Component {
//   constructor() {
//     super();
//
//     // const params = getQueryParams()
//     // this.state = { token: params.token }
//   }
//
//   render() {
//     return (
//       // <div className="root">
//       //   <Button raised primary>
//       //     Hi!
//       //   </Button>
//
//
//
//         <div className="page-container">
//           <div className="card">
//             <div className="word">
//               안녕
//             </div>
//           </div>
//         </div>
//
//
//       // </div>
//     );
//   }
// }


class App extends Component {
  render() {
    return (
      <div>
        <div>
          <Login />
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
