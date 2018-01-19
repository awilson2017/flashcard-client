import React from 'react';
import axios from 'axios';
import Card from './Card';
import CreateCard from './CreateCard';

class CardContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // console.log(this.props.userCards);
      // cards: [],
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
    const newCards = this.state.cards.push(card);
    this.setState({cards: newCards});
  }


  getUserCards() {
    console.log('app.js userCards');
    console.log(this.props.user_id);
    console.log('this.props');
    console.log(this.props);
    console.log(this.props.userCards);
    const url = `http://localhost:3001/users/${this.props.user_id}/flashcards/`;
    console.log(url);
    console.log(`Sending GET request to ${url}`);
    axios.get(url)
      .then(({data}) => {
        data.forEach((card) => {
          console.log('card');
          // console.log(card);
          var cardObject = {
            word: card.question,
            description: card.answer,
            image: card.image_file_name,
          }
          console.log(cardObject);

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
    const apiFormatedCards = this.props.userCards;
    const cards = [];
    apiFormatedCards.forEach((card) => {
      console.log('card');
      var cardObject = {
        word: card.question,
        description: card.answer,
        image: card.image_file_name,
      }
      console.log(cardObject);
      cards.push(cardObject)
      console.log(cards);
    })
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
export default CardContainer;
