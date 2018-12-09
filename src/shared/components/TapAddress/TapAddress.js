import React, { Component } from 'react';
import TapButton from '../../components/TapButton/TapButton.js';

class TapAddress extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillMount(){
    require('./tapAddress.css');
  }

  render() {
    return (
      <React.Fragment>
      <div className='tapAddress'>
          <div className='tapAddressCountrySwitcher'>
              <div className='tapAddressCountry' style={{backgroundImage:'url('+'http://img.gotapnow.com/web/countryflag/Kuwait.png'+')'}}></div>
          </div>
          <div className='tapAddressBlockWithButton'>
          <div className='tapAddressBlock'>
              <div className='tapAdressTitle'>
                <div className='tapAddressIcon'></div>
                <div style={{width:'30px',display:'inline-block'}}></div>
                <b><h6 className='tapAdressText'>{this.props.title}</h6></b>
              </div>
              <div style={{height:'10px'}}></div>
              <div className='tapAdressDetails'>
                <div className='tapAdressDetailsIcon tapAddressIcon'></div>
                <div style={{width:'30px',display:'inline-block'}}></div>
                <h6 className='tapAdressText'>{this.props.address}</h6>
              </div>
              <div style={{height:'10px'}}></div>
              <div className='tapAdressPhoneNumber'>
                <div className='tapAdressPhoneNumberIcon tapAddressIcon'></div>
                <div style={{width:'30px',display:'inline-block'}}></div>
                <h6 className='tapAdressText'>{this.props.phoneNumber}</h6>
                <span className='visible-xs'>
                <div style={{height:'15px'}}></div>
                <TapButton
                  style={{width:'100%'}}
                  shape='bordered colored'
                  color={this.props.buttonColor}
                  hoverStyle={true}
                  text={this.props.buttonText}
                  onClick={()=>this.props.onButtonClick()}
                />
                </span>
              </div>
          </div>
          <div className='hidden-xs'>
          <div style={{height:'15px'}}></div>
          <TapButton
            style={{width:'100%'}}
            shape='bordered colored'
            color={this.props.buttonColor}
            hoverStyle={true}
            text={this.props.buttonText}
            onClick={()=>this.props.onButtonClick()}
          />
          </div>
          </div>
      </div>
      </React.Fragment>
    );
  }
}

export default TapAddress;
