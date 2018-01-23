// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import AppBar from 'material-ui/AppBar';
// import RaisedButton from 'material-ui/RaisedButton';
// import TextField from 'material-ui/TextField';
import React from 'react';
// import Modal from 'react-modal';
import axios from 'axios';

class Login extends React.Component {
constructor(props){
  super(props);
    this.state = {
      loginError: false,
    }
  this.hideError = this.hideError.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
}

hideError() {
  this.setState({loginError: !this.state.loginError});
}

handleSubmit(e) {
  e.preventDefault();

  axios.post("http://localhost:3001/login", {
    'login': `${e.target[0].value}`,
  })
  .then(({data}) => {
    // console.log({Unprocessable Entity});
    // console.log(result);
    console.log(data);
    if (data.user === null) {
      this.setState({
        loginError: !this.state.loginError
      });
      setTimeout(() => this.hideError(), 2000);
    } else {
      this.props.onLoginComplete(data.session.id);
    }
  })
  .catch((errors)=>{
    console.error(errors);
  })
}

render() {
    const loginErrorMsg = this.state.loginError ? 'Login unsuccessful, please try again' : ''
    return (
      <div>
        <form name="login" className="form" onSubmit={this.handleSubmit}>
          {/* <label >Login</label> */}
          <input type="text" placeholder="Login"/>
          <input type="submit"/>
        </form>

        <div className="login__error">
          {loginErrorMsg}
        </div>
      </div>

    );
  }
}

export default Login;
