import React, { Component } from 'react';
import {observer} from 'mobx-react';

class PlanFeature extends Component {

  componentWillMount(){

  }
  includebreaks(text){
    return text.split("\n").map((text,key)=><span key={key}>{text}<br/></span>)
  }
  render() {

    return (
        <div className="planFeature">
        {this.props.featureType==='main'?null:null}
            <div>
              {this.props.featureType==='main'?
                <div className="featureNamewithSeperator">
                {this.props.featureType==='main'?<hr className="planFeatureSeperator"/>:null}
                <h4 className="featureName">{this.props.featureName}</h4>
                </div>
                :
                <div className="featureNamewithSeperator">
                {this.props.featureType==='main'?<hr className="planFeatureSeperator"/>:null}
                <p className="featureName subFeature">{this.props.featureName}</p>
                </div>
              }
              {this.props.featureValue?
                <div className='plansflexContainer'>
                {this.props.plans.map((plan, key)=>{
                  return (<div style={{width:this.props.width,borderRight:key===this.props.plans.length-1?'':'1px solid #ececec'}}>
                  {this.props.featureValue[plan.planName]==='true'?
                      <div>
                      <div style={{height:'50px'}}></div>
                      <i class="fas fa-circle featureValue featureValueTrue"></i>
                      {this.props.featureSubValue?null:<div style={{height:'50px'}}></div>}
                      </div>
                      :
                      <React.Fragment>
                      {this.props.featureValue[plan.planName]==='false'?
                          <div>
                          <div style={{height:'50px'}}></div>
                          <i class="far fa-circle featureValue featureValueFalse"></i>
                          {this.props.featureSubValue?null:<div style={{height:'50px'}}></div>}
                          </div>
                          :
                          <div>
                          <div style={{height:'50px'}}></div>
                          <p className="featureValue">{this.includebreaks(this.props.featureValue[plan.planName])}</p>
                          {this.props.featureSubValue?null:<div style={{height:'50px'}}></div>}
                          </div>
                      }
                      </React.Fragment>
                  }
                  </div>)
                })
                }
                </div>
                :
                null
              }
              {this.props.featureSubValue?
                <div className='plansflexContainer'>
                {this.props.plans.map((plan, key)=>{
                  return (<div style={{width:this.props.width,borderRight:key===this.props.plans.length-1?'':'1px solid #ececec',marginTop:'',paddingLeft:'15px',paddingRight:'15px'}}>
                  {this.props.featureSubValue[plan.planName]==='true'?
                      <div>
                      <i class="fas fa-circle featureValue featureSubValue featureValueTrue"></i>
                      <div style={{height:'50px'}}></div>
                      </div>
                      :
                      <React.Fragment>
                      {this.props.featureSubValue[plan.planName]==='false'?
                          <div>
                          <i class="far fa-circle featureValue featureSubValue featureValueFalse"></i>
                          <div style={{height:'50px'}}></div>
                          </div>
                          :
                          <div>
                          <p className="featureValue featureSubValue">{this.includebreaks(this.props.featureSubValue[plan.planName])}</p>
                          <div style={{height:'50px'}}></div>
                          </div>
                      }
                      </React.Fragment>
                  }
                  </div>)
                })
                }
                </div>
                :
                null
              }

            </div>
            <div>
              {this.props.children}
            </div>
        </div>
    );
  }
}

export default observer(PlanFeature);
