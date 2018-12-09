
import {decorate, observable} from 'mobx';
import products from '../dataSource/products.json';
import partners from '../dataSource/partners.json';
import languages from '../dataSource/languages.json';
import axios from 'axios';
import fetch from 'node-fetch';
class UserPreferencesStore {

  constructor() {
    this.language = 'en';
    this.productObj = {};
    this.partnerObj = {};
    this.country_code = 'kw';
    this.getCurrentCountryLoading = true;
    this.getAvailableCountriesLoading = true;
    this.availableCountries = [];
    this.pageUrlKeys = {};
    this.intercomUser = {};
  }

  filterJsonStringsBasedOnLanguage(arr){
      if(Array.isArray(arr))
      {
        arr.map(obj => {if(obj.error_message) obj.error_message = obj.error_message[this.language]?obj.error_message[this.language]:obj.error_message; return null;});
        arr.map(obj => {if(obj.title) obj.title = obj.title[this.language]?obj.title[this.language]:obj.title; return null;});
        arr.map(obj => {if(obj.description) obj.description = obj.description[this.language]?obj.description[this.language]:obj.description; return null;});
        arr.map(obj => {if(obj.keyWords) obj.keyWords = obj.keyWords[this.language]?obj.keyWords[this.language]:obj.keyWords; return null;});
        arr.map(obj => {if(obj.paragraph) obj.paragraph = obj.paragraph[this.language]?obj.paragraph[this.language]:obj.paragraph; return null;});
        arr.map(obj => {if(obj.subtitle) obj.subtitle = obj.subtitle[this.language]?obj.subtitle[this.language]:obj.subtitle; return null });
        arr.map(obj => {if(obj.statisticsTitle) obj.statisticsTitle = obj.statisticsTitle[this.language]?obj.statisticsTitle[this.language]:obj.statisticsTitle; return null });
        arr.map(obj => {if(obj.address) obj.address.addressTitle = obj.address.addressTitle[this.language]?obj.address.addressTitle[this.language]:obj.address.addressTitle; return null });
        arr.map(obj => {if(obj.address) obj.address.addressDetails = obj.address.addressDetails[this.language]?obj.address.addressDetails[this.language]:obj.address.addressDetails; return null });
        arr.map(obj => {if(obj.contentTitle) obj.contentTitle = obj.contentTitle[this.language]?obj.contentTitle[this.language]:obj.contentTitle; return null});
        arr.map(obj => {if(obj.businessName) obj.businessName = obj.businessName[this.language]?obj.businessName[this.language]:obj.businessName; return null});
        arr.map(obj => {if(obj.shortTitle) obj.shortTitle = obj.shortTitle[this.language]?obj.shortTitle[this.language]:obj.shortTitle; return null});
        arr.map(obj => {if(obj.actionTitle) obj.actionTitle = obj.actionTitle[this.language]?obj.actionTitle[this.language]:obj.actionTitle; return null});
        arr.map(obj => {if(obj.placeholder) obj.placeholder = obj.placeholder[this.language]?obj.placeholder[this.language]:obj.placeholder; return null});
        arr.map(obj => {if(obj.buttonText) obj.buttonText = obj.buttonText[this.language]?obj.buttonText[this.language]:obj.buttonText; return null});
        arr.map(obj => {if(obj.mobileMessage) obj.mobileMessage = obj.mobileMessage[this.language]?obj.mobileMessage[this.language]:obj.mobileMessage; return null});
        arr.map(obj => {if(obj.subImageContent && obj.subImageContent.buttonText) obj.subImageContent.buttonText = obj.subImageContent.buttonText[this.language]?obj.subImageContent.buttonText[this.language]:obj.subImageContent.buttonText; return null});
        arr.map(obj => {if(obj.subImageContent && obj.subImageContent.title) obj.subImageContent.title = obj.subImageContent.title[this.language]?obj.subImageContent.title[this.language]:obj.subImageContent.title; return null});
        arr.map(obj => {if(obj.subImageContent && obj.subImageContent.paragraph) obj.subImageContent.paragraph = obj.subImageContent.paragraph[this.language]?obj.subImageContent.paragraph[this.language]:obj.subImageContent.paragraph; return null});
        arr.map(obj => {if(obj.conclusion) obj.conclusion = obj.conclusion[this.language]?obj.conclusion[this.language]:obj.conclusion; return null});
        arr.map(obj => {if(obj.callToAction && obj.callToAction.title) obj.callToAction.title = obj.callToAction.title[this.language]?obj.callToAction.title[this.language]:obj.callToAction.title; return null});
        arr.map(obj => {if(obj.callToAction && obj.callToAction.paragraph) obj.callToAction.paragraph = obj.callToAction.paragraph[this.language]?obj.callToAction.paragraph[this.language]:obj.callToAction.paragraph; return null});
        arr.map(obj => {if(obj.callToAction && obj.callToAction.shortTitle) obj.callToAction.shortTitle = obj.callToAction.shortTitle[this.language]?obj.callToAction.shortTitle[this.language]:obj.callToAction.shortTitle; return null});
        arr.map(obj => {if(obj.callToAction && obj.callToAction.shortParagraph) obj.callToAction.shortParagraph = obj.callToAction.shortParagraph[this.language]?obj.callToAction.shortParagraph[this.language]:obj.callToAction.shortParagraph; return null});
        arr.map(obj => {if(obj.callToAction && obj.callToAction.buttonText) obj.callToAction.buttonText = obj.callToAction.buttonText[this.language]?obj.callToAction.buttonText[this.language]:obj.callToAction.buttonText; return null});
        arr.map(obj => {if(obj.successMessage) obj.successMessage = obj.successMessage[this.language]?obj.successMessage[this.language]:obj.successMessage; return null});
        arr.map(obj => {if(obj.successSubMessage) obj.successSubMessage = obj.successSubMessage[this.language]?obj.successSubMessage[this.language]:obj.successSubMessage; return null});
        arr.map(obj => {if(obj.linkText) obj.linkText = obj.linkText[this.language]?obj.linkText[this.language]:obj.linkText; return null});
        arr.map(obj => {if(obj.block) obj.block.subtitle = obj.block.subtitle[this.language]?obj.block.subtitle[this.language]:obj.block.subtitle; return null});
        arr.map(obj => {if(obj.intro) obj.intro = obj.intro[this.language]?obj.intro[this.language]:obj.intro; return null});
        arr.map(obj => {if(obj.subIntro) obj.subIntro = obj.subIntro[this.language]?obj.subIntro[this.language]:obj.subIntro; return null});
        arr.map(obj => {if(obj.items){
          obj.items.map(obj => {if(obj.title) obj.title = obj.title[this.language]?obj.title[this.language]:obj.title; return null}); return null
        };return null;});
        arr.map(obj => {if(obj.categories){
          obj.categories.map(obj => {if(obj.categoryName){obj.categoryName = obj.categoryName[this.language]?obj.categoryName[this.language]:obj.categoryName;
                                                          obj.showMoreButtonText = obj.showMoreButtonText[this.language]?obj.showMoreButtonText[this.language]:obj.showMoreButtonText;
                                                          obj.showLessButtonText = obj.showLessButtonText[this.language]?obj.showLessButtonText[this.language]:obj.showLessButtonText;
                                                            obj.items.map(obj=>{if(obj.title) obj.title = obj.title[this.language]?obj.title[this.language]:obj.title;
                                                                                if(obj.subtitle) obj.subtitle = obj.subtitle[this.language]?obj.subtitle[this.language]:obj.subtitle;
                                                                                if(obj.description) obj.description = obj.description[this.language]?obj.description[this.language]:obj.description;
                                                                                return null;
                                                            })
                                                          };
           return null});
        };return null});

        arr.map(obj => {if(obj.features) {
          obj.features.map(obj => {if(obj.title&&obj.title[this.language]) {obj.title = obj.title[this.language]?obj.title[this.language]:obj.title;} return null});
          obj.features.map(obj => {if(obj.paragraph&&obj.paragraph[this.language]) {obj.paragraph = obj.paragraph[this.language]?obj.paragraph[this.language]:obj.paragraph;} return null});
        } });

        arr.map(obj => {if(obj.statistics) {
          obj.statistics.map(obj => {if(obj.finalText&&obj.finalText[this.language]) {obj.finalText = obj.finalText[this.language]?obj.finalText[this.language]:obj.finalText;} return null});
          obj.statistics.map(obj => {if(obj.description&&obj.description[this.language]) {obj.description = obj.description[this.language]?obj.description[this.language]:obj.description;} return null});
        } });

        arr.map(obj => {if(obj.apiFeatures) {
          obj.apiFeatures.map(obj => {if(obj.title&&obj.title[this.language]) {obj.title = obj.title[this.language]?obj.title[this.language]:obj.title;} return null});
          obj.apiFeatures.map(obj => {if(obj.description&&obj.description[this.language]) {obj.description = obj.description[this.language]?obj.description[this.language]:obj.description;} return null});
          obj.apiFeatures.map(obj => {if(obj.subtitle&&obj.subtitle[this.language]) {obj.subtitle = obj.subtitle[this.language]?obj.subtitle[this.language]:obj.subtitle;} return null});
          obj.apiFeatures.map(obj => {if(obj.readMoreText&&obj.readMoreText[this.language]) {obj.readMoreText = obj.readMoreText[this.language]?obj.readMoreText[this.language]:obj.readMoreText;} return null});
        } });

      arr.map(obj => {if(obj.testimonials) {
        obj.testimonials.map(obj => {if(obj.qoute) obj.qoute = obj.qoute[this.language]?obj.qoute[this.language]:obj.qoute; return null});
        obj.testimonials.map(obj => {if(obj.name) obj.name = obj.name[this.language]?obj.name[this.language]:obj.name; return null});
        obj.testimonials.map(obj => {if(obj.role) obj.role = obj.role[this.language]?obj.role[this.language]:obj.role; return null});
        obj.testimonials.map(obj => {if(obj.businessName) obj.businessName = obj.businessName[this.language]?obj.businessName[this.language]:obj.businessName; return null});
      } })

      arr.map(obj => {if(obj.content) {
        obj.content.map(obj => {if(obj.title&&obj.title[this.language]) {obj.title = obj.title[this.language]?obj.title[this.language]:obj.title;} return null});
        obj.content.map(obj => {if(obj.paragraph&&obj.paragraph[this.language]) {obj.paragraph = obj.paragraph[this.language]?obj.paragraph[this.language]:obj.paragraph;} return null});
      } })

      arr.map(obj => {if(obj.fields) {
        obj.fields.map(obj => {if(obj.title) {obj.title = obj.title[this.language]?obj.title[this.language]:obj.title;} return null});
        //obj.fields.map(obj => {if(obj.SelectValue) {obj.SelectValue = obj.SelectValue[this.language];} return null});
        obj.fields.map(obj => {if(obj.options) {obj.options.map(option=>{if(option.optionValue) {option.optionValue = option.optionValue[this.language]?option.optionValue[this.language]:option.optionValue;} return null})} return null});
      } })
      }
      else{
        if(arr.title){arr.title=arr.title[this.language]?arr.title[this.language]:arr.title}
        if(arr.intro){arr.intro=arr.intro[this.language]?arr.intro[this.language]:arr.intro}
        if(arr.subIntro){arr.subIntro=arr.subIntro[this.language]?arr.subIntro[this.language]:arr.subIntro}
        if(arr.inputsPlaceholders){arr.inputsPlaceholders.map(obj=>{if(obj.placeholder) obj.placeholder = obj.placeholder[this.language]?obj.placeholder[this.language]:obj.placeholder; return null;} )}
        if(arr.buttonsTexts){arr.buttonsTexts.map(obj=>{if(obj.text) obj.text = obj.text[this.language]?obj.text[this.language]:obj.text; return null;} )}
        if(arr.links){arr.links.map(obj=>{if(obj.linkText) obj.linkText = obj.linkText[this.language]?obj.linkText[this.language]:obj.linkText; return null;} )}
        if(arr.name){arr.name=arr.name[this.language]?arr.name[this.language]:arr.name}
        if(arr.members){arr.members.map(item=>{
          item.name[this.language]?item.name=item.name[this.language]:item.name;
          item.position[this.language]?item.position=item.position[this.language]:item.position;
        })}
      }
  }

