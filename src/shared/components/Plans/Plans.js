import React, { Component } from 'react';
import {observer} from 'mobx-react';
import Plan from './Plan.js';
import Slider from 'react-slick';

class Plans extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newIndex: 0,
    }
  }

  componentWillMount(){
    require('./plans.css');
  }

  changeActiveStyle(newIndex){
    this.setState({
      newIndex: newIndex
    });
    //console.log(swipeMove);
  }

  plansComposer(plans,planFeatures,showLessButtonText,showMoreButtonText,planPricing,subscribeButtonText,mobileView){
    return(
      <React.Fragment>
        {plans.map((plan,key)=>
          {
          return(
            <React.Fragment key={key}>
            {key===plans.length || (mobileView)?null:<div style={{width:'15px'}}></div>}
            <Plan
              key={key}
              plan={plan}
              planFeatures={planFeatures}
              width={1/(plans.length+1)*100+'%'}
              display={'values'}
              showLessButtonText={showLessButtonText}
              showMoreButtonText={showMoreButtonText}
              subscribeButtonText={subscribeButtonText}
              planPricing={planPricing}
            />
            </React.Fragment>
          )
          })
        }
      </React.Fragment>
    )
  }

  render() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      centerMode:true,
      centerPadding:'50px',
      beforeChange: (oldIndex, newIndex) => {this.changeActiveStyle(newIndex)},
    };
    const plans = this.props.plans.plans;
    const planFeatures = this.props.plans.planFeatures;
    const showLessButtonText = this.props.plans.showLessButtonText;
    const showMoreButtonText = this.props.plans.showMoreButtonText;
    const planPricing = this.props.plans.planPricing;
    const subscribeButtonText = this.props.plans.subscribeButtonText;
    console.log(subscribeButtonText);
    return (
      <React.Fragment>
      <div className="container hidden-sm">
        <div className="plans">
        <React.Fragment>
          <Plan
            plan={plans[0]}
            planFeatures={planFeatures}
            width={1/(plans.length+1)*100+'%'}
            display={'titles'}
            showLessButtonText={showLessButtonText}
            showMoreButtonText={showMoreButtonText}
            subscribeButtonText={subscribeButtonText}
            planPricing={planPricing}
          />
        </React.Fragment>
        {this.plansComposer(plans,planFeatures,showLessButtonText,showMoreButtonText,planPricing,subscribeButtonText,false)}
        </div>
      </div>
      <div className="container visible-sm noPadding">
        <Slider {...settings}>
        {plans.map((plan,key)=>
          {
          return(
            <div key={key} className={this.state.newIndex===key?'activeSlickSlide':'nonActiveSlickSlide'}>
            <Plan
              key={key}
              plan={plan}
              planFeatures={planFeatures}
              width={1/(plans.length+1)*100+'%'}
              display={'values'}
              showLessButtonText={showLessButtonText}
              showMoreButtonText={showMoreButtonText}
              planPricing={planPricing}
            />
            </div>
          )
          })
        }

        </Slider>
      </div>
      </React.Fragment>
    );
  }
}

export default observer(Plans);
