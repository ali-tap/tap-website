import React, { Component } from 'react';

class TapLink extends Component {

  constructor(props) {
    super(props);
    this.state = {
      initialStyle:{
              color: this.props.shape==='bordered'?'#fff':this.props.color,
              backgroundColor: this.props.shape==='bordered'?'transparent':'transparent',
              borderColor: this.props.shape==='bordered'?'#fff':this.props.color
      },
      hoverStyle:{
              color: this.props.shape==='bordered'?this.props.color:'#fff',
              backgroundColor: this.props.shape==='bordered'?'#fff':this.props.color,
              borderColor: this.props.shape==='bordered'?'#fff':this.props.color
      },
      style : {}
    };
  }

  componentWillMount() {
    require('./tapLink.css');
    if(this.props.hoverStyle){
      this.setState({
        style: this.state.hoverStyle
      })
    }
    else{
      this.setState({
        style: this.state.initialStyle
      })
    }
  }

  onMouseOverOut(newStyle){
    if(this.props.hoverStyle){
      this.setState({ style: this.state.hoverStyle })
    }
    else{
      this.setState({ style : newStyle })
    }
  }

  composeComponent(){
    if(this.props.type==='link'){
        return (<a
                  id={this.props.id}
                  className={this.props.className+' readMoreLink'}
                  onClick={this.props.onClick}
                  href={this.props.link}>
                  {this.props.text} {this.props.fontAwesomeIcon}
               </a>
              );
    }
    else{
      return (<p
                id={this.props.id}
                className={this.props.className+' readMoreLink'}
                onClick={this.props.onClick}>
                {this.props.text} {this.props.fontAwesomeIcon}
             </p>
            );
    }
  }

  render() {
     return this.composeComponent();
  }
}

export default TapLink;
