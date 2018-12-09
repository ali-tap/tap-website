import React, { Component } from 'react';

class TapButton extends Component {

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
    require('./TapButton.css');
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
    if(this.props.actionType && this.props.link && this.props.actionType==='sms' && this.props.type==='link'){
        return (<a
                  href={this.props.link}
                  target="_blank"
                  className={"tapButton " +this.props.shape + ' ' + this.props.className}
                  style={{...this.props.style,...this.state.style}}
                  onMouseOver={()=>this.onMouseOverOut(this.state.hoverStyle)}
                  onMouseOut={()=>this.onMouseOverOut(this.state.initialStyle)}
                >
                  {this.props.text}
                  {this.props.fontAwesomeIcon?
                    <React.Fragment>
                      <div className="buttonIconSpace"></div>
                      {this.props.fontAwesomeIcon}
                    </React.Fragment>
                    :null
                  }
               </a>);
    }
    else if(this.props.actionType && this.props.link && this.props.actionType==='link' && this.props.type==='link'){
        return (<a
                  href={this.props.link}
                  target="_blank"
                  className={'tapButton ' +this.props.shape + ' ' + this.props.className}
                  style={{...this.props.style,...this.state.style}}
                  onMouseOver={()=>this.onMouseOverOut(this.state.hoverStyle)}
                  onMouseOut={()=>this.onMouseOverOut(this.state.initialStyle)}
                  >
                  {this.props.text}
                  {this.props.fontAwesomeIcon?
                    <React.Fragment>
                      <div className="buttonIconSpace"></div>
                      {this.props.fontAwesomeIcon}
                    </React.Fragment>
                    :null
                  }
               </a>);
    }
    else{
        return (<button
                  id={this.props.id}
                  className={"tapButton " +this.props.shape + ' ' + ' ' + this.props.className}
                  onClick={this.props.onClick}
                  style={{...this.props.style,...this.state.style}}
                  onMouseOver={()=>this.onMouseOverOut(this.state.hoverStyle)}
                  onMouseOut={()=>this.onMouseOverOut(this.state.initialStyle)}
                  >
                  {this.props.loading?
                    <i className="fas fa-spinner"></i>
                    :this.props.text}
                  {this.props.fontAwesomeIcon?
                    <React.Fragment>
                      <div className="buttonIconSpace"></div>
                      {this.props.fontAwesomeIcon}
                    </React.Fragment>
                    :null
                  }
                </button>);
    }
  }

  render() {
     return this.composeComponent();
  }
}

export default TapButton;
