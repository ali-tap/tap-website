import React, { Component } from 'react';
import logo from './logo.svg';
import {Link} from 'react-router-dom';
import Img from '../../components/Img/Img.js';

class Logo extends Component {
  render() {
    return (
    <div className={this.props.className + ' lgogDiv '}>
      <Link to={'/'+this.props.language}>
          <Img src={logo} className="logo"/>
      </Link>
    </div>
    );
  }
}

export default Logo;
