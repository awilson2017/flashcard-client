import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
// import _ from 'lodash';
// Custom Components
import Card from './Card';
import CreateCard from './CreateCard';
import Header from './Header';

var _ = require('lodash');
var FontAwesome = require('react-fontawesome');

class CardContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: props.userCards,
      cardNumber: 0,
    };
    this.boundCallback = this.hideCreateCard.bind(this);
    this.boundCreateCard = this.setCard.bind(this);
    this.boundShowPrevCard = this.showPrevCard.bind(this);
    this.boundShowNextCard = this.showNextCard.bind(this);
  }
  debugger

  hideCreateCard() {
    this.setState({showModal: false});
  }

  showNextCard() {
    if ((this.state.cardNumber + 1) !== this.props.userCards.size) {
      this.setState({cardNumber: this.state.cardNumber += 1});
      // this.nullAudioState()
    }
  }

  showPrevCard() {
    if (this.state.cardNumber !== 0) {
      this.setState({cardNumber: this.state.cardNumber -= 1});
      // this.nullAudioState();
    }
  }

  nullAudioState() {
    this.setState({
      audio: null,
    })
  }

  onLogoutComplete(user_id) {
    this.props.onLogoutComplete(user_id)
  }

  setCard(card) {
    console.log(card);
    axios.get(`http://localhost:3001/users/${this.props.user_id}/flashcards/${(card.id)}`)
      .then(({data}) => {
        // console.log(data);
        // console.log(data.image_url);
        var cardObject = {
          question: card.question,
          image: data.image_url,
        }
        // console.log('cardObject');
        // console.log(cardObject);
        const newCards = this.state.cards.concat(cardObject);
        console.log(newCards);
        this.setState({cards: newCards});
      })
  }

  generateDots() {
    const times = this.state.cards.length;
    let arr = [];
    console.log(times);
    _.times(times).forEach((num) => {
      const dotClass = num  === this.state.cardNumber ? 'active' : '';
      arr.push(
        <span
          className={`card-container__dot fa fa-circle ${dotClass}`}
          onClick={() => this.setState({
            cardNumber: num

          })}
        />
      )
    });
    return arr;
  }

  generateCards() {
     const cards = this.state.cards;
     console.log(this.state.cards);

     const cardsList = cards.map((card) => {
       console.log('card');
       console.log(cards);
console.log('card.image_url');
console.log(card.image_url);
        return (
          <Card
            frontContent={card.question}
            backContent={card.image}
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
            name='plus'
            className='card-container__icon  fa fa-plus'
            onClick={() => {
              this.setState({showModal: !this.state.showModal});
            }}
          >
            ＋
            {/* f067 */}
            {/* add card */}
          </span>
          <Header
             user_id={this.state.user_id}
             onLogoutComplete={this.onLogoutComplete.bind(this)}
          />

        {this.state.showModal
          ? <CreateCard
              onShadowClick={this.boundCallback}
              onCreateCard={this.boundCreateCard}
              user_id={this.props.user_id}
            />
          : ''}

          {(this.state.cards !== [])
          ?
          <div>
            {this.generateCards()}

            <div className='card-container__dots-wrapper'>
              {this.generateDots()}
            </div>
          </div>
          :
            'Please add your first card'
          }


        {/* <div className='card-container__dots-wrapper'>
          {this.generateDots()}
        </div> */}
      </div>
   );
  }
}
export default CardContainer;
