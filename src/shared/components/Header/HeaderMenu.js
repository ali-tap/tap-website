import React, { Component } from 'react';
import MenuItem from './MenuItem.js';

class HeaderMenu extends Component {

  menuItemsComponentsComposer(items){
    return items.map((item,key) =><MenuItem
                                      itemkey={key}
                                      key={key}
                                      item={item}
                                      itemsLength={items.length}
                                      loginStore={this.props.loginStore}
                                      language={this.props.language}>
                                    </MenuItem>);
  }

  render() {
    return (
    <div className={this.props.className}>
        <div className={this.props.containerClass}>
          {this.menuItemsComponentsComposer(this.props.menuItems)}
        </div>
    </div>
    );
  }
}

export default HeaderMenu;
