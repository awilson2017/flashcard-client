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
      // description: '',
      // image: null,
      translatedWord: '',
      audioFileOnCreate: null,
      image: null,
      // audioFileOnCreate: '',
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

  onSelection() {
    this.setState({
      audioFileOnCreate: this.state
    })

  }





  render() {
    const errorMessage = this.state.showError ? 'Please fill in the word and description!' : '';
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
              this.state.audioFileOnCreate !== null &&
                <audio controls="controls"  src={this.state.audioFileOnCreate.mp3} autoPlay/>
            }

            <input value={this.state.translatedWord} placeholder="Your word in Korean" hidden/>

            <br />

            {/* <input
              id='description'
              placeholder="Description i.e. 'A front end js framework.'"
              value = {this.state.description}
              onChange = {(e) => this.setState({description: e.target.value})}
            /> */}

            <h1>Picture Upload</h1>
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
                  const formData = new FormData();

                  formData.append('image', this.state.image)
                  axios.post(`http://localhost:3001/flashcards?user_id=${this.props.user_id}&question=${this.state.translatedWord}`, formData, {
                    headers: {
                      'Content-Type': 'multipart/form-data'
                    }
                    // body: {
                    //   image: this.state.image
                    // }
                  })
                    .then(({data}) => {
                      console.log(data);
                    })
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
