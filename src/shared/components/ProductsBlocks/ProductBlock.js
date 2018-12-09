import React, { Component } from 'react';
import {Link}  from 'react-router-dom';
import root from 'window-or-global';

class ProductBlock extends Component {

  constructor(props) {
    super(props);
    this.state = {
      initialStyle:{
            width: (100*1/this.props.blocksNumber).toString()+'%',
            backgroundImage:'url('+this.props.image+')',
            backgroundColor: 'transparent'
      },
      hoverStyle:{
              width: (100*1/this.props.blocksNumber).toString()+'%',
              backgroundImage:'url('+this.props.hoverImage+')',
              backgroundColor: this.props.hoverColor,
      },
      style : {},
      ipadWidth : this.props.blocksNumber%2===0?'halfWidth':'',
      mobile: root.innerWidth<=767? true: false,
    };
  }

  componentDidMount() {
      this.determineStyleBasedOnWindowWidth();
      root.addEventListener("resize", this.determineStyleBasedOnWindowWidth.bind(this));
  }

  componentWillUnmount() {
      root.removeEventListener("resize", this.determineStyleBasedOnWindowWidth.bind(this));
  }

  determineStyleBasedOnWindowWidth() {
      this.setState({mobile: root.innerWidth<=767? true: false});
      if(this.state.mobile){
        this.changeStyle(this.state.hoverStyle);
      }
      else{
        this.changeStyle(this.state.initialStyle);
      }
  }

  onMouseOverOut(style){
    if(!this.state.mobile){
      this.changeStyle(style);
    }
  }

  changeStyle(newStyle){
      this.setState({ style : newStyle })
  }

  render() {
    return (
          <Link
            to={this.props.link}>
                <div
                  className={'productBlock '+this.state.ipadWidth}
                  style={this.state.style}
                  onMouseOver={()=>this.onMouseOverOut(this.state.hoverStyle)}
                  onMouseOut={()=>this.onMouseOverOut(this.state.initialStyle)}
                  >
                  <div className='productBlockTitle'>
                    <h2 className='blockTitle circe'>{this.props.title}</h2>
                    <h5 className={this.props.language==='en'?'blockSubtitle circe':'blockSubtitle'}>{this.props.subtitle}</h5>
                  </div>
                </div>
          </Link>
    );
  }
}

export default ProductBlock;
