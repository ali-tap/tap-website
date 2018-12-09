import React, { Component } from 'react';
import Img from '../../components/Img/Img.js';

class FeatureDescription extends Component {

  constructor(props) {
    super(props);
    this.state = {
      descriptionActive: ''
    };
    // this.descriptionToggle = this.descriptionToggle.bind(this);
  }

  descriptionToggle(){
      if(this.state.descriptionActive==='active'){
        this.setState({
          descriptionActive: ''
        });
      }
      else if(this.state.descriptionActive===''){
        this.setState({
          descriptionActive: 'active'
        });
      }
  }

  render() {

    return (
          <div className={' featureDescription '} >
              <div className="featureShortDescription" onClick={()=>this.descriptionToggle()}>
                  <Img className="featureIcon" src={this.props.feature.icon}/>
                  <div style={{width:'24px',display:'inline-block'}}></div>
                  <div className="titleSubtitle">
                    <b><h5 className="title">{this.props.feature.title}</h5></b>
                    <em><b><h6 className="subtitle">{this.props.feature.subtitle}</h6></b></em>
                  </div>
              </div>
              <div className={" description "+this.state.descriptionActive}>
                  <div style={{height:'15px'}}></div>
                  <h6>{this.props.feature.description}</h6>
              </div>
          </div>
        );
  }
}

export default FeatureDescription;
