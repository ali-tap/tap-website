import React, { Component } from 'react';
import TeamMember from './TeamMember.js';
import ReactDOM from 'react-dom';

class TeamMembers extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentWillMount(){
    require('./teamMembers.css');
  }

  render() {
    return (
      <div className='teamMembers' style={this.props.style}>
        {this.props.title?
          <React.Fragment>
          <h3>{this.props.title}</h3>
          <div style={{height:'40px'}}></div>
          </React.Fragment>
          :
          null
        }
        {this.props.teamMembers?
          <React.Fragment>
          {this.props.teamMembers.map((teamMember,key)=>{
            return (<TeamMember
                      name={teamMember.name}
                      position={teamMember.position}
                      image1={teamMember.image1}
                      image2={teamMember.image2}
                      key={key}
                    />)
          })}
          </React.Fragment>
        :
        null
      }
      </div>
    );
  }
}

export default (TeamMembers);
