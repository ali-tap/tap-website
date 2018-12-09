import React, { Component } from 'react';
import {observer} from 'mobx-react';

class TapTextArea extends Component {

  componentWillMount(){
    require('./tapTextArea.css');
  }

  render() {
    return (
      <React.Fragment>
        <textarea
          style={this.props.style}
          className='tapTextArea'
          placeholder={this.props.placeholder}
          onChange={this.props.onChange}
          />
      </React.Fragment>

    );
  }
}

export default observer(TapTextArea);
