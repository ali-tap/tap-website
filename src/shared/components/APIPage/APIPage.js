import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import Banner from '../../components/Banner/Banner.js';
import BannerLayer from '../../components/Banner/BannerLayer.js';
import Slider from '../../components/Slider/Slider.js';
import Separator from '../../components/Separator/Separator.js';
import TapButton from '../../components/TapButton/TapButton.js';
import AnimatedRow from '../../components/AnimatedRow/AnimatedRow.js';
import Title from '../../components/Title/Title.js';
import Counter from '../../components/Counter/Counter.js';
import Feature from '../../components/Feature/Feature.js';
import Img from '../../components/Img/Img.js';

import pages from '../../dataSource/pages.json';
import axios from 'axios';

class APIPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillMount(){
    require('./apiPage.css');
    const preferencesStore = this.props.preferencesStore;
    preferencesStore.filterJsonStringsBasedOnLanguage(pages);
    this.getPlatforms();
  }

  includebreaks(text){
    return text.split("\n").map((text,key)=><span key={key}>{this.includeLinks(text)}<br/></span>);
  }

  includeLinks(text){
    return text.split(" ").map((text,key)=>text.indexOf('\\')>-1?<Link style={{color:'#000',textDecoration:'underline'}} to={text.split("\\")[1]}>{text.split("\\")[0]+' '}</Link>:text+' ');
  }

  getPlatforms(){
    // axios.post('https://www.gotapnow.com/buireg/V1.3/api/SiteTechnology/GetWebsitePlatforms')
    //     .then(response => response.data)
    //     .then(data => {
    //       console.log(data);
    //     })
    //     .catch(error => {
    //     });
    let arr = [
      {
        name:"wordpress",
        displayname:"WordPress",
        image:"http://www.tap.company/register/reg-imgs/platforms/WordPress.svg",
        documentationurl:"https://wordpress.org/plugins/tap-payments"
      },
      {
        name:"opencart",
        displayname:"OpenCart",
        image:"http://www.tap.company/register/reg-imgs/platforms/OpenCart.svg",
        documentationurl:"https://www.opencart.com/index.php?route=marketplace/extension/info&extension_id=28240"
      },
      {
        name:"prestashop",
        displayname:"PrestaShop",
        image:"http://www.tap.company/register/reg-imgs/platforms/PrestaShop.svg",
        documentationurl:"http://www.tap.company/Plugins/Prestashop/PrestaShop.rar"
      },
      {
        name:"ecwid",
        displayname:"Ecwid",
        image:"http://www.tap.company/register/reg-imgs/platforms/Ecwid.svg",
        documentationurl:"https://support.ecwid.com/hc/en-us/articles/207100429-Payment-options#SowhatIneedtostartacceptingcreditcardsactually?"
      },
      {
        name:"joomla",
        "displayname":"Joomla",
        image:"http://www.tap.company/register/reg-imgs/platforms/Joomla.svg",
        documentationurl:"http://www.tap.company/Plugins/Joomla/Joomla.zip"
      },
      {
        name:"magento",
        displayname:"Magento",
        image:"http://www.tap.company/register/reg-imgs/platforms/Magento.svg",
        documentationurl:"http://www.tap.company/Plugins/Magento/Magento.rar"
      },
      {
        name:"shopify",
        displayname:"Shopify",
        image:"http://www.tap.company/register/reg-imgs/platforms/Shopify.svg",
        documentationurl:"https://help.shopify.com/manual/payments/third-party-gateways"
      }
    ]
    return arr;
  }

  getProgrammingLanguages(){
    let arr = [
     {
        "name":"php",
        "displayname":"PHP",
        "image":"http://www.tap.company/register/reg-imgs/platforms/PHP.svg",
        "documentationurl":"http://www.tap.company/developers/"
     },
     {
        "name":"python",
        "displayname":"Python",
        "image":"http://www.tap.company/register/reg-imgs/platforms/Python.svg",
        "documentationurl":"http://www.tap.company/developers/"
     },
     {
        "name":"aspnet",
        "displayname":"ASP.NET",
        "image":"http://www.tap.company/register/reg-imgs/platforms/ASP.NET.svg",
        "documentationurl":"http://www.tap.company/developers/"
     },
     {
        "name":"java",
        "displayname":"Java",
        "image":"http://www.tap.company/register/reg-imgs/platforms/Java.svg",
        "documentationurl":"http://www.tap.company/developers/"
     },
     {
        "name":"nodejs",
        "displayname":"Node.js",
        "image":"http://www.tap.company/register/reg-imgs/platforms/Node.js.svg",
        "documentationurl":"http://www.tap.company/developers/"
     },
     {
        "name":"rubyonrails",
        "displayname":"Ruby on Rails",
        "image":"http://www.tap.company/register/reg-imgs/platforms/Ruby%20on%20Rails.svg",
        "documentationurl":"http://www.tap.company/developers/"
     }
    ]
    return arr;
  }

  render() {
    const preferencesStore = this.props.preferencesStore;
    const pageObj = pages.filter(page=>page.page==='api')[0];
    const banners = [pageObj];
    const platforms = this.getPlatforms();
    const programmingLanguages = this.getProgrammingLanguages();
    const titleStyle = {
      position: 'absolute',
      fontSize: '17px',
      left: '0',
      right: '0',
      marginLeft: 'auto',
      marginRight: 'auto',
      width: '80px',
      backgroundColor: '#f7f7f7',
      marginTop: '5px'
    }

    return (
      <React.Fragment>
        <Slider
        language={preferencesStore.language}
        oneBackground={true}
        backgroundColor={pageObj.color}
        backgroundImage={pageObj.bannerImage}
        backgroundSize='900px'
        backgroundPosition='center'
        hideOnSmall={banners.length>1}
        >
        {
          banners.map((banner,key)=>{
          return(
              <Banner
              key={0}
              preferencesStore={preferencesStore}
              cropped={65}>
                <BannerLayer>
                    {pageObj.callToAction?
                      <div>
                      <h1 style={{color:'#fff',fontSize:'60px'}}>{pageObj.callToAction.title}</h1>
                      <div style={{height:'7px'}}></div>
                      <h5 style={{color:'#fff'}}>{pageObj.callToAction.paragraph}</h5>
                      <div style={{height:'15px'}}></div>
                      <TapButton
                        shape='bordered'
                        color={pageObj.color}
                        text={pageObj.callToAction.buttonText}
                        hoverStyle={true}
                        type={'link'}
                        link={pageObj.callToAction.buttonLink}
                        actionType='link'
                      />
                      </div>
                      :
                      null
                    }
                </BannerLayer>
              </Banner>
            );
        })}
        </Slider>

        <div className='container'>
        {pageObj.features?
          <React.Fragment>
          <div style={{height:'120px'}}></div>
          <AnimatedRow
          animation='animateFromButtom'
          fullWidthOnMobile={true}>
          {pageObj.features.map((feature,key)=>{
            return (
              <div key={key}>
              <Img src={feature.icon} style={{width:'40%'}}/>
              <h5>{feature.title}</h5>
              <div style={{height:'15px'}}></div>
              <h6>{feature.paragraph}</h6>
              </div>
            )
          })}
          </AnimatedRow>
          </React.Fragment>
          :
          null
        }
        {platforms?
          <React.Fragment>
          <div style={{height:'140px'}}></div>
          <Title
          style={titleStyle}
          title='Plugins'
          separator={<Separator width={'30%'}/>}
          />
          <div style={{height:'5px'}}></div>
          <AnimatedRow
          style={{width:'90%'}}
          divWidth='120px'
          >
          {platforms.map((platform,key)=>{
            return (
              <React.Fragment key={key}>
              <a href={platform.documentationurl} target='_blank'>
              <Img src={platform.image} style={{width:'100%'}}/>
              </a>
              </React.Fragment>
            )
          })}
          </AnimatedRow>
          </React.Fragment>
          :
          null
        }
        {programmingLanguages?
          <React.Fragment>
          <div style={{height:'5px'}}></div>
          <Title
          style={titleStyle}
          title='API'
          separator={<Separator width={'30%'}/>}
          />
          <div style={{height:'5px'}}></div>
          <AnimatedRow
          style={{width:'90%'}}
          divWidth='120px'
          >
          {programmingLanguages.map((programmingLanguage,key)=>{
            return (
              <React.Fragment key={key}>
              <a href={programmingLanguage.documentationurl} target='_blank'>
              <Img src={programmingLanguage.image} style={{width:'100%'}}/>
              </a>
              </React.Fragment>
            )
          })}
          </AnimatedRow>
          </React.Fragment>
          :
          null
        }
        {pageObj.statistics?
          <React.Fragment>
          <div style={{height:'140px'}}></div>
          <Title
          title={pageObj.statisticsTitle}
          separator={<Separator width={'30%'}/>}
          />
          <AnimatedRow
          animation='animateFromButtom'
          fullWidthOnMobile={true}
          >
          {pageObj.statistics.map((statistic,key)=>{
            return (
              <React.Fragment key={key}>
              <Img src={statistic.icon} style={{width:'100px'}}/>
              <Counter
              countTo={statistic.countTo}
              finalText={statistic.finalText}
              />
              <div style={{height:'5px'}}></div>
              <h6>{statistic.description}</h6>
              </React.Fragment>
            )
          })}
          </AnimatedRow>
          </React.Fragment>
          :
          null
        }

        {pageObj.title?
          <React.Fragment>
          <div style={{height:'140px'}}></div>
          <Title
            title={pageObj.title}
            separator={<Separator width='30%'/>}
          />
          </React.Fragment>
          :
          null
        }

        {pageObj.paragraph?
          <React.Fragment>
          <div style={{height:'20px'}}></div>
          <h6>
          {pageObj.paragraph}
          </h6>
          </React.Fragment>
          :
          null
        }

        {pageObj.apiFeatures?
          <React.Fragment>
          <div style={{height:'60px'}}></div>
          {pageObj.apiFeatures.map((feature,key)=>{
            return (
              <React.Fragment key={key}>
              {key!==0?
              <div style={{height:'30px'}}></div>
              :
              null
              }
              <Feature
                icon={feature.icon}
                title={this.includebreaks(feature.title)}
                subtitle={feature.subtitle}
                description={feature.description}
                readMoreText={feature.readMoreText}
                link={feature.link}
                language={preferencesStore.language}
              />
              <div style={{height:'30px'}}></div>
              {key!==pageObj.apiFeatures.length-1?
              <Separator width='100%'/>
              :
              null
              }
              </React.Fragment>
            )
          })}
          </React.Fragment>
          :
          null
        }
        </div>

        {pageObj.callToAction?
          <React.Fragment>
          <div style={{height:'140px'}}></div>
          <div className='bottomCallToActionStrip' style={{backgroundColor:pageObj.color, padding: '20px 0px 0px 0px'}}>
            <div className='container'>
                <div className='bottomFeaturedImage' style={{width:'50%', display:'inline-block'}}>
                  <Img src={pageObj.callToAction.image}/>
                </div>
                <div className='bottomCallToAction' style={{width:'50%',display:'inline-block',verticalAlign:'middle',textAlign:'justify'}}>
                  <b><h2 style={{color:'#fff'}}>{pageObj.callToAction.shortTitle}</h2></b>
                  <div style={{height:'7px'}}></div>
                  <h5 style={{color:'#fff'}}>{pageObj.callToAction.shortParagraph}</h5>
                  <div style={{height:'15px'}}></div>
                  <TapButton
                    shape='bordered'
                    color={pageObj.color}
                    text={pageObj.callToAction.buttonText}
                    hoverStyle={true}
                    type={'link'}
                    link={pageObj.callToAction.buttonLink}
                    actionType='link'
                  />
                </div>
            </div>
          </div>
          </React.Fragment>
          :
          null
        }

      </React.Fragment>
    );
  }
}

export default APIPage;
