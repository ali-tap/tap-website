import React, { Component } from 'react';
import {observer} from 'mobx-react';
import TapInput from '../../components/TapInput/TapInput.js'
import TapButton from '../../components/TapButton/TapButton.js';
import LightBox from '../../components/LightBox/LightBox.js';

class DownloadApp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      openLightBox: false,
    };
  }

  openLightBoxFunction(){
      this.setState({
        openLightBox: true,
      });
  }

  closeLightBoxFunction(){
    this.setState({
      openLightBox: false,
    });
  }

  handleKeyPress(event,send_sms,redirectLink){
      if(event.which === 13) {
        this.props.store.sendSms(this.props.product,this.props.source,send_sms,redirectLink);
      }
  }

  getLink(link){
    if(typeof link==='string'){
      return link;
    }
    else{
    let userAgent = navigator.userAgent || navigator.vendor || window.opera;
    let returnValue =  '';
      if (/android/i.test(userAgent)) {
          returnValue = link["android"];
      }

      else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
          returnValue =  link["ios"];
      }

      else{
          returnValue = link["ios"];
      }

      return returnValue;
    }
  }

  autoOpenLink(){
    if(window.location.href.indexOf('download=true')>-1){
      window.location.href = this.getLink(this.props.link);
    }
  }

  render() {
    this.autoOpenLink();
    return (
      <div className="downloadApp">
          <div className="hidden-xs">
          <div>
          <div className={this.props.store.showSuccessMsg?'sendSmsForm fadeOutItem':'sendSmsForm fadeInItem'}
               style={{transitionDelay:this.props.store.showSuccessMsg?'0s':'1s'}}
          >
          <TapInput
                type='text'
                placeholder={this.props.placeholder}
                inputFunction='countryPicker'
                countryCode={this.props.countryCode}
                store={this.props.store}
                onChange={(e)=>this.props.store.getValue(e)}
                onKeyPress={(e)=>this.handleKeyPress(e,1,this.getLink(this.props.link))}
                />
          <div className="fieldsSpace"></div>
          <TapButton
                type='button'
                text={this.props.buttonText}
                fontAwesomeIcon={<i className="fas fa-arrow-circle-down"></i>}
                shape='bordered'
                store={this.props.store}
                actionType={this.props.actionType}
                color={this.props.color}
                onClick={()=>this.props.store.sendSms(this.props.product,this.props.source,1,'')}
                />
          </div>
          <p className={this.props.store.showSuccessMsg?'msg successMessage fadeInItem':'msg successMessage fadeOutItem'}
              style={{transitionDelay:this.props.store.showSuccessMsg?'1s':'0s'}}>
              {this.props.store.successMsg}
          </p>
          </div>
          <p className={this.props.store.showValidateMsg?'msg validateMsg fadeInItem':'msg validateMsg fadeOutItem'}>
            {this.props.store.validateMsg}
          </p>
          </div>
          <div className='visible-xs'>
            {window.location.href.indexOf('download=true')>-1?
            <TapButton
                  type='link'
                  link={this.getLink(this.props.link)}
                  text={this.props.linkText}
                  fontAwesomeIcon={<i className="fas fa-arrow-circle-down"></i>}
                  shape='bordered'
                  actionType={this.props.actionType}
                  language={this.props.language}
                  color={this.props.color}
              />
              :
            <React.Fragment>
            <TapButton
                type='button'
                text={this.props.linkText}
                fontAwesomeIcon={<i className="fas fa-arrow-circle-down"></i>}
                shape='bordered'
                actionType={this.props.actionType}
                language={this.props.language}
                color={this.props.color}
                className='openLightBox'
                onClick={()=>this.openLightBoxFunction()}
            />
            <LightBox
              open={this.state.openLightBox}
              onClick={()=>this.closeLightBoxFunction()}
            >
                <p className="grayText">{this.props.actionTitle}</p>
                <TapInput
                      type='text'
                      placeholder={this.props.placeholder}
                      inputFunction='countryPicker'
                      countryCode={this.props.countryCode}
                      store={this.props.store}
                      onChange={(e)=>this.props.store.getValue(e)}
                      onKeyPress={(e)=>this.handleKeyPress(e,0,this.getLink(this.props.link))}
                      style={{border:'1px solid #eaeaea'}}
                />
                <div style={{height:'10px'}}></div>
                <TapButton
                      type='button'
                      id='CloseLightBox'
                      text={this.props.linkText.substr(0, this.props.linkText.indexOf(' '))}
                      fontAwesomeIcon={<i className="fas fa-arrow-circle-down"></i>}
                      shape='bordered colored'
                      actionType={this.props.actionType}
                      language={this.props.language}
                      color={this.props.color}
                      hoverStyle={true}
                      onClick={()=>this.props.store.sendSms(this.props.product,this.props.source,0,this.getLink(this.props.link))}
                  />
                <p className={this.props.store.showValidateMsg?'msg validateMsg fadeInItem grayText':'msg validateMsg fadeOutItem grayText'}>
                  {this.props.store.validateMsg}
                </p>
            </LightBox>
            </React.Fragment>
            }
          </div>
      </div>
    );
  }
}

export default observer(DownloadApp);
