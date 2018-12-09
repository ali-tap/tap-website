import React, { Component } from 'react';
import root from 'window-or-global';

class Banner extends Component {

  constructor(props) {
    super(props);
    this.state = {
      bannerHeight: 0,
      children: this.props.children,
      reversed: false,
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentWillMount(){
    require('./Banner.css');
  }

  componentDidMount() {
    root.addEventListener('resize', this.updateWindowDimensions);
    this.updateWindowDimensions();
  }

  componentWillUnmount() {
    root.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ bannerHeight: root.innerHeight-this.props.cropped });
  }

  render() {
    let style = {};
    {this.props.noBackground?
          style={}:
          style={backgroundColor:this.props.backgroundColor,backgroundImage:'url('+this.props.backgroundImage+')'}
    }
    return (
      <div className={this.props.maxContentHeight?'maxContentHeight banner':'banner'} style={{height:this.state.bannerHeight}}>
          <div className="bannerBackground"
          style={style}>
            <div className="container flexContainer">
                  {Array.isArray(this.props.children)?null:React.cloneElement(this.props.children, { active: 'active', className:'oneLayer' })}
                  {this.props.children[0]?React.cloneElement(this.props.children[0], { active: this.props.active, className: 'hidden-sm'}):null}
                  {this.props.children[1]?React.cloneElement(this.props.children[1], { active: this.props.active, className: '' }):null}
                  {this.props.children[0]?React.cloneElement(this.props.children[0], { active: this.props.active, className: 'visible-sm' }):null}
            </div>
          </div>
      </div>
    );
  }
}

export default Banner;
