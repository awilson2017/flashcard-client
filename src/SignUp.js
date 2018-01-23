import React from 'react';
import axios from 'axios';
class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    axios.post(`http://localhost:3001/users?login=${e.target[0].value}`)
      .then(({data}) => {

        console.log(data);
        console.log(data.id);
        this.props.onSignUpComplete(data.id);
      })
  }

  render() {
    return(
      <form name="sign-up"
        className="form"
        onSubmit={this.handleSubmit}>
        {/* <label>Sign Up</label> */}
        <input type="text" placeholder="Sign Up"/>
        <input type="submit" />
      </form>
    );
  }
}

export default SignUp;
