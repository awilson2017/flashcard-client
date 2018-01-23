import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
// import _ from 'lodash';
// Custom Components
import Card from './Card';
import CreateCard from './CreateCard';

var _ = require('lodash');

class CardContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: props.userCards,
      cardNumber: 0
    };
    this.boundCallback = this.hideCreateCard.bind(this);
    this.boundCreateCard = this.setCard.bind(this);
    this.boundShowPrevCard = this.showPrevCard.bind(this);
    this.boundShowNextCard = this.showNextCard.bind(this);
  }
  hideCreateCard() {
    this.setState({showModal: false});
  }

  showNextCard() {
    if ((this.state.cardNumber + 1) !== this.props.userCards.size) {
      this.setState({cardNumber: this.state.cardNumber += 1});
    }
  }

  showPrevCard() {
    if (this.state.cardNumber !== 0) {
      this.setState({cardNumber: this.state.cardNumber -= 1});
    }
  }

  setCard(card) {
    const newCards = this.state.cards.concat(card);
    this.setState({cards: newCards});
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
        return (
          <Card
            frontContent={card.word}
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
            className='card-container__icon  fa fa-plus'
            onClick={() => {
              this.setState({showModal: !this.state.showModal});
            }}
          >
            add card
          </span>

        {this.state.showModal
          ? <CreateCard
              onShadowClick={this.boundCallback}
              onCreateCard={this.boundCreateCard}
              user_id={this.props.user_id}
            />
          : ''}

          {(this.state.cards !== null)
          ?
          <div>
            {this.generateCards()}

            <div className='card-container__dots-wrapper'>
              {this.generateDots()}
            </div>
          </div>
          :
            "Please add your first card"
          }


        {/* <div className='card-container__dots-wrapper'>
          {this.generateDots()}
        </div> */}
      </div>
   );
  }
}
export default CardContainer;
