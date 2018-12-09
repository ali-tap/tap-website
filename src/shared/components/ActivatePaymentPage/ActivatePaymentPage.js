import React, { Component } from 'react';
import pages from '../../dataSource/pages.json';
import root from 'window-or-global';
import paymentMethods from '../../dataSource/paymentMethods.json';
import Img from '../../components/Img/Img.js';
import ErrorPage from '../../components/ErrorPage/ErrorPage.js';
import {Loader} from '@tap-payments/loader';
import animationData from './customLoaderStyle.json';
import axios from 'axios';
import { Route, Link, Redirect, Switch, withRouter } from 'react-router-dom'

class ActivatePayment extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pageHeight: 0,
      response_message: '..',
      loading: true,
      loaderRotating: true,
      notFound: false,
      servererror: false,
      paymentMethod: {}
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentWillMount(){
    require('./activatePayment.css');
    const preferencesStore = this.props.preferencesStore;
    preferencesStore.filterJsonStringsBasedOnLanguage(paymentMethods);
    let access_token = preferencesStore.pageUrlKeys['access_token'];
    access_token?
      this.activate(access_token)
      :
      this.setState({notFound:true});
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
          3500
      );
    }
  }

  includebreaks(text){
      return text.split("\n").map((text,key)=><span key={key}>{text}<br/></span>);
  }

  activate(enable_payment_request_token){
      axios.post('https://partners.payments.tap.company/api/V1.3/api/Account/EnablePaymentOption?enable_payment_request_token='+enable_payment_request_token,
      )
          .then(response => response.data)
          .then(data => {
            // console.log('data');
            console.log(data);
            if(data.response_code==='101'){
              this.setLoading(false);
              this.setState({notFound:true});
            }
            else{
              this.setLoading(false);
              let payment_method_id = data.payment_method_id;
              let user_id = data.merchant_id;
        		  let email_address = data.email_address;
              let profile_name = data.profile_name;
              this.props.preferencesStore.setIntercomeUser(user_id,email_address,profile_name);
              this.setState({paymentMethod: paymentMethods.filter(paymentMethod=>paymentMethod.id===payment_method_id)[0]})
            }
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

    return (
      <React.Fragment>
      {this.state.notFound?
        <Redirect to={'/notfound'}/>
        :
        <React.Fragment>
        {this.state.servererror?
          <ErrorPage {...this.props} preferencesStore={this.props.preferencesStore} error={'servererror'}/>
          :
          <div className='activatePaymentPage' style={{ background:'#c7c7c7', height: this.state.pageHeight}}>
            <div className='activatePaymentPageBackground' style={{background: this.state.paymentMethod.background?this.state.paymentMethod.background:'#c7c7c7', opacity: this.state.paymentMethod.background?'1':'0'}}>
            </div>
              <div className='activatePaymentPageConetent'>
                  <React.Fragment>
                  {this.state.loaderRotating?
                    <div style={{width: '110px', height: '110px', margin:'auto', padding:'15px'}}>
                      <Loader
                        toggleAnimation={this.state.loading}
                        duration={5}
                        animationData={animationData}
                      />
                    </div>
                    :
                    <div className={this.state.loaderRotating?'paymentSquarePlaceHolder':'paymentSquarePlaceHolderglow paymentSquarePlaceHolder'} style={{}}>
                      <Img className='paymentMethodImage' src={this.state.paymentMethod.image} style={{width:'100%'}}/>
                    </div>
                  }
                    <div className='myOpacityTransition1 myHeightTransition1' style={{opacity:this.state.loaderRotating?'0':'1',maxHeight:this.state.loaderRotating?'0':'300px'}}>
                        <div style={{height:'30px'}}></div>
                        <h4 className='activatePaymentMessage'>{this.state.paymentMethod.paragraph?this.includebreaks(this.state.paymentMethod.paragraph):''}</h4>
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

export default ActivatePayment;
