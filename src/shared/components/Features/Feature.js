import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import FeatureDescription from './FeatureDescription.js';
import Img from '../../components/Img/Img.js';
import root from 'window-or-global';


class Feature extends Component {

  constructor(props) {
    super(props);
    this.state = {
      firstSide: <div></div>,
      secondSide: <div></div>,
      componentYPosition: 0,
      componentYHeight: 0,
      startAnimation: false,
      descriptionActive: ''
    };
    this.handleScroll = this.handleScroll.bind(this);
  }

  getBodyScrollTop(){
   const el = document.scrollingElement || document.documentElement;
   return el.scrollTop ;
 }

  handleScroll(){
    if(this.getBodyScrollTop() + 500 > this.state.componentYPosition){
      this.setState({
        startAnimation:true
      })
    }
  }

  componentDidMount(){
     root.addEventListener("scroll", this.handleScroll);
     this.setState({
      componentYPosition: ReactDOM.findDOMNode(this).getBoundingClientRect().top,
      componentYHeight: ReactDOM.findDOMNode(this).getBoundingClientRect().height,
    });
  }

  componentWillUnmount(){
    root.removeEventListener("scroll", this.handleScroll);
  }

  componentWillMount(){
    const firstSide = <FeatureDescription feature={this.props.feature}/>;
    const secondSide = (<div className={' featureImage '}>
                            <Img src={this.props.feature.image} style={{width:'100%'}}/>
                        </div>);

    if(this.props.id%2===0){
      this.setState(
        {
          firstSide: firstSide,
          secondSide: secondSide,
        }
      )
    }
    else{
      this.setState(
        {
          firstSide: secondSide,
          secondSide: firstSide,
        }
      )
    }
  }

  render() {
    return (
      <div className="feature row" style={this.props.style}>
        <div className={this.state.startAnimation ? this.props.leftPartAnimation + ' colomn-6 '+this.state.descriptionActive : 'zeroOpacity  colomn-6 '}>
          {this.state.firstSide}
        </div>
        <div className={this.state.startAnimation ? this.props.rightPartAnimation + ' colomn-6 '+this.state.descriptionActive : 'zeroOpacity  colomn-6 '}>
          {this.state.secondSide}
        </div>
      </div>
    );
  }
}

export default Feature;