  setIntercomeUser(user_id, email_address, profile_name){
    this.intercomUser = {
      user_id: user_id,
      email: email_address,
      name: profile_name
    }
  }

  saveUrlKeys(urlKeysString){
    urlKeysString = urlKeysString.replace('?','');
    let proccessKeys = urlKeysString.split('&');
    proccessKeys.map(proccessKey=>{
      let key = proccessKey.split('=')[0];
      let vlaue = proccessKey.split('=')[1];
      this.pageUrlKeys[key] = vlaue;
    })
    console.log(this.pageUrlKeys);
  }


  getProducts(){
    let newProductsList = [];
    products.map((product,key)=>{
      if (product.countries.filter(country=>country.toLowerCase()===this.country_code.toLowerCase()).length!==0){
        newProductsList.push(product);
      }
    });
    return newProductsList;
  }

  setCountryCode(country_code){
    country_code?
      this.country_code = country_code
      :
      null
  }

  setLanguage(language){
    language && languages.filter(lang=>lang.slot===language)[0]?
    this.language = language
    :
    null;
    this.filterJsonStringsBasedOnLanguage(products);
    this.filterJsonStringsBasedOnLanguage(partners);
  }

  getCurrentCountry(){
      setTimeout(
        function() {
          // if(document.getElementsByTagName('html')[0].hasAttribute('country')){
          //         this.country_code = document.getElementsByTagName('html')[0].getAttribute('country');
          //         this.getCurrentCountryLoading = false;
          // }
          // else{
                  this.country_code = 'kw';
                  this.getCurrentCountryLoading = false;
          // }

        }
        .bind(this),
        500
    );
  }

