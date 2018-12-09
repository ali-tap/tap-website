import React, { Component } from 'react';
import Img from '../../components/Img/Img.js';
import errors from './errors.json';
class NotFound extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillMount(){
      require('./notFound.css');
      let lang = this.props.language || (this.props.location && this.props.location.pathname.split('/')[2]);
      this.props.preferencesStore.setLanguage(lang);
      this.props.preferencesStore.filterJsonStringsBasedOnLanguage(errors);
  }

  render() {
    let errorObj = errors.filter(error=>error.error===this.props.error)[0];
    return (
          <div className='notFound'>
              <div className='notFoundContent'>
                <Img className='notFoundImage' src={errorObj.error_image}/>
                <div style={{height:'0px'}}></div>
                <h1 className='notFoundTitle'>{errorObj.error_number}</h1>
                <h1 className='notFoundParagraph'>{errorObj.error_message}</h1>
              </div>
          </div>
    );
  }
}

export default NotFound;


// import React from 'react'
//
// export default function NotFound () {
//   require('./notFound.css');
//
//   return (
//     <div className='notFound'>
//         <div className='notFoundContent'>
//           <Img className='notFoundImage' src='https://www.tap.company/errors/404_black.svg'/>
//           <div style={{height:'0px'}}></div>
//           <h1 className='notFoundTitle'>404</h1>
//           <h1 className='notFoundParagraph'>page not found</h1>
//         </div>
//     </div>
//   )
// }
