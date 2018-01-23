import React, { Component } from 'react';
import Logout from './Logout';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    }
  }

  render() {
    return (
      <div className='header'>
        <div className='header-content header-content__left'>
          {/* <Logout
             user_id={this.props.user_id}
          onLogoutComplete={this.props.onLogoutComplete.bind(this)}
        /> */}
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
