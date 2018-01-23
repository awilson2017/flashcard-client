import React from 'react';
import axios from 'axios';

class Card extends React.Component {

  constructor() {
    super();
    this.state = {
      showAnswer: false,
      audio: null,
    }
    this.getAudio = this.getAudio.bind(this);
  }

  // onClick flips the card
  onClick = () =>{
    console.log('onClick flipping card');
    this.setState({
      showAnswer: !this.state.showAnswer
    }, this.getAudio());
  }

  // function is used in onClick
  getAudio = () => {
    console.log("i am in getAudio");
    console.log(this.props.frontContent);
    console.log('state.audio');
    console.log(this.state.audio);
    axios.get(`http://localhost:3001/forvo?translated=${this.props.frontContent}`)
      .then(({data}) => {
        console.log(data);
        if (data === null ) {
          <div>No Audio for thie card</div>
        } else {
          console.log(data);
          this.setState({
            audio: data.mp3
          })
        }
      })
  }

  render() {
    console.log(this.state.audio);
    const content = this.state.showAnswer
    ? (this.state.audio !== null &&
      <div className="backContent">
        <audio className="card__audio" controls="controls" src={this.state.audio} autoPlay/>
        <img className="card__image" src={this.props.backContent}/>
      </div>)
      : this.props.frontContent
    // const content = this.state.showAnswer ? ( this.props.backContent) : this.props.frontContent;
    const iconClass = this.state.showAnswer ? 'reply' : 'share';
    const cardClass = this.state.showAnswer ? 'back' : '';
    const contentClass = this.state.showAnswer ? 'back' : 'front';
    const actionClass = this.state.showAnswer ? 'active' : '';

    return (
      <div
        className={`card ${cardClass}`}
        onClick={this.onClick}
        // onClick={() => this.setState({
        //   showAnswer: !this.state.showAnswer
        // })}
      >
      <span className='card__counter'>{this.props.cardNumber + 1}</span>
        <div
          className='card__flip-card'
          onClick={ () => {
            this.setState({
              showAnswer: !this.state.showAnswer
            });
          }}
        >

          <span className={`fa fa-${iconClass}`}/>
        </div>

        <div className={`card__content--${contentClass}`}>
          {/* {this.state.showAnswer
            ? (this.state.audio !== null && <audio controls="controls" src={this.state.audio} autoPlay/>)
            : this.props.frontContent} */}
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

export default Card
