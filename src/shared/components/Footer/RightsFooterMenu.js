import React, { Component } from 'react';

class RightsFooterMenu extends Component {

  composeMenu(menu){
    return menu.map((item,key)=> item.link? 
      <span key={key} className="secondFooterItem">
        <a className="footerLink" href={'https://www.tap.company/'+this.props.language+'/'+item.link}>{item.title}</a>
        <div className='textSpace'></div>
      </span>
      :<span key={key} className="secondFooterItem">{item.title}<div className='textSpace'></div></span>);
  }

  render() {
    return (
        <div className="rightsFooterMenu">
          {this.composeMenu(this.props.rightsFooterMenu)}
        </div>
    );
  }
}

export default RightsFooterMenu;

