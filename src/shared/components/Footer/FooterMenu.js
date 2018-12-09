import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class FooterMenu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      openCloseIcon:'plus',
      active:''
    };
  }

  openCloseMenu(){
    console.log('hmmm');
    if(this.state.openCloseIcon==='plus'){
      this.setState({
        openCloseIcon:'minus',
        active:'active'
      });
    }
    else if(this.state.openCloseIcon==='minus'){
      this.setState({
        openCloseIcon:'plus',
        active:''
      });
    }
    //console.log(this.state.op);
  }

  render() {

    return (
        <div className="footerMenu">
          <div className="footerMenuTitle" onClick={()=>this.openCloseMenu()}>
              <div className="MenuTitleText">
                <b>{this.props.title}</b>
              </div>
              <div className="MenuTitleIcon">
                <i className={"fab fa fa-"+this.state.openCloseIcon+" fa-xs"}></i>
              </div>
          </div>
          <ul className={"footerMenuItems "+this.state.active}>
            {this.props.items.map((item,key)=><li key={key}><Link to={item.link} className="footerLink">{item.title}</Link></li>)}
          </ul>
        </div>
    );
  }
}

export default FooterMenu;
