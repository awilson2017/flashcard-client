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
      console.log(result);
      console.log(result.session);
      console.log(this);
      console.log(this.props);
      this.props.onLogoutComplete(result.session)
    })
  }

  render(){
    console.log(this.props.user_id);
    return (
      <button className="logout__button" onClick={this.handleClick}>Logout</button>
    );
  }
}

export default Logout;
