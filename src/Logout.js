import React from 'react';

class Logout extends React.Component {
  constructor(props) {
    super(props);

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
      console.log(this.props);
      this.props.onLogoutComplete(result.session)
    })
  }
  render(){
    return (
      <button onClick={this.handleClick}>Logout</button>
    );
  }
}

export default Logout;
