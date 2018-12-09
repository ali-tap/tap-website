import React, { Component } from 'react';

class LightBox extends Component {

  constructor(props) {
    super(props);
    this.state = {
      close: false
    };
  }

  componentDidUpdate(){
    // if(this.state.close){
    //
    // }
  }

  componentWillMount(){
    require('./lightBox.css');
  }

  open(){

  }

  close(){
    this.setState({
      close: true
    });
  }

  preventCloseOnChild(e){
    e.stopPropagation();
  }

  render() {
    return (
      <div className={this.props.open?'lightBox open':'lightBox'} onClick={this.props.onClick}>
      <div className={this.props.fullOnSmall?'closeLightBox darkIcon':'closeLightBox'}>
        {this.props.fullOnSmall?
          <React.Fragment>
          <i className={'far fa-times-circle iconNoneFullScreenMode'}></i>
          <i className={'fas fa-times iconOnFullScreenMode'}></i>
          </React.Fragment>
          :
          <i className={'far fa-times-circle'}></i>
        }
      </div>
      {
      this.props.link?
        <iframe className="lightBoxIframe" src={this.props.link} title="video">
          <p>Your browser does not support iframes.</p>
        </iframe>
        :
        <div className={this.props.fullOnSmall?'lightBoxDialog fullLightBoxDialog':'lightBoxDialog'} onClick={(e)=>this.preventCloseOnChild(e)} style={this.props.dialogueBoxStyle}>
          <div className='lightBoxDialogDiv'>
            {this.props.children}
          </div>
        </div>
      }
      </div>
    );
  }
}

export default LightBox;
