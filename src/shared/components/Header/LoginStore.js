import {decorate, observable} from 'mobx';

class LoginStore {

  constructor() {
    this.loginHeaderState = 'closed';
    this.response_code = '';
    this.response_message = '';
    this.redirect_url = ''
  }

  clearResponse(){
    this.response_code = '';
    this.response_message = '';
    this.redirect_url = ''    
  }

  closeOpenLoginHeader(){
    this.loginHeaderState==='closed'? this.loginHeaderState = 'opened': this.loginHeaderState = 'closed';
  }

  login(email_address,password){
    var mypostrequest = new XMLHttpRequest();
    let this_ = this;
    mypostrequest.open("POST", "https://partners.payments.tap.company/api/v1.3/api/Account/Login", true);
    mypostrequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    mypostrequest.send('email_address='+email_address+'&password='+password);
    mypostrequest.onreadystatechange=function(){
     if (mypostrequest.readyState===4){
      if (mypostrequest.status===200 || window.location.href.indexOf("http")===-1){
        this_.response_code = JSON.parse(mypostrequest.responseText).response_code;
        this_.response_message = JSON.parse(mypostrequest.responseText).response_message;
        this_.redirect_url = JSON.parse(mypostrequest.responseText).redirect_url;
      }
      else{
       //alert("An error has occured making the request");
      }
     }
    }
  }

}

decorate(LoginStore, {
  loginHeaderState: observable,
  response_code: observable,
  response_message: observable,
  redirect_url: observable,
})

let loginStore = new LoginStore();
export default loginStore;
