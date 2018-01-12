// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import AppBar from 'material-ui/AppBar';
// import RaisedButton from 'material-ui/RaisedButton';
// import TextField from 'material-ui/TextField';
import React from 'react';

class Login extends React.Component {
constructor(props){
  super(props);
  this.state={
    login: '',
    name: ''
  }
  this.handleSubmit = this.handleSubmit.bind(this);
}

handleSubmit(e) {
  e.preventDefault();
  console.log('i am in handle submit');

  fetch("http://localhost:3001/login", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify ({
      'login': `${e.target[0].value}`,
    })
  })
}

render() {
    return (
      <form name="login" className="form" onSubmit={this.handleSubmit}>
        <label >Login</label>
        <input type="text"/>
        <input type="submit"/>
      </form>
    );
  }
}

export default Login;
