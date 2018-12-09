import React, { Component } from 'react';
import menuIcon from './menuIcon.svg';
import Img from '../../components/Img/Img.js';

class MobileIcon extends Component {

  constructor(props) {
    super(props);
    this.state = {
      mobileMenuClassName: 'mobileMenu',
    };
  }

  render() {
    return (
    <div className='mobileIcon' onClick={this.props.onClick}>
	    <Img src={menuIcon} className="menuIcon"/>
    </div>
    );
  }
}

export default MobileIcon;
