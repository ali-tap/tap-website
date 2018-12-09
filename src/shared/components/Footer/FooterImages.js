import React, { Component } from 'react';
import Img from '../../components/Img/Img.js';

class FooterImages extends Component {

  imagesComposer(images){
    let returnValue = [];
    if(images.appsStores){
      returnValue.push(images.appsStores.map((image,key)=> <React.Fragment key={key}><div className="imageSpace"></div><Img className="footerImage appsStores" src={image}/></React.Fragment>));
      returnValue.push(<div key='space1'><br/></div>);
    }
    if(images.paymnetMethods){
      returnValue.push(images.paymnetMethods.map((image,key)=> <React.Fragment key={key}><div className="imageSpace"></div><Img className="footerImage paymnetMethods" src={image}/></React.Fragment>));
      returnValue.push(<div key='space2'><br/></div>);
    }
    if(images.securityMethods){
      returnValue.push(images.securityMethods.map((image,key)=> <React.Fragment key={key}><div className="imageSpace"></div><Img className="footerImage securityMethods" src={image}/></React.Fragment>));
    }
    return returnValue;
  }

  render() {
    return (
        <div className="footerImages">
          {this.imagesComposer(this.props.footerImages)}
        </div>
    );
  }
}

export default FooterImages;
