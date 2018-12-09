
import {decorate, observable} from 'mobx';
import fetch from 'node-fetch';

class CallToActionStore {

  constructor() {
    this.language = '';
    this.international_code='';
    this.loading = true;
    this.countries = [];
    this.currentCountry = {country_flag_url:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Circle_Platinum_Solid.svg/2000px-Circle_Platinum_Solid.svg.png'};
    this.showSuccessMsg = false;
    this.successMsg = '';
    this.mobile_number = '';
    this.showValidateMsg = false;
    this.validateMsg = '';
  }

  retriveCountries(){
    fetch('https://partners.payments.tap.company/api/v1.3/api/Country/GetAllCountries?language_code='+this.language)
      .then(results => {
        return results.json();
      })
        .then(data => {
            this.countries = data;
        });
  }

  setLanguage(language){
    this.language = language;
  }

  selectCountry(country_code) {
      if(this.countries.length===0)
        {
          this.retriveCountries();
          setTimeout(
              function() {
                this.setCurrentCountry(country_code);
              }
              .bind(this),
              2100
          );
        }
        else{
          this.setCurrentCountry(country_code);
        }
  }

  setCurrentCountry(country_code){
      this.countries.map(
        country => country.country_code.toLowerCase()===country_code.toLowerCase()?
                   this.currentCountry = country : this.currentCountry=this.currentCountry);
  }

  getValue(event){
      this.mobile_number = event.target.value
  }


  sendSms(product,source,send_sms,redirectLink){
    var mypostrequest = new XMLHttpRequest();
    let this_ = this;
    if(source && source.indexOf('src=')>-1){
      source = source.split('=')[1];
    }
    else{
      source = 'tap';
    }
    mypostrequest.open("POST", "https://partners.payments.tap.company/api/v1.3/api/Mobile/ValidateMobile?mobile_number="+this.mobile_number+"&country_code="+this.currentCountry.country_code+"&language_code="+this.language, true);
    mypostrequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    mypostrequest.send('mobile_number='+this.mobile_number+'&country_code='+this.currentCountry.country_code+'&language_code='+this.language);
    mypostrequest.onreadystatechange=function(){
     if (mypostrequest.readyState===4){
      if (mypostrequest.status===200 || window.location.href.indexOf("http")===-1){
            if(JSON.parse(mypostrequest.responseText).is_valid){
                    var postrequest = new XMLHttpRequest();
                    postrequest.open("POST", "https://partners.payments.tap.company/api/v1.3/api/SMS/SendSMS", true);
                    postrequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                    postrequest.send('mobile_number='+this_.currentCountry.international_code+this_.mobile_number+'&source='+source+'&country_code='+this_.currentCountry.country_code+'&schedule_for='+'GD'+'&language_code='+this_.language+'&send_sms='+send_sms+'&add_lead='+1);
                    postrequest.onreadystatechange=function(){
                     if (postrequest.readyState===4){
                      if (postrequest.status===200 || window.location.href.indexOf("http")===-1){
                            this_.successMsg = JSON.parse(postrequest.responseText).response_message;
                            this_.showSuccessMsg = true;
                            setTimeout(() => {
                              this_.showSuccessMsg = false;
                            }, 5000);
                            if(!send_sms){
                                window.location.href = redirectLink;
                            }
                      }
                      else{
                       //alert("An error has occured making the request");
                      }
                     }
                    }
            }
            else{
                this_.validateMsg = JSON.parse(mypostrequest.responseText).response_message;
                this_.showValidateMsg = true;
                setTimeout(() => {
                  this_.showValidateMsg = false;
                }, 5000);
            }
      }
      else{
       //alert("An error has occured making the request");
      }
     }
    }
  }

}

  decorate(CallToActionStore, {
      language : observable,
      international_code: observable,
      loading : observable,
      currentCountry : observable,
      countries: observable,
      showSuccessMsg: observable,
      successMsg: observable,
      mobile_number: observable,
      validateMsg: observable,
      showValidateMsg: observable,
  })

let store = new CallToActionStore();
store.retriveCountries();
export default store;