  getValueBasedOnCountryCode(arr){
    let result = arr.filter(item=>item.country_code.toLowerCase()===this.country_code.toLowerCase())
    result.length===0?result = arr.filter(item=>item.country_code.toLowerCase()==='kw'):null;
    return result[0];
  }

  getProduct(product){
    let result = products.filter(item=>item.product.toLowerCase()===product.toLowerCase())
    return result[0];
  }

  // getProducts(){
  //   return products;
  // }

  filterMenuBasedOnCountry(menu){
      menu.map((menuObj,key)=>{
        if(menuObj.type==='product'){
          let bool = false
          let produsctss = this.getProducts();
          for (var i = 0; i < produsctss.length; i++) {
            if(produsctss[i].slot===menuObj.slot){
              bool = bool || true ;
            }
          }
          if(!bool){
            menu.splice(key, 1);
          }
        }
      })
  }

  getAvailableCountries(){
    fetch('https://partners.payments.tap.company/api/v1.3/api/Country/GetCountries?language_code='+this.language)
      .then(results => {
        return results.json();
      })
      .then(data => {
          this.availableCountries = data;
      })
      .then(anything=>{
        this.getAvailableCountriesLoading = false;
      })
  }

  getCurrentPartner(partner){
    let result = partners.filter(item=>item.name.toLowerCase()===partner.toLowerCase())
    return result[0];
  }

  getCallToAction(callToAction,product){
    let result = callToAction.filter(item=>item.product.toLowerCase()===product.toLowerCase())
    return result[0];
  }

  getFeatures(productsFeatures,product){
    let result = productsFeatures.filter(item=>item.product.toLowerCase()===product.toLowerCase())
    return result[0];
  }

  getMetaTag(metaTags,pageName,windowLocationHref){
    let result = metaTags.filter(item=>item.pageTemplate.toLowerCase()===pageName.toLowerCase() && windowLocationHref.indexOf(item.link)>-1)
    return result[0];
  }

}

decorate(UserPreferencesStore, {
  language: observable,
  productObj: observable,
  partnerObj: observable,
  country_code: observable,
  getCurrentCountryLoading: observable,
  getAvailableCountriesLoading: observable,
  availableCountries: observable,
  pageUrlKeys: observable,
  intercomUser: observable
})

let preferencesStore = new UserPreferencesStore();
preferencesStore.getCurrentCountry();
preferencesStore.getProducts();
preferencesStore.getAvailableCountries();
export default preferencesStore;
