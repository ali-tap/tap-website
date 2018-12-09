import React, { Component } from 'react';
// import {observer} from 'mobx-react';
import PlanFeature from './PlanFeature.js';
import TapButton from '../../components/TapButton/TapButton.js';
import LightBox from '../../components/LightBox/LightBox.js';
import Img from '../../components/Img/Img.js';

class Plan extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentPlan:{

      }
    };
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    // this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.handleOutsideClick, false);
    // document.getElementById('planBody').addEventListener('scroll', this.handleScroll, false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleOutsideClick, false);
    // document.getElementById('planBody').removeEventListener('scroll', this.handleScroll, false);

  }

  handleOutsideClick(e) {
    if(e.target.className.indexOf('openLightBox')>-1 && e.target.className.indexOf(this.props.id)>-1){

    }
  }

  handleScroll(e){
    let scrollTop = e.target.scrollTop;
    let elems = document.getElementsByClassName('planBody');
    for(let i=0 ; i<elems.length ; i++){
      elems[i].scrollTop=scrollTop;
    }

  }

  componentWillMount(){

  }

  includebreaks(text){
    return text.split("\n").map((text,key)=><span key={key}>{text}<br/></span>)
  }

  planPriceFormat(text){
    var amount = text.indexOf('.')>-1?text.substring(0,text.indexOf('.')):text;
    var percentage = text.indexOf('.')>-1?text.substring(text.indexOf('.'),text.indexOf('.')+3):'';
    var afterSlash = text.indexOf('/')>-1?text.substring(text.indexOf('/'),text.length):'';
    return (
      <div>
        <span className='priceAmount'>{amount}</span>
        {percentage===''?<span></span>:<span className='pricePercentage'>{percentage}</span>}
        {afterSlash===''?<span></span>:<span className='priceAfterSlash'>{afterSlash}</span>}
      </div>)
  }

  render() {
    let plan = this.props.plan;
    let showMoreButtonText = this.props.showMoreButtonText;
    let showLessButtonText = this.props.showLessButtonText;
    let planPricing = this.props.planPricing.filter((price)=>price.priceType==='monthly')[0];
    let subscribeButtonText = this.props.subscribeButtonText;
    console.log(subscribeButtonText);
    return(
      <div className={this.props.display==='values'?'plan':'FeaturesTitles'} style={{width:this.props.width}}>
        <div className={this.props.display==='values'?'planHeader':'hideThis'}>
          <Img className="planIcon hidden-xs" src={this.props.plan.planIcon}/>
          <div style={{height:'15px'}}></div>
          <h2 className='priceAmount' style={{margin:'0'}}>{this.props.plan.planName}</h2>
          <hr className="planFeatureSeperator"/>
          <div style={{height:'10px'}}></div>
          {this.planPriceFormat(planPricing.PriceTitle[plan.planName])}
          <div style={{height:'15px'}}></div>
          <TapButton
            type='button'
            style={{width:'90%'}}
            shape='bordered colored'
            color='#146ebd'
            className='openLightBox planLightBox'
            text={subscribeButtonText}
          />
            <div style={{height:'15px'}}></div>

            <hr className="planFeatureSeperator"/>
            </div>
            <div className='planBody' onScroll={(e)=>{this.handleScroll(e)}}>
            {this.props.planFeatures.map((planFeature,key)=>{
              return(
                <PlanFeature
                  key={key}
                  theKey={key}
                  planFeature={planFeature}
                  plan={this.props.plan}
                  display={this.props.display}
                  showLessButtonText={showLessButtonText}
                  showMoreButtonText={showMoreButtonText}
                />
              )
            })}
            <div className={this.props.display==='titles'?'hideThis':'hidden-sm'} style={{width:'100%'}}>
            <hr className="planFeatureSeperator"/>
              <div style={{height:'10px'}}></div>
              <TapButton
                type='button'
                style={{width:'90%'}}
                shape='bordered colored'
                color='#146ebd'
                text={subscribeButtonText}
              />
              <div style={{height:'10px'}}></div>
            </div>

          </div>
      </div>
    )
  }
}

export default Plan;
