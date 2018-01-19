import React, { Component } from 'react';
import './App.css';
// import ReactCardFlip from 'react-card-flip';
// import Immutable from 'immutable';
// import _ from 'lodash/core';
// import ReactDOM from 'react-dom';
// import Modal from 'react-modal'
import axios from 'axios';



// Custom Components
import Login from './Login'
import Logout from './Logout'
import Translate from './Translate'
import CardContainer from './CardContainer'

class Header extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false
    }
  }

  render() {
    return (
      <div className='header'>
        <div className='header-content header-content__left'>

        </div>
        <div className='header-content header-content__middle'>
          Flash Cards
        </div>
        <div className='header-content header-content__right'>

        </div>
      </div>
    )
  }
}

class Main extends Component {
  constructor(props){
    super(props);
    this.state={
      user_id: null,
      cards: null,
    }
    console.log(this.state.user_id);
    console.log(this.state.cards);
  }
  onLoginComplete(user_id) {
    axios.get(`http://localhost:3001/users/${user_id}/flashcards/`)
      .then(({data}) => {
        this.setState({
          user_id: user_id,
          cards: data,
        }, () => {
          console.log(this.state.user_id)
          console.log(this.state.cards);
        })
      })

    console.log(this.state.cards);
  }
  render() {
    if (this.state.user_id) {
      return (
        <div className='wrapper'>
          <Logout />
          <Header />
          <div className='content-wrapper'>
            <CardContainer
              user_id={this.state.user_id}
              userCards={this.state.cards}
              onLoginComplete={this.onLoginComplete.bind(this)}
            />
          </div>
        </div>
      );
    } else {
      return (
        <div className='wrapper'>
          <Login onLoginComplete={this.onLoginComplete.bind(this)}
          user_id={this.state.user_id}/>
          <h1>
            Welcome to Korean Flashard App
          </h1>
        </div>
      );
    }

  }
}
export default Main
