import React, { Component } from 'react';
// import FileUpload from './FileUpload'
import axios from 'axios';
import AudioFiles from './AudioFiles'


const googleKey = process.env.REACT_APP_GOOGLE_KEY;

console.log(googleKey);


class CreateCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      word: '',
      description: '',
      image: null,
      translatedWord: '',
      audioFiles: null,
      audioFile: '',
      // showError: false
    }

  }

  // hideError() {
  //   this.setState({showError: !this.state.showError});
  // }
  getTranslation = () => {
    axios.get(`http://localhost:3001/google?query=${this.state.word}`)
    .then(({data}) => {
      this.setState({
        translatedWord: data
      }, () => {
        axios.get(`http://localhost:3001/forvo?translated=${this.state.translatedWord}`)
        .then(({data}) => {
          console.log('data');
          console.log(data);
          this.setState({
            audioFiles: data,
          })
          console.log(this.state.audioFiles);

          console.log('translated');
          console.log(this.state.translatedWord);

        })
      })
    })

  }

  // handleClick = () => {
  //   console.log("inside handleClick");
  //   this.getTranslation()
  //
  // }

  handleOnChange = (e) => {
    console.log(this);
    this.setState({
      word: this.search.value,
      // image: e.target.files[0],
    }
  )}

  onSelection() {
    this.setState({
      audioFile: this.state
    })

  }

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

            <div>
              {this.state.translatedWord  !== '' ?
              `${this.state.word} in Korean is ${this.state.translatedWord}` : ''}

              {console.log(this.state.audioFiles)}
            </div>

            <br />
            <input value={this.state.translatedWord} />


            <br />

            {
              this.state.audioFiles !== null &&

                <audio controls="controls" id="placeholder" src={this.state.audioFiles.mp3}/>

            }

            <br />

            <input
              id='description'
              placeholder="Description i.e. 'A front end js framework.'"
              value = {this.state.description}
              onChange = {(e) => this.setState({description: e.target.value})}
            />

            {/* <h1>Picture Upload</h1>
              <input
              id='description'
              type="file"
              multiple
              value = {this.state.description}
              onChange={(e) => this.setState({description: e.target.value})}
            /> */}


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
                    word: this.state.translatedWord,
                    description: this.state.description
                  };
                  this.props.onCreateCard(word);
                  console.log(this.props.onCreateCard(word));
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
