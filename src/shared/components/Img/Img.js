import React, { Component } from 'react';

class Img extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  generateAlternativeText(src){
    return src?src.substring(src.lastIndexOf('/')+1,src.lastIndexOf('.')):'';
  }
  render() {
    return (<img
            src={this.props.src}
            alt={this.generateAlternativeText(this.props.src)}
            style={this.props.style}
            className={this.props.className}
            id={this.props.id}
            />);
  }
}

export default Img;
