import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class MenuItem extends Component {

  handelClick(){
  	this.props.item.action? this.props.loginStore.closeOpenLoginHeader():null;
  }

  render() {
    return (
    <React.Fragment>
    {this.props.itemkey===0?null:<div className="menuItemSpace"></div>}
    <div className={this.props.item.action?'menuItem hiddenOnMobileView':'menuItem'} onClick={()=>this.handelClick()}>
      <Link to={this.props.item.link}>
          {this.props.item.title}
      </Link>
    </div>
    {this.props.itemkey===this.props.itemsLength-1?null:<div className="menuItemSpace"></div>}
    </React.Fragment>
    );
  }
}

export default MenuItem;
