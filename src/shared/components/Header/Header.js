import React, { Component } from 'react';
import root from 'window-or-global';

import Logo from './Logo.js';
import HeaderMenu from './HeaderMenu.js';
import MobileIcon from './MobileIcon.js';
import LoginHeader from './LoginHeader.js';
import loginStore from './LoginStore.js'

class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      headeClassName: 'navigationHeader',
      headerDivClassName: 'headerDiv',
      headerMenuClassName: 'headerMenu',
      leftMenuClassName: 'leftMenu',
      rightMenuClassName: 'rightMenu',
      mobileMenuClassName: 'mobileMenu',
    };
    this.handleScroll = this.handleScroll.bind(this);
    this.openCloseMenu = this.openCloseMenu.bind(this);
  }

  getBodyScrollTop(){
   const el = document.scrollingElement || document.documentElement;
   return el.scrollTop ;
 }

  handleScroll() {
    if(this.getBodyScrollTop() > 100) {
      this.setState({
        headeClassName: 'navigationHeader shrinked',
        headerMenuClassName: 'headerMenu shrinked'
      });
    }
    else {
      this.setState({
        headeClassName: 'navigationHeader',
        headerMenuClassName: 'headerMenu'
      });
    }
  }

  openCloseMenu(){
    if(this.state.mobileMenuClassName==='mobileMenu'){
        this.setState({ mobileMenuClassName : 'mobileMenu active' });
    }
    else{
        this.setState({ mobileMenuClassName : 'mobileMenu' });
    }
  }

  componentWillUnmount(){
    root.removeEventListener("scroll", this.handleScroll);
  }

  componentDidMount(){
    root.addEventListener("scroll", this.handleScroll);
  }

  componentWillMount(){
    require('./Header.css');
  }

  mergeTwoMenus(itemsArray1,itemsArray2,menuType){
    let arr = [];
    itemsArray1.map(item=>{item.action && menuType==='mobile'?null:arr.push(item)});
    itemsArray2.map(item=>{item.action && menuType==='mobile'?null:arr.push(item)});
    return arr;
  }

  render() {
    return (
    <div>
      {this.props.headerSpacePC?<div className='hidden-xs' style={{height:'100px'}}></div>:null}
      {this.props.headerSpaceMobile?<div className='visible-xs' style={{height:'60px'}}></div>:null}
      <div className="header">
        <div className="container">
          <LoginHeader
              loginHeaderData={this.props.loginHeaderData}
              loginStore={loginStore}
              language={this.props.language}
          />
        </div>
        <div className={this.state.headeClassName}>
          <div className="container">
          	<div className="center">
              {!this.props.noItemsHeader?
          		<HeaderMenu
          			className={this.state.headerDivClassName + ' ' + this.state.headerMenuClassName + ' ' + this.state.leftMenuClassName}
          			menuItems={this.props.leftMenuItems}
                language={this.props.language}
          		/>
              :
              null
              }
          		<Logo
          			className={this.state.headerDivClassName}
                language={this.props.language}
          		/>
              {!this.props.noItemsHeader?
              <MobileIcon
                onClick={this.openCloseMenu}
              />
              :
              null
              }
              {!this.props.noItemsHeader?
                <HeaderMenu
                  loginStore={loginStore}
            			className={this.state.headerDivClassName + ' ' + this.state.headerMenuClassName + ' '+ this.state.rightMenuClassName}
            			menuItems={this.props.rightMenuItems}
                  language={this.props.language}
            		/>
                :
                null
              }
          	</div>
          </div>
        </div>
      </div>
      <HeaderMenu
        mobileMenu={true}
        className={this.state.mobileMenuClassName}
        menuItems={this.mergeTwoMenus(this.props.leftMenuItems,this.props.rightMenuItems,'mobile')}
        containerClass='container'
        language={this.props.language}
      />
    </div>
    );
  }
}

export default Header;
