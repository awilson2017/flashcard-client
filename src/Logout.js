import React from 'react';

class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      'login': ''
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    console.log('i am in handleClick for logout');
    fetch("http://localhost:3001/logout", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
    .then(result => {
      console.log(result.json());
    })
  }
  render(){
    return (
      <button onClick={this.handleClick}>Logout</button>
    );
  }
}
// class Logout extends React.Component {
//   constructor () {
//     super();
//     this.state =
//   }
//
// }

export default Logout;
