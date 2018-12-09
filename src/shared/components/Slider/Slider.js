import React, { Component } from 'react';
import ArrowControls from './ArrowControls.js'

class Slider extends Component {

  constructor(props) {
    super(props);
    this.state = {
      children: this.props.children,
      SliderWidth: (React.Children.count(this.props.children)*100).toString(),
      bannerWidth: 100*1/React.Children.count(this.props.children).toString(),
      right:'unset',
      left:'unset',
      childrenActive:[],
      hideControls: '',
      languageSlideDirection:'',
      smooth: true,
      bulletsActive:[],
    };
  }

  componentWillUpdate(){
    
  }

  componentWillMount(){
    require('./slider.css');
    if(this.props.language==='ar'){
        this.setState({ left: '0', languageSlideDirection: 'left' });
    }
    else{
        this.setState({ right: '0', languageSlideDirection: 'right'});
    }

    if(this.props.children.length===1){
        this.setState({ hideControls: 'hideControls'});
    }
    this.props.children.map((child,key)=>{key===0?this.state.childrenActive.push('active'):this.state.childrenActive.push('')});
    this.props.children.map((child,key)=>{key===0?this.state.bulletsActive.push('bullet active'):this.state.bulletsActive.push('bullet')});
  }

  updateWindowDimensions() {

  }

  goNext(smooth,numberOfClicks){
    this.changeBulletsActive('forward');
    this.setState({
      smooth: smooth
    });
    numberOfClicks = numberOfClicks*100;
    if(parseInt(this.state[this.state.languageSlideDirection])+numberOfClicks<parseInt(this.state.SliderWidth)){
      this.setState({
        [this.state.languageSlideDirection]: parseInt(this.state[this.state.languageSlideDirection])+numberOfClicks+'%',
      });
      for (let i = 0; i < this.state.childrenActive.length; i++) {
          if (this.state.childrenActive[i] === 'active') {
              if(i+1 < this.state.childrenActive.length && smooth){
                this.state.childrenActive[i] = '';
                this.state.childrenActive[i+1] = 'active';
              }
              break;
          }
      }
    }
    else{
      this.state.children.push(this.state.children.shift());
      this.goBack(false,1);
      setTimeout(
          function() {
              this.goNext(true,1);
          }
          .bind(this),
          10
      );
    }
    this.setState();
  }

  goBack(smooth,numberOfClicks){
    this.changeBulletsActive('backward');
    this.setState({
      smooth: smooth
    });
    numberOfClicks = numberOfClicks*100;
    if(parseInt(this.state[this.state.languageSlideDirection])-numberOfClicks>=0){
      this.setState({
        [this.state.languageSlideDirection]: parseInt(this.state[this.state.languageSlideDirection])-numberOfClicks+'%',
      });
      for (let i = 0; i < this.state.childrenActive.length; i++) {
          if (this.state.childrenActive[i] === 'active') {
              if(i-1>=0 && smooth){
                this.state.childrenActive[i] = '';
                this.state.childrenActive[i-1] = 'active';
              }
              break;
          }
      }
    }
    else{
      this.state.children.unshift(this.state.children.pop());
      this.goNext(false,1);
      setTimeout(
          function() {
              this.goBack(true,1);
          }
          .bind(this),
          10
      );
    }
    this.setState();
  }

  changeBulletsActive(forwardOrBackward){
    if(forwardOrBackward==='forward' ){
      this.state.bulletsActive.unshift(this.state.bulletsActive.pop());
    }
    else if(forwardOrBackward==='backward' ){
      this.state.bulletsActive.push(this.state.bulletsActive.shift());
    }
    this.setState();
  }

  bulletClick(key){
    let active;
    this.state.bulletsActive.map((bulletActive,key)=>{bulletActive==='bullet active'?active=key:null});
    let iritations =  Math.abs(key-active);
      for (let i = 0; i < iritations; i++) {
                if(key>active){
                  this.goNext(true,iritations);
                }
                else if(key<active){
                  this.goBack(true,iritations);
                }
    }
    this.setState();
  }


  render() {
    let style ={};
    {this.props.oneBackground?
          style={backgroundColor:this.props.backgroundColor,
                 backgroundImage:'url('+this.props.backgroundImage+')',
                 backgroundPosition: this.props.backgroundPosition,
                 backgroundSize: this.props.backgroundSize
          }:
          style={}
    }
    return (
      <div className={this.props.hideOnSmall?"sliderContainer hideOnSmall fadeinanimation":"sliderContainer fadeinanimation"} style={style}>
      <ArrowControls
        hideControls={this.state.hideControls}
        languageSlideDirection={this.state.languageSlideDirection}
        goBack={()=>this.goBack(true,1)}
        goNext={()=>this.goNext(true,1)}
      />
      <div className={this.state.smooth?'slider smooth':'slider'} style={{width:this.state.SliderWidth+'%',right:this.state.right, left:this.state.left}}>
          {this.state.children.map((child,key)=>
            <div key={key} className="slideContainer" style={{width:this.state.bannerWidth+'%'}}>
              {React.cloneElement(child, { active: this.state.childrenActive[key], noBackground: this.props.oneBackground?true:false})}
            </div>
          )}
      </div>
        <div className={"bulletsControls "+this.state.hideControls}>
          {this.state.bulletsActive.map((bulletActive,key)=>{
            return <div
                    key={key}
                    className={bulletActive}
                    onClick={()=>this.bulletClick(key)}
                    ></div>
          })}
        </div>
      </div>
    );
  }
}

export default Slider;
