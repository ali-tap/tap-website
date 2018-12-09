import React, { Component } from 'react';
import {observer} from 'mobx-react';
import Loader from '../../components/Loader/Loader.js'

class Page extends Component {


  componentWillMount(){
    if(this.props.link){
      let param = '';
      if(window.location.href.indexOf('?')>-1)
        {param = '?'+window.location.href.split('?')[1];}
      window.location.href = this.props.link+param;
    }
    else{
      let domain = window.location.href.replace('http://','').replace('https://','').split(/[/?#]/)[0];
      let redirectLink = window.location.href.replace(domain,domain+'/'+this.props.preferencesStore.language);
      window.location.href = redirectLink;
    }
  }

  render() {
    return (
      <div className="redirect">
        <Loader/>
      </div>
    );
  }
}

export default observer(Page);
