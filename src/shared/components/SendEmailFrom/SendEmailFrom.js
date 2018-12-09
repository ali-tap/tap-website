import React, { Component } from 'react';
import {observer} from 'mobx-react';
import TapInput from '../../components/TapInput/TapInput.js'
import TapButton from '../../components/TapButton/TapButton.js';
import TapSelect from '../../components/TapSelect/TapSelect.js';
import TapTextArea from '../../components/TapTextArea/TapTextArea.js';
import Img from '../../components/Img/Img.js';
import axios from 'axios';

class SendEmailFrom extends Component {

  constructor(props) {
    super(props);
    this.state = {
       fieldsValues: [],
       loading: false,
       success: false,
    };

    this.onValueChange = this.onValueChange.bind(this);
  }

  componentWillMount(){
    require('./sendEmailForm.css');
    this.props.fields.map((field,key)=>{
      this.state.fieldsValues.push({value:''})
    });
  }

  onValueChange(key,e){
    this.state.fieldsValues[key].value = e.target.value;
  }

  sendEmail(fields){
      this.setState({ loading: true });
      let template_params = {};
      fields.map((field,key)=>{
        template_params[field.fieldkey] = this.state.fieldsValues[key].value;
      })
      axios.post('https://api.emailjs.com/api/v1.0/email/send',
        {
          service_id: 'tap_payments',
          template_id: this.props.template_id,
          user_id: 'user_4bWTbHQ0owEYh7cYK1PFD',
          template_params: template_params
        }
      )
          .then(response => response.data)
          .then(data => {
            this.setState({ loading: false , success: true });
              setTimeout(
                  function() {
                      this.setState({ success: false });
                  }
                  .bind(this),
                  4500
              );
          })
          .catch(error => {
            this.setState({ loading: false });
            alert('something went wrong!')
          });

  }

  render() {
    const fieldsStyle = this.props.fieldsStyle;
    return (
      <div className="sendEmailFrom">
        <div className={this.state.success?'hidenDiv sendEmailFromForm opacityTransition':'shownDiv sendEmailFromForm opacityTransition'}>
        <h1>{this.props.title}</h1>
        <br/>
        {this.props.fields?
          this.props.fields.map((field,key)=>{
          return(
            <React.Fragment key={key}>
            {
              field.type==='input'?
              <React.Fragment>
              <TapInput
                placeholder={field.title}
                style={fieldsStyle}
                onChange={(e)=>this.onValueChange(key,e)}
              />
              <br/><br/>
              </React.Fragment>
              :
              <React.Fragment>
              {field.type==='select'?
              <React.Fragment>
              <TapSelect
                type='customSelect'
                value={field.title}
                options={field.options}
                withArrow={true}
                style={fieldsStyle}
                customOnChangeFun={this.onValueChange}
                fieldKey={key}
              />
              <br/><br/>
              </React.Fragment>
              :
              <React.Fragment>
              {field.type==='textArea'?
              <React.Fragment>
              <TapTextArea
                placeholder={field.title}
                style={fieldsStyle}
                onChange={(e)=>this.onValueChange(key,e)}
              />
              <br/><br/>
              </React.Fragment>
              :
              null
              }
              </React.Fragment>
              }
              </React.Fragment>
            }
            </React.Fragment>
          )
        })
        :
        null
      }
        <TapButton
          text={this.props.buttonText}
          shape='bordered colored'
          color={this.props.buttonColor}
          hoverStyle={true}
          style={fieldsStyle}
          onClick={()=>this.sendEmail(this.props.fields)}
          loading={this.state.loading}
        />
        </div>
        <div className={this.state.success?'shownDiv formSentSuccesfully opacityTransition':'hidenDiv formSentSuccesfully opacityTransition'}>
          <div className='formSentSuccesfullyContent container'>
              <Img src='https://image.flaticon.com/icons/svg/291/291201.svg' className='formSentSuccesfullyImage' alt='success_icon'/>
              <div style={{height:'20px'}}></div>
              <h3>{this.props.successMessage}</h3>
              <h6>{this.props.successSubMessage}</h6>
          </div>
        </div>
      </div>
    );
  }
}

export default observer(SendEmailFrom);
