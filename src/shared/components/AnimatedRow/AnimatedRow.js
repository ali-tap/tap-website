import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import root from 'window-or-global';

class AnimatedRow extends Component {

  constructor(props) {
    super(props);
    this.state = {
      componentYPosition: 0,
      animation: 'animationNotStarted'
    };
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentWillMount(){
    require('./animatedRow.css');
  }

  getBodyScrollTop(){
   const el = document.scrollingElement || document.documentElement;
   return el.scrollTop ;
 }

  handleScroll(){
    if(this.getBodyScrollTop() + 500 > this.state.componentYPosition){
      this.setState({
        animation: this.props.animation
      })
    }
  }

  componentDidMount(){
     root.addEventListener("scroll", this.handleScroll);
     this.setState({
      componentYPosition: ReactDOM.findDOMNode(this).getBoundingClientRect().top,
    });
  }

  componentWillUnmount(){
    root.removeEventListener("scroll", this.handleScroll);
  }

  render() {
    let itemsInRow = this.props.itemsInRow?this.props.itemsInRow:this.props.children.length;
    return (
      <div className="animatedRow" style={this.props.style}>
      {this.props.children.map((child,key)=>{
        return(
          <React.Fragment key={key}>
            <div
            key={key}
            className={this.props.animation?this.props.fullWidthOnMobile?'fullWidthOnMobile '+this.state.animation +' animatedDiv':this.state.animation +' animatedDiv':this.props.fullWidthOnMobile?'animatedDiv fullWidthOnMobile':'animatedDiv'}
            style={{width: this.props.divWidth?this.props.divWidth:'calc( '+(1/itemsInRow*100).toString()+'% - 10px )', margin: '5px'}}
            >
            {child}
            </div>
            {this.props.itemsInRow&&key+1===this.props.itemsInRow?<div className={this.props.fullWidthOnMobile?'noSpaceBetweenRowsOnMobile':''} style={{height:this.props.spaceBetweenRows?this.props.spaceBetweenRows:'20px'}}></div>:null}
          </React.Fragment>
        )
      })}
      </div>
    );
  }
}

export default AnimatedRow;
