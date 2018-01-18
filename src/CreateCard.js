import React, { Component } from 'react';

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
