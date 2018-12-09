
import React, { Component } from 'react';
// import TapButton from '../../components/TapButton/TapButton.js';
import TapLink from '../../components/TapLink/TapLink.js';
class PlanFeature extends Component {

  constructor(props) {
    super(props);
    this.state = {
        shown: 'hiddenPlanFeature',
        buttonText: this.props.showMoreButtonText,
        // fontAwesomeIcon: <i class="fas fa-angle-down"></i>
    };
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.handleOutsideClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleOutsideClick, false);
  }

  handleOutsideClick(e) {
    if(e.target.id.indexOf(this.props.planFeature.featureName.replace(/\s/g,'')+'Feature')>-1){
      this.openClose();
    }
  }

  openClose(){
    if(this.state.shown==='hiddenPlanFeature')
    {
      this.setState({
        shown:'',
        buttonText: this.props.showLessButtonText,
        // fontAwesomeIcon: <i class="fas fa-angle-up"></i>
      })
    }
    else{
      this.setState({
        shown:'hiddenPlanFeature',
        buttonText: this.props.showMoreButtonText,
        // fontAwesomeIcon: <i class="fas fa-angle-down"></i>
      })
    }
  }

  includebreaks(text){
    return text.split("\n").map((text,key)=><span key={key}>{text}<br/></span>)
  }

  render() {
    const theKey = this.props.theKey;
    const planFeature = this.props.planFeature;
    let numberOfFeaturesShown = 3;
    if ( planFeature.subFeatures && planFeature.subFeatures.length===4){
      numberOfFeaturesShown = 1;
    }
    return (
      <React.Fragment>
        {theKey===0?null:<hr className="planFeatureSeperator"/>}
        <div className={this.props.display==='titles'?'displayThis':'hideThis'}>
          <p className="featureName featureTitle">{planFeature.featureName}</p>
        </div>
        <div className={this.props.display==='values'?'displayThis':'hideThis'}>
        {planFeature.featureValue[this.props.plan.planName]===''?
          <p className="featureName invisibleText">........</p>
          :<p className={planFeature.mainFeature&&planFeature.mainFeature==='true'?'featureName mainFeature':'featureName'}>{planFeature.featureValue[this.props.plan.planName]}</p>
        }
        {planFeature.featureSubValue?
          <React.Fragment>
          {planFeature.mainFeature&&planFeature.mainFeature==='true'?
            null
            :<div style={{height:'5px'}}></div>
          }
          {planFeature.featureSubValue[this.props.plan.planName]===''?
            <p className="featureName featureSubValue invisibleText">........</p>
            :<p className="featureName featureSubValue">
              {planFeature.featureSubValue[this.props.plan.planName]==='true'?
                <i className="fas fa-check featureValueTrue featureSubValue"></i>
                :
                <React.Fragment>
                {planFeature.featureSubValue[this.props.plan.planName]==='false'?
                '-'
                :this.includebreaks(planFeature.featureSubValue[this.props.plan.planName])
                }
                </React.Fragment>
              }
            </p>
          }
          </React.Fragment>
          :
          null
        }
        </div>
        {planFeature.subFeatures?
          <React.Fragment>
            {planFeature.subFeatures.map((subFeature,key)=>{
              return(
                <div key={key} className={key>=numberOfFeaturesShown?this.state.shown+' planFeature':'planFeature'}>
                  <React.Fragment>
                  <div style={{height:'10px'}}></div>
                  <div className={this.props.display==='titles'?'displayThis':'hideThis'}>
                    <p className="featureName subFeature featureTitle">{subFeature.featureName}</p>
                  </div>
                  <div className={this.props.display==='values'?'displayThis':'hideThis'}>
                  {subFeature.featureValue[this.props.plan.planName]===''?
                    <p className="featureName subFeature invisibleText">........</p>
                    :<p className="featureName subFeature">
                      {subFeature.featureValue[this.props.plan.planName]==='true'?
                        <i className="fas fa-check featureValueTrue"></i>
                        :
                        <React.Fragment>
                        {subFeature.featureValue[this.props.plan.planName]==='false'?
                        '-'
                        :this.includebreaks(subFeature.featureValue[this.props.plan.planName])
                        }
                        </React.Fragment>
                      }
                    </p>
                  }
                  {subFeature.featureSubValue?
                    <React.Fragment>
                    {subFeature.featureSubValue[this.props.plan.planName]===''?
                      <p className="featureName featureSubValue invisibleText">........</p>
                      :<p className="featureName subFeature featureSubValue">
                        {subFeature.featureSubValue[this.props.plan.planName]==='true'?
                          <i className="fas fa-check featureValueTrue subFeature featureSubValue"></i>
                          :
                          <React.Fragment>
                          {subFeature.featureSubValue[this.props.plan.planName]==='false'?
                          '-'
                          :this.includebreaks(subFeature.featureSubValue[this.props.plan.planName])
                          }
                          </React.Fragment>
                        }
                      </p>
                    }
                    </React.Fragment>
                    :
                    null
                  }
                  </div>
                  </React.Fragment>
                  <React.Fragment>
                  {subFeature.subFeatures?
                    <React.Fragment>
                      {subFeature.subFeatures.map((subFeature,key)=>{
                        return(
                          <React.Fragment>
                            <div style={{height:'10px'}}></div>
                            <div className={this.props.display==='titles'?'displayThis':'hideThis'}>
                              <p className="featureName subSubFeature featureTitle">{subFeature.featureName}</p>
                            </div>
                            <div className={this.props.display==='values'?'displayThis':'hideThis'}>
                            {subFeature.featureValue[this.props.plan.planName]===''?
                              <p className="featureName subSubFeature invisibleText">........</p>
                              :<p className="featureName subSubFeature">
                                {subFeature.featureValue[this.props.plan.planName]==='true'?
                                  <i className="fas fa-check subSubFeature featureValueTrue"></i>
                                  :
                                  <React.Fragment>
                                  {subFeature.featureValue[this.props.plan.planName]==='false'?
                                  '-'
                                  :this.includebreaks(subFeature.featureValue[this.props.plan.planName])
                                  }
                                  </React.Fragment>
                                }
                              </p>
                            }
                            </div>
                          </React.Fragment>
                        )
                      })}
                    </React.Fragment>
                    :null
                  }
                  </React.Fragment>
                </div>
              )
            })}
          </React.Fragment>
          :null
        }
        {planFeature.subFeatures && planFeature.subFeatures.length-1>=numberOfFeaturesShown?
          <div className={this.props.display==='values'?'displayThis moreLessButtonContainer':'hideThis moreLessButtonContainer'}>
          <div style={{height:'10px'}}></div>
          <TapLink
            text={this.state.buttonText}
            id={planFeature.featureName.replace(/\s/g,'')+'Feature'}
          />
          </div>
          :
          null
        }
      </React.Fragment>
    );
  }
}

export default PlanFeature;
