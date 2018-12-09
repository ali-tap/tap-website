import React, { Component } from 'react';
import {observer} from 'mobx-react';
import TapInput from '../../components/TapInput/TapInput.js';
import TapButton from '../../components/TapButton/TapButton.js';

class LoginHeader extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password:'',
      loading:false
    };
    this.saveValue = this.saveValue.bind(this);
  }

  // componentDidMount() {
  //   let loginHeaderData = this.props.loginHeaderData;
  //   console.log(loginHeaderData);
  //   this.setState({
  //      loginHeaderData.inputsPlaceholders[0].type ='',
  //      loginHeaderData.inputsPlaceholders[1].type ='',
  //   });
  //   console.log(this.state);
  // }

  saveValue(event,inputType){
    this.setState({
      [inputType]:event.target.value
    });
  }

  handleKeyPress(event){
      if(event.which === 13) {
        this.login();
      }
  }

  login(){
    this.setState({loading:true});
    this.props.loginStore.clearResponse();
    this.props.loginStore.login(this.state.email,this.state.password);
      setTimeout(
        function() {
            if(this.props.loginStore.redirect_url!==''){
                window.location.href = this.props.loginStore.redirect_url;
            }
            else{
                document.getElementById("ModalButton").click();
            }
            this.setState({loading:false});
        }
        .bind(this),
        2200
    );
  }

  render() {
    return (
    <div className={"loginHeader "+ this.props.loginStore.loginHeaderState}>
        <div className="loginHeaderContainer">
        	<div className="loginHeaderSide1">
                {
                    this.props.loginHeaderData.inputsPlaceholders.map((item,key) =>
                        <span key={key}>
                            <TapInput
                                placeholder={item.placeholder}
                                style={{width:'24.5%'}}
                                type={item.type}
                                onChange={(e)=>this.saveValue(e,item.type)}
                                onKeyPress={(e)=>this.handleKeyPress(e)}
                            />
                            <div className="fieldsSpace"></div>
                        </span>
                    )
                }
                {
                    this.props.loginHeaderData.buttonsTexts.map((item,key) =>
                        <TapButton
                            key={key}
                            style={{width:'12%'}}
                            shape="bordered"
                            text={item.text}
                            loading={this.state.loading}
                            onClick={()=>this.login()}
                        />
                    )
                }
                {
                    this.props.loginHeaderData.links.map((item,key) =>
                        <React.Fragment key={key}>
                        <div style={{width:'2.3%',display:'inline-block'}}></div>
                        <a
                            href={item.link.indexOf('register')>-1?'https://www.tap.company/'+item.link+'/?lang='+this.props.language:'https://www.tap.company/'+this.props.language+'/'+item.link}
                            className="loginLink">
                            {item.linkText}
                        </a>
                        </React.Fragment>
                    )
                }
        	</div>
        	<div className="loginHeaderSide2">
        		<i
                    className="far fa-times-circle closeLoginHeader"
                    onClick={()=>this.props.loginStore.closeOpenLoginHeader()}>
                </i>
        	</div>
        </div>

        <button id="ModalButton" style={{display:'none'}} type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
          Launch modal
        </button>

        <div className={"modal fade"} id="exampleModal" tabIndex="" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-body">
                <button type="button" className="close" data-dismiss="modal">&times;</button>
                {this.props.loginStore.response_message}
              </div>
            </div>
          </div>
        </div>
    </div>
    );
  }
}

export default observer(LoginHeader);
