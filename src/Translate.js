import React, { Component } from 'react';
import axios from 'axios';

const googleKey = process.env.REACT_APP_GOOGLE_KEY;

console.log(googleKey);
class Translate extends Component {
  state = {
    query: '',
    codedQuery: '',
    translatedWord: '',
  }

  getInfo = () => {
    // console.log('this.state.query');
    // console.log(this.state.query);
    // console.log('axios.post');

    // console.log(process.env);

     axios.post(`https://translation.googleapis.com/language/translate/v2/?key=${googleKey}&q=${this.state.query}&source=en&target=ko&format=text`)
      .then(({data}) =>{
        console.log('data.data');
        console.log(data.data);
        console.log('data.data.translations');
        console.log(data.data['translations']);
        console.log('[0]');
        console.log(data.data['translations'][0]['translatedText']);

        this.setState({
          translatedWord: data.data['translations'][0]['translatedText'],
        })
      })
  }

  handleInputChange = () => {
    console.log(this);
    this.setState({
      query: this.search.value,
    }, () => {
      if (this.state.query && this.state.query.length > 1) {
        this.getInfo()
      }
    }
  )}

  render() {
    return (
      <form>
        <input
          placeholder="Search for..."
          ref={input => this.search = input}
          onChange={this.handleInputChange}
        />

        <p>{this.state.query}</p>
        <p>{this.state.translatedWord}</p>
      </form>
    )
  }
}

export default Translate
