import React, { Component } from 'react';
import './App.css';
// import Immutable from 'immutable';
// import Modal from 'react-modal'
import axios from 'axios';



// Custom Components
import Login from './Login';
import Logout from './Logout';
import Header from './Header';
import CardContainer from './CardContainer';
import SignUp from './SignUp';

// class Header extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       showModal: false
//     }
//   }
//
//   render() {
//     return (
//       <div className='header'>
//         <div className='header-content header-content__left'>
//           {/* <Logout
//              user_id={this.props.user_id}
//           onLogoutComplete={this.props.onLogoutComplete.bind(this)}
//         /> */}
//         </div>
//
//         <div className='header-content header-content__middle'>
//           Flash Cards
//         </div>
//         <div className='header-content header-content__right'>
//
//         </div>
//       </div>
//     )
//   }
// }

class Main extends Component {
  constructor(props){
    super(props);
    this.state={
      user_id: null,
      cards: null,
      login: '',
    }
    console.log(this.state.user_id);
    console.log(this.state.cards);
  }
  onSignUpComplete(user_id) {
    this.setState({
      user_id: user_id,
    })
  }

  onLoginComplete(user_id) {
    axios.get(`http://localhost:3001/users/${user_id}/flashcards/`)
      .then(({data}) => {
        const cards = [];

        data.forEach((card) => {
          console.log('card');
          console.log(card);

          var cardObject = {
            question: card.question,
            image: card.image_url,
          }
          // console.log(cardObject);
          cards.push(cardObject)
          console.log(cards);
        })
        this.setState({
          user_id: user_id,
          cards: cards,
          // login: login,
        })
      })
  }

  onLogoutComplete(user_id) {
    this.setState({
      user_id: null,
    })
  }


  render() {
    if (this.state.user_id) {
      return (
        <div className='wrapper'>
          {/* <Logout onLogoutComplete={this.onLogoutComplete.bind(this)}/> */}
          <Header
             user_id={this.state.user_id}
             onLogoutComplete={this.onLogoutComplete.bind(this)}
          />
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
          <SignUp onSignUpComplete={this.onSignUpComplete.bind(this)} />
          <h1>
            Welcome to Korean Flashard App
          </h1>
        </div>
      );
    }

  }
}
export default Main
