import React, { Component } from 'react';
import './App.css';
import ReactCardFlip from 'react-card-flip';
import Immutable from 'immutable';
import _ from 'lodash/core';
// import ReactDOM from 'react-dom';
// import Modal from 'react-modal'
import axios from 'axios';



// Custom Components
import Login from './Login'
import Logout from './Logout'
import Translate from './Translate'
//
// class App extends Component {
//
//   render() {
//     return (
//       <div>
//         <div>
//           <Login />
//         </div>
//         <div>
//           <Logout />
//         </div>
//
//         <br />
//
//         <div>
//
//           <Translate />
//         </div>
//
//         <div className="page-container">
//           <Card front="안녕" back="hi"/>
//         </div>
//       </div>
//     );
//   }
// }
//
//
//
// class Card extends React.Component {
//   constructor () {
//     super();
//     this.state = {
//       isFlipped: false
//     };
//     this.handleClick = this.handleClick.bind(this);
//   }
//
//   handleClick(e) {
//     e.preventDefault();
//     this.setState({ isFlipped: !this.state.isFlipped });
//   }
//
//   render() {
//     return (
//       <ReactCardFlip isFlipped={this.state.isFlipped}>
//         <div key="front" className="card">
//           <div className="word">
//             {this.props.front}
//             <br />
//             <button onClick={this.handleClick}>Click to flip</button>
//           </div>
//         </div>
//
//         <div key="back" className="card">
//           <div className="word">
//             {this.props.back}
//             <br/>
//             <button onClick={this.handleClick}>Click to flip</button>
//           </div>
//         </div>
//       </ReactCardFlip>
//     )
//   }
//   // render() {
//   //   return (
//   //     <div className="card">
//   //       <div className="word">
//   //         {this.props.word}
//   //       </div>
//   //     </div>
//   //   )
//   // }
// }
//
// export default App;


class CreateCard extends Component {
  constructor() {
    super();
    this.state = {
      word: '',
      description: '',
      image: ''
      // showError: false
    }
  }

  // hideError() {
  //   this.setState({showError: !this.state.showError});
  // }

