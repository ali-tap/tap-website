import React, { Component } from 'react';
import {observer} from 'mobx-react';
import Plan from './Plan.js';
import PlansHeader from './PlansHeader.js'
import PlanFeature from './PlanFeature.js'

class Plans extends Component {

  componentWillMount(){
    require('./plans.css');
  }

  includebreaks(text){
    return text.split("\n").map((text,key)=><span key={key}>{text}<br/></span>)
  }

  render() {
    const plansObj = this.props.plans;
    const plans = plansObj.plans;
    const plansFeatures = plansObj.planFeatures;
    const width = 1/plans.length*100+'%';
    return (
      <div className="container">
        <div className="plans">
            <PlansHeader
              plans={plans}
              width={width}
            />
            {plansFeatures.map((feature,key)=>{
              return (
              <PlanFeature
                key={key}
                plans={plans}
                featureName={feature.featureName}
                featureValue={feature.featureValue}
                featureSubValue={feature.featureSubValue}
                width={width}
                featureType='main'
              >
              {feature.subFeatures?
                <React.Fragment>
                {feature.subFeatures.map((feature,key)=>{
                  return (
                    <PlanFeature
                      key={key}
                      plans={plans}
                      featureName={feature.featureName}
                      featureValue={feature.featureValue}
                      featureSubValue={feature.featureSubValue}
                      width={width}
                      featureType='sub'
                    >
                    </PlanFeature>
                  )
                })}
                </React.Fragment>
                :
                null
              }
              </PlanFeature>
              )
            })}
        </div>
      </div>
    );
  }
}

export default observer(Plans);
