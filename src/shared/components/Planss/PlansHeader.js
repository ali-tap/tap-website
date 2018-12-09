import React, { Component } from 'react';
import {observer} from 'mobx-react';
import Img from '../../components/Img/Img.js';

class PlansHeader extends Component {

  componentWillMount(){

  }

  render() {
    return (
        <div className="plansHeader">
            {this.props.plans.map((plan,key)=>{
              return (
                <div className="planHeader" style={{width:this.props.width,borderRight:key===this.props.plans.length-1?'':'1px solid #ececec'}} key={key}>
                  <Img src={plan.planIcon} className="planIcon"/>
                  <div style={{height:'20px'}}></div>
                  <h1>{plan.planName}</h1>
                  <div style={{height:'50px'}}></div>
                </div>
              )
            })}
        </div>
    );
  }
}

export default observer(PlansHeader);
