import React, { Component } from 'react';

class TeamMember extends Component {

  constructor(props) {
    super(props);
    this.state = {
      image: this.props.image1
    }
  }

  mouseOver(){
    this.setState({image: this.props.image2});
  }

  mouseOut(){
    this.setState({image: this.props.image1});
  }

  render() {
    return (
        <div className='teamMember'
        onMouseOver={()=>this.mouseOver()}
        onMouseOut={()=>this.mouseOut()}
        >
            <div className='teamMemberContainer'>
              <div className='teamMemberImage' style={{backgroundImage:'url('+this.state.image+')'}}></div>
              <div style={{height:'20px'}}></div>
              <h6>{this.props.name}</h6>
              <h6>{this.props.position}</h6>
            </div>
          </div>
    );
  }
}

export default (TeamMember);
