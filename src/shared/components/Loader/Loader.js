import React, { Component } from 'react';
import Img from '../../components/Img/Img.js';
import {Loader} from '@tap-payments/loader';
import root from 'window-or-global';

class MyLoader extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pageHeight: ''
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentWillMount(){
    require('./loader.css');
  }

  componentDidMount() {
    root.addEventListener('resize', this.updateWindowDimensions);
    this.updateWindowDimensions();
  }

  componentWillUnmount() {
    root.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ pageHeight: root.innerHeight });
  }

  render() {

    return (
        <span className='loaderContainer fadeoutanimation' style={{height: this.state.pageHeight}}>
          <div className='loaderImage'>
            <Loader
            toggleAnimation={true}
            duration={2}
            />
          </div>
        </span>
    );
  }
}

export default MyLoader;
