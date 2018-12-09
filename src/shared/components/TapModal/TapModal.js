import React, { Component } from 'react';
// import './TapModal.css'

class TapModal extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }


  render() {
    return(
      <div className="tapModal">
      {this.props.children}
      </div>
    )
  }
}

export default TapModal;
