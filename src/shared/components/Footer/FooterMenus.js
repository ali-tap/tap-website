import React, { Component } from 'react';
import FooterMenu from './FooterMenu.js';

class FooterMenus extends Component {

  menuItemsComponentsComposer(items){
    return items.map((obj,key) => <FooterMenu key={key} title={obj.title} items={obj.items} language={this.props.language}></FooterMenu>);
  }

  render() {
    
    return (
        <div className="footerMenus">
          {this.menuItemsComponentsComposer(this.props.footerMenus)}
        </div>
    );
  }
}

export default FooterMenus;