// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import AppBar from 'material-ui/AppBar';
// import RaisedButton from 'material-ui/RaisedButton';
// import TextField from 'material-ui/TextField';
import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';

class Login extends React.Component {
constructor(props){
  super(props);
  this.state={
    login: '',
    name: '',
    user_id: 0,
  }
  // console.log(this.openModal.bind(this));
  // this.openModal = this.openModal.bind(this)
  // console.log(this.openModal);
  this.handleSubmit = this.handleSubmit.bind(this);
}

handleSubmit(e) {
  e.preventDefault();
  axios.post("http://localhost:3001/login", {
    'login': `${e.target[0].value}`,
  })
  .then(({data}) => {
    // TODO: error handling
    console.log(data);
    this.props.onLoginComplete(data.session.id);
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
