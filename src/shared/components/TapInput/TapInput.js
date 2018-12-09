
import React, { Component } from 'react';
import TapSelect from '../../components/TapSelect/TapSelect.js';
import {observer} from 'mobx-react';

class TapInput extends Component {

  componentWillMount(){
    require('./TapInput.css');
  }

  render() {
    return (
      <div className='inputContainer' style={this.props.style}>
          <div>
            {this.props.inputFunction?<TapSelect store={this.props.store}
                     className={this.props.inputFunction}/>:
                  <div></div>}

            <input
                   placeholder={this.props.placeholder}
                   className={this.props.inputFunction?'extraPadding tapInput':'tapInput'}
                   type={this.props.type}
                   onChange={this.props.onChange}
                   onKeyPress={this.props.onKeyPress}/>
          </div>
      </div>
    );
  }
}

export default observer(TapInput);
