import React, { Component } from 'react';

class Separator extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillMount() {
    require('./Separator.css');
  }

  render() {
    return (
      <div className="separator" style={{width:this.props.width}}>
      </div>
    );
  }
}

export default Separator;
