import React, { Component } from 'react';
import pages from '../../dataSource/pages.json';
import root from 'window-or-global';
import activateProduct from '../../dataSource/activateProduct.json';
import Img from '../../components/Img/Img.js';
import CallToAction from '../../components/CallToAction/CallToAction.js';
import TapButton from '../../components/TapButton/TapButton.js';
import ErrorPage from '../../components/ErrorPage/ErrorPage.js';
import {Loader} from '@tap-payments/loader';
import animationData from './customLoaderStyle.json';
import axios from 'axios';
import { Route, Link, Redirect, Switch, withRouter } from 'react-router-dom'

class ActivatePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pageHeight: 0,
      response_message: '..',
      loading: true,
      loaderRotating: true,
      notFound: false,
      servererror: false
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentWillMount(){
    require('./activatePage.css');
    const preferencesStore = this.props.preferencesStore;
    preferencesStore.filterJsonStringsBasedOnLanguage(activateProduct);
    let activation_id = preferencesStore.pageUrlKeys['activationid'];
    activation_id?
      this.activate(activation_id)
      :
      this.setState({notFound: true});
  }

  setLoading(bool){
    if(bool){
      this.setState({loading:bool,loaderRotating:bool});
    }
    else{
      this.setState({loading:bool});
      setTimeout(
          function() {
              this.setState({loaderRotating:bool});
          }
          .bind(this),
          4500
      );
    }
  }

  activate(activation_id){
      axios.post('https://partners.payments.tap.company/api/V1.3/api/Activation/ActivateAccount?activation_id='+activation_id+'&language_code='+this.props.language,
      )
          .then(response => response.data)
          .then(data => {
            this.setLoading(false);
            this.setState({response_message:data.response_message})
          })
          .catch(error => {
            this.setLoading(false);
            this.setState({servererror: true})
          });
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

    let activateProductObj = activateProduct.filter(obj=>obj.product===this.props.product)[0];
    console.log(activateProductObj);

    return (
      <React.Fragment>
      {this.state.notFound?
        <Redirect to={'/notfound'}/>
        :
        <React.Fragment>
        {this.state.servererror?
          <ErrorPage {...this.props} preferencesStore={this.props.preferencesStore} error={'servererror'}/>
          :
          <div className='activatePage' style={{...this.props.style, height: this.state.pageHeight, backgroundColor: activateProductObj.color}}>
            <div className='activatePageConetent'>
                <React.Fragment>
                <div className={this.state.loaderRotating?'productSquarePlaceHolder':'productSquarePlaceHolderglow productSquarePlaceHolder'} style={{}}>
                <Loader
                  toggleAnimation={this.state.loading}
                  duration={5}
                  animationData={animationData}
                />
                </div>
                  <div className='myOpacityTransition myHeightTransition' style={{opacity:this.state.loaderRotating?'0':'1',maxHeight:this.state.loaderRotating?'0':'300px'}}>
                      <div style={{height:'25px'}}></div>
                      <h2 className='activateProductMessage'>{this.state.response_message}</h2>
                      {activateProductObj.actionType==='sms'?
                      <CallToAction
                          callToAction={activateProductObj}
                          country_code={this.props.country}
                          language={this.props.language}
                          color={activateProductObj.color}
                          center={true}
                      />
                      :
                      <React.Fragment>
                      <div style={{height:'25px'}}></div>
                      <TapButton
                          text={activateProductObj.buttonText}
                          shape='bordered'
                          color={activateProductObj.color}
                      />
                      </React.Fragment>
                      }
                  </div>
                </React.Fragment>
            </div>
          </div>
        }
        </React.Fragment>
      }
      </React.Fragment>
    );
  }
}

export default ActivatePage;
