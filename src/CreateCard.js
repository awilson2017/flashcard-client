import React, { Component } from 'react';
// import FileUpload from './FileUpload'
import axios from 'axios';
import AudioFiles from './AudioFiles'


class CreateCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      word: '',
      translatedWord: '',
      audioFileOnCreate: null,
      image: null,
      showError: false,
    }
  }

  hideError() {
    this.setState({showError: !this.state.showError});
  }

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
            audioFileOnCreate: data,
          })
          console.log(this.state.audioFileOnCreate);

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

  render() {
    const errorMessage = this.state.showError ? 'Please press Translate and upload an image!' : '';
    console.log(this.props.user_id);
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
              placeholder="English word i.e. 'cat'"
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

            <br />
            <br />

            <div>
              {this.state.translatedWord  !== '' ?
              `Korean Translation:  ${this.state.translatedWord}` : ''}

              {console.log(this.state.audioFileOnCreate)}
            </div>

            <br />

            {

              (this.state.audioFileOnCreate !== null) &&
                <audio controls="controls"  src={this.state.audioFileOnCreate.mp3} autoPlay/>

              // :
              //   <div>No audio for this word</div>
              }
              {/* // this.state.audioFileOnCreate !== null &&
              //   <audio controls="controls"  src={this.state.audioFileOnCreate.mp3} autoPlay/> */}


            <h2>Picture Upload</h2>
              <input
              id='description'
              type="file"
              multiple
              // value = {this.state.image}
              onChange={(e) => {this.setState({image: e.target.files[0]})
              console.log(e.target.files[0]);}
            }
            />


            <br/>

            <button
              id='create-card__button'
              onClick={() => {
                if (this.state.word.length === 0) {

                // if (this.state.word.length === 0 || this.state.image === null) {
                  this.setState({
                    showError: !this.state.showError
                  });
                  setTimeout(() => this.hideError(), 2000);
                } else {
                  this.props.onShadowClick();
                  const word = {
                    word: this.state.translatedWord,
                    image: this.state.image
                  };

                  const formData = new FormData();

                  formData.append('image', this.state.image)

                  axios.post(`http://localhost:3001/flashcards?user_id=${this.props.user_id}&question=${this.state.translatedWord}`, formData, {
                    headers: {
                      'Content-Type': 'multipart/form-data'
                    }
                  })
                    .then(({data}) => {
                       this.props.onCreateCard(data)
                     })
                   }
              }}
              >

                Create!
              </button>
              <div className='create-card__error'>
                {errorMessage}
              </div>

              <input value={this.state.translatedWord} placeholder="Your word in Korean" hidden/>

            </div>
          </div>
        </div>
        );
      }
    }

    export default CreateCard;