  render() {
    const errorMessage = this.state.showError ? 'Please fill in the word and description!' : '';
    return (
      <div className='create-card'>
        <div
          className='create-card__shadow'
          onClick={() => {
            this.props.onShadowClick();
          }}
        >
        </div>
        <div className='create-card__body'>
          <h1>Create New Card</h1>
          <div className='create-card__input-wrapper'>
            <input
              id='word'
              placeholder="Word i.e. 'React'"
              value = {this.state.word}
              onChange = {(e) => this.setState({word: e.target.value})}
            />
            {/* TODO add image upload */}
            <input
              id='description'
              placeholder="Description i.e. 'A front end js framework.'"
              value = {this.state.description}
              onChange = {(e) => this.setState({description: e.target.value})}
            />
            <br/>
            <button
              id='create-card__button'
              onClick={() => {

                if (this.state.word.length === 0 || this.state.description.length === 0) {
                  this.setState({
                    showError: !this.state.showError
                  });
                  setTimeout(() => this.hideError(), 2000);
                } else {
                  this.props.onShadowClick();
                  const word = new Immutable.Map({
                    word: this.state.word,
                    description: this.state.description
                  });
                  this.props.onCreateCard(word);
                }
              }}
            >
                Create!
            </button>
            <div className='create-card__error'>
              {errorMessage}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class Header extends React.Component {
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
class Card extends React.Component {

  constructor() {
    super();
    this.state = {
      showAnswer: false
    }
  }

  render() {
    const content = this.state.showAnswer ? this.props.backContent : this.props.frontContent;
    const iconClass = this.state.showAnswer ? 'reply' : 'share';
    const cardClass = this.state.showAnswer ? 'back' : '';
    const contentClass = this.state.showAnswer ? 'back' : 'front';
    const actionClass = this.state.showAnswer ? 'active' : '';

    return (
      <div
        className={`card ${cardClass}`}
        onClick={() => this.setState({showAnswer: !this.state.showAnswer})}
      >
      <span className='card__counter'>{this.props.cardNumber + 1}</span>
        <div
          className='card__flip-card'
          onClick={ () => {
            this.setState({showAnswer: !this.state.showAnswer});
          }}
        >

          <span className={`fa fa-${iconClass}`}/>
        </div>
        <div className={`card__content--${contentClass}`}>
          {content}
        </div>
        <div className={`card__actions ${actionClass}`}>
          <div
            className='card__prev-button'
            onClick={() => {
              this.props.showPrevCard();
              this.setState({showAnswer: false});
            }}
          >
            Prev
          </div>
          <div
            className='card__next-button'
            onClick={() => {
              this.props.showNextCard();
              this.setState({showAnswer: false});
            }}
          >
            Next
          </div>
        </div>
      </div>
    );
  }
}

class CardContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      cards: [{
        word: 'Jazz',
        description: 'A type of music of black American origin characterized by improvisation, syncopation, and usually a regular or forceful rhythm, emerging at the beginning of the 20th century.',
      }, {
        word: 'Reggae',
        description: 'Music like Bob Marley, man.',
      }, {
        word: 'Folk',
        description: 'Music like Bob Dylan, man.',
      }
    ],
      cardNumber: 0
    };
    this.boundCallback = this.hideCreateCard.bind(this);
    this.boundCreateCard = this.setCard.bind(this);
    this.boundShowPrevCard = this.showPrevCard.bind(this);
    this.boundShowNextCard = this.showNextCard.bind(this);
    this.boundGetUserCards = this.getUserCards.bind(this);
  }

  hideCreateCard() {
    this.setState({showModal: false});
  }

  showNextCard() {
    if ((this.state.cardNumber + 1) !== this.state.cards.size) {
      this.setState({cardNumber: this.state.cardNumber += 1});
    }
  }

  showPrevCard() {
    if (this.state.cardNumber !== 0) {
      this.setState({cardNumber: this.state.cardNumber -= 1});
    }
  }

  setCard(card) {
    const newCards = this.state.cards.push(card);
    this.setState({cards: newCards});
  }

  getUserCards() {
    const url = `http://localhost:3001/users/2/flashcards/`;
    console.log(`Sending GET request to ${url}`);
    axios.get(url)
      .then(({data}) => {
        data.forEach((card) => {
          console.log('card');
          console.log(card);
          var cardObject = {
            word: card.question,
            description: card.answer,
            image: card.image_file_name,
          }
          console.log("this.state.cards");
          console.log(this.state.cards);
          console.log(this.state.cards);
          console.log(cardObject);
          console.log('this state cards[immutable]');
          console.log(this.state.cards.push(cardObject));
          this.setState({
            cards: this.state.cards.concat(cardObject),
          })
          console.log('after push cards');
          console.log(this.state.cards);
        })
        console.log(data);
      })
  }
  // generateDots() {
  //   const times = this.state.cards.size;
  //   let arr = [];
  //   _.times(times).forEach((num) => {
  //     const dotClass = num  === this.state.cardNumber ? 'active' : '';
  //     arr.push(
  //       <span
  //         className={`card-container__dot fa fa-circle ${dotClass}`}
  //         onClick={() => this.setState({cardNumber: num})}
  //       />
  //     )
  //   });
  //   return arr;
  // }

  generateCards() {
    const cards = this.state.cards;
    console.log("this is generateCards cards");
    console.log(cards);
     const cardsList = cards.map((card) => {
       console.log('card');
       console.log(card);
        return (
          <Card
            frontContent={card.word}
            backContent={card.description}
            showNextCard={this.boundShowNextCard}
            showPrevCard = {this.boundShowPrevCard}
            cardNumber={this.state.cardNumber}
          />
          );
      })
     return(cardsList[this.state.cardNumber]);
  }
  render() {
    return (
      <div>
        <span
            className='card-container__icon  fa fa-plus'
            onClick={() => {
              this.setState({showModal: !this.state.showModal});
            }}
          />
          <button onClick={this.boundGetUserCards}>getUserCards</button>
        {this.state.showModal
          ? <CreateCard
              onShadowClick={this.boundCallback}
              onCreateCard={this.boundCreateCard}
            />
          : ''}
        {this.generateCards()}
        {/* <div className='card-container__dots-wrapper'>
          {this.generateDots()}
        </div> */}
      </div>
   );
  }
}

class Main extends React.Component {
  onLoginComplete(user_id) {

  }
  render() {
    return (
      <div className='wrapper'>
        <Login onLoginComplete={this.onLoginComplete.bind(this)}/>
        <Logout />
        <Header />
        <div className='content-wrapper'>
          <CardContainer />
        </div>
      </div>
    );
  }
}
export default Main
