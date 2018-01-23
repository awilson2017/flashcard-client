import React, { Component } from 'react';
import Logout from './Logout';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    }
  }

  onLogoutCompleteHeader(user_id) {

    this.props.onLogoutComplete(user_id)
    console.log(user_id);
    // this.setState({
    //   user_id: null,
    // })
  }

  render() {
    console.log(this.props.user_id);
    return (
      <div className='header'>
        <div className='header-content header-content__left'>
          <Logout
             user_id={this.props.user_id.user_id}
          onLogoutComplete={this.onLogoutCompleteHeader.bind(this)}
        />
        </div>

        <div className='header-content header-content__middle'>
          Flash Cards
        </div>
        <div className='header-content header-content__right'>

        </div>
      </div>
    )
  }
}

export default Header;
