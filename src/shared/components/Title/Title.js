import React, { Component } from 'react';

class Title extends Component {

  render() {
    return (
      <div style={{position:'relative'}}>
        <h5 style={this.props.style}>{this.props.title}</h5>
        {this.props.separator}
      </div>
    );
  }
}

export default Title;
