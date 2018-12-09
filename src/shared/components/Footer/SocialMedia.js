import React, { Component } from 'react';

class SocialMedia extends Component {

  menuItemsComponentsComposer(items){
    return items.map((item,key) => <React.Fragment key={key}><div className="iconSpace"></div><a className="socialMediaLink footerLink" href={item.link}><i className={"fab "+item.fontAwesomeIcon+" fa-lg"}></i></a></React.Fragment>);
  }

  render() {
    return (
        <div className="socialMedia">
          {this.menuItemsComponentsComposer(this.props.socialMedia)}
        </div>
    );
  }
}

export default SocialMedia;