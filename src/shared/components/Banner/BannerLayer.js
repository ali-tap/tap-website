import React, { Component } from 'react';

class BannerLayer extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {

  }

  setActiveOrNot(active){
  	if(active && active==='active'){
  		return this.props.className + ' ' + this.props.animation + ' ' + 'bannerLayer';
  	}
  	else{
  		return this.props.className+ ' '+ 'opacityZero' + ' ' + 'bannerLayer';
  	}
  }

  render() {
    return (
          <div className={this.setActiveOrNot(this.props.active)} style={{width:this.props.width?this.props.width:''}}>
              {this.props.children}
          </div>
    );
  }
}

export default BannerLayer;
