import React, { Component } from 'react';
import axios from 'axios';

const googleKey = process.env.REACT_APP_GOOGLE_KEY;
const forvoKey= process.env.REACT_APP_FORVO_KEY;

console.log(googleKey);
console.log(forvoKey);


class CreateCard extends Component {
  constructor() {
    super();
    this.state = {
      word: '',
      description: '',
      image: '',
      word: '',
      translatedWord: '',
      // showError: false
    }
  }

  // hideError() {
  //   this.setState({showError: !this.state.showError});
  // }
  getTranslation = () => {
     axios.post(`https://translation.googleapis.com/language/translate/v2/?key=${googleKey}&q=${this.state.word}&source=en&target=ko&format=text`)
      .then(({data}) => {
        console.log(data.data['translations'][0]['translatedText']);
        this.setState({
          translatedWord: data.data['translations'][0]['translatedText'],
        }, () => {
          axios.get(`http://localhost:3001/forvo?translated=${this.state.translatedWord}`)
            .then(({data}) => {
              console.log('data');
              console.log(data);
            })
            
        })
      })

  }



  getAudio = () => {
    axios.get(`https://apifree.forvo.com/action/word-pronunciations/format/json/word/${this.state.translatedWord}/key/${forvoKey}`)
  }

  handleClick = () => {
    console.log("inside handleClick");
    this.getTranslation()

  }

  handleOnChange = () => {
    console.log(this);
    this.setState({
      word: this.search.value,
    }
  )}

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
              ref={input => this.search = input}
              value = {this.state.word}
              onChange={this.handleOnChange}
              // onChange = {(e) => this.setState({word: e.target.value})}
            />
            <button
              onClick={this.getTranslation}
              >
                Translate
            </button>
            {/* TODO add image upload */}

            <p>
              {this.state.translatedWord !== '' ? `${this.state.word} in Korean is ${this.state.translatedWord}` : ''}
            </p>

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
                  const word = {
                    word: this.state.word,
                    description: this.state.description
                  };
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

export default CreateCard;
