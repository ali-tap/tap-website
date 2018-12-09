import React, { Component } from 'react';
import {observer} from 'mobx-react';
import Img from '../../components/Img/Img.js';

import './plans.css';

class Plan extends Component {

  componentWillMount(){

  }

  includebreaks(text){
    return text.split("\n").map((text,key)=><span key={key}>{text}<br/></span>)
  }

  render() {
    let plan = this.props.plan;
    return (
      <div
        className="plan"
        style={this.props.style}>
          <Img src={plan.planIcon} className="planIcon"/>
          <div style={{height:'20px'}}></div>
          <h1>{plan.planName}</h1>
          {plan.planFeatures.map((planFeature,key)=>{
            return (
              <React.Fragment key={key}>
              <hr className="planFeatureSeperator"/>
              <h4 className="featureName">{planFeature.featureName}</h4>
              {planFeature.featureValue?
                  <React.Fragment>
                      {planFeature.featureValue==='true'?
                          <i class="fas fa-circle featureValue featureValueTrue"></i>
                          :
                          <React.Fragment>
                          {planFeature.featureValue==='false'?
                              <i class="far fa-circle featureValue featureValueFalse"></i>
                              :
                              <p className="featureValue">{this.includebreaks(planFeature.featureValue)}</p>
                          }
                          </React.Fragment>
                      }
                  </React.Fragment>
                  :
                  null
              }
              {planFeature.featureSubValue?<p className="featureValue featureSubValue">{this.includebreaks(planFeature.featureSubValue)}</p>:null}
              {planFeature.subFeatures?
                planFeature.subFeatures.map((subFeature,key)=>{
                  return (
                    <React.Fragment key={key}>
                    <div style={{height:'30px'}}></div>
                    <h8 className="featureName subFeature">{subFeature.featureName}</h8>
                    {subFeature.featureValue?
                        <React.Fragment>
                            {subFeature.featureValue==='true'?
                                <i class="fas fa-circle featureValue featureValueTrue"></i>
                                :
                                <React.Fragment>
                                {subFeature.featureValue==='false'?
                                    <i class="far fa-circle featureValue featureValueFalse"></i>
                                    :
                                    <p className="featureValue">{this.includebreaks(subFeature.featureValue)}</p>
                                }
                                </React.Fragment>
                            }
                        </React.Fragment>
                        :
                        null
                    }
                    {subFeature.featureSubValue?<p className="featureValue featureSubValue">{this.includebreaks(subFeature.featureSubValue)}</p>:null}
                    {subFeature.subFeatures?
                      subFeature.subFeatures.map((subFeature,key)=>{
                        return (
                          <React.Fragment key={key}>
                          <p className="featureName subSubFeature">{subFeature.featureName}</p>
                          {subFeature.featureValue?<p className="featureValue">{this.includebreaks(subFeature.featureValue)}</p>:null}
                          {subFeature.featureSubValue?<p className="featureValue featureSubValue">{this.includebreaks(subFeature.featureSubValue)}</p>:null}
                          </React.Fragment>
                        );
                      })
                    :
                    null
                    }
                    </React.Fragment>
                  )
                })
              :
              null
              }
              </React.Fragment>
              );
          })}
      </div>
    );
  }
}

export default Plan;
