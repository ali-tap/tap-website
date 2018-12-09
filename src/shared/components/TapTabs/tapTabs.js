import React, { Component } from 'react';
import {observer} from 'mobx-react';

class TapTabs extends Component {

  componentWillMount(){
    require('./tapTabs.css');
  }

  render() {
    return (
      <div className='taptabs'>
        <div className=''>
        {this.props.children}
        </div>
      </div>
    );
  }
}

export default observer(TapTabs);
