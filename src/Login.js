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
    // name: '',
    user_id: null,
    cards: null,

  }
  // console.log(this.openModal.bind(this));
  // this.openModal = this.openModal.bind(this)
  // console.log(this.openModal);
  this.handleSubmit = this.handleSubmit.bind(this);
  console.log(this.state.cards);
}


handleSubmit(e) {
  e.preventDefault();
  axios.post("http://localhost:3001/login", {
    'login': `${e.target[0].value}`,
  })
  .then(({data}) => {
    // TODO: error handling
    console.log(data.session.id);
    console.log('this.props');
    console.log(this.props);
    this.props.onLoginComplete(data.session.id);
    this.setState({
      user_id: data.session.id,
    },() => { axios.get(`http://localhost:3001/users/${this.state.user_id}/flashcards/`)
    // console.log(`http://localhost:3001/users/${this.state.user_id}/flashcards/`);
      .then(({data}) => {
        this.setState({
          cards: data,
        })
        console.log(this.state.user_id);
        console.log(this.state.cards);
      })
    console.log(this.state.user_id);
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
