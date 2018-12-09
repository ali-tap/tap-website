import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

import Banner from '../../components/Banner/Banner.js';
import BannerLayer from '../../components/Banner/BannerLayer.js';
import Features from '../../components/Features/Features.js'
import CallToAction from '../../components/CallToAction/CallToAction.js'
import Slider from '../../components/Slider/Slider.js';
import ProductsBlocks from '../../components/ProductsBlocks/ProductsBlocks.js';
import LightBox from '../../components/LightBox/LightBox.js';
import TapButton from '../../components/TapButton/TapButton.js'
import AnimatedRow from '../../components/AnimatedRow/AnimatedRow.js';
import Title from '../../components/Title/Title.js';
import Separator from '../../components/Separator/Separator.js';
import TapCarouselSlider from '../../components/TapCarouselSlider/TapCarouselSlider.js';

import callToAction from '../../dataSource/callToAction.json';
import features from '../../dataSource/features.json';
import tapPageIntro from '../../dataSource/tapPageIntro.json';
import news from '../../dataSource/news.json';
import businesses from '../../dataSource/businesses.json';

class MainPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      openLightBox: false,
      lightBoxLink: ''
    };
  }

  componentWillMount(){
    require('./mainPage.css');

    const preferencesStore = this.props.preferencesStore;
    preferencesStore.filterJsonStringsBasedOnLanguage(features.items);
    preferencesStore.filterJsonStringsBasedOnLanguage(features);
    preferencesStore.filterJsonStringsBasedOnLanguage(callToAction);
    preferencesStore.filterJsonStringsBasedOnLanguage(tapPageIntro);
    preferencesStore.filterJsonStringsBasedOnLanguage(news);
    preferencesStore.filterJsonStringsBasedOnLanguage(businesses);

  }

  includebreaks(text){
      return text.split("\n").map((text,key)=><span key={key}>{text}<br/></span>);
  }

  getVideoLink(partner,productObj){
    let videoLink = '';
    partner?
        videoLink=partner.products.filter(product=>product.product===productObj.product)[0].videoLink
        :videoLink=productObj.videoLink;
    videoLink?
      null
      :
      videoLink=productObj.videoLink;

      return videoLink;
  }

  openLightBoxFunction(link){
    if(link){
      this.setState({
        openLightBox: true,
        lightBoxLink: link
      });
    }
  }

  closeLightBoxFunction(){
    this.setState({
      openLightBox: false,
    });
    setTimeout(
        function() {
          this.setState({
            lightBoxLink: ''
          });
        }
        .bind(this),
        200
    );
  }

  render() {
    let preferencesStore = this.props.preferencesStore;

    let partner=false;
    let string = this.props.partner ;
    string?
        partner=preferencesStore.getCurrentPartner(string)
        :partner=false;

    let productsObjects=[];
    string?
      partner.products.map(product=>{productsObjects.push(preferencesStore.getProduct(product.product))})
      :productsObjects = preferencesStore.getProducts();

      let businessesList = [];
      businesses.filter(business => business.product === 'pay')[0]?
        businessesList = businesses.filter(business => business.product === 'pay')[0].businessesList
        :
        businessesList = null;

      let businessesListTitle = '';
      businesses.filter(business => business.product === 'pay')[0]?
        businessesListTitle = businesses.filter(business => business.product === 'pay')[0].title
        :
        businessesListTitle = null;

    // {productsObjects.length===1&&(!this.props.match.params.product)?window.location.href = '/'+this.props.match.params.language+'/'+productsObjects[0].product+'/'+this.props.match.params.partner:null}
    return (
      <React.Fragment>
      {partner && partner.products.length===1?
        <Redirect to={'/'+this.props.country+'/'+this.props.language+'/'+partner.products[0].slot+'/'+this.props.partner}/>
        :
        <React.Fragment>
            <LightBox
                link={this.state.lightBoxLink}
                open={this.state.openLightBox}
                onClick={()=>this.closeLightBoxFunction()}
            >
            </LightBox>
            <Slider
              language={preferencesStore.language}
              oneBackground={partner?true:false}
              backgroundColor={partner?partner.brandingColor:''}
              backgroundImage={partner?partner.paternImage:''}
              hideOnSmall={productsObjects.length>1}
            >

            {
              productsObjects.map((productsObject,key)=>{
              return(
                  <Banner
                    key={key}
                    preferencesStore={preferencesStore}
                    cropped={65}
                    backgroundColor={partner?partner.brandingColor:productsObject.brandingColor}
                    backgroundImage={partner?partner.paternImage:''}
                    reverse={true}
                    maxContentHeight={true}
                    >
                        <BannerLayer
                            animation='shortFromLeft'>
                            <CallToAction
                                partnerLogo={partner?partner.logo:null}
                                callToAction={preferencesStore.getCallToAction(callToAction,productsObject.product)}
                                country_code={preferencesStore.country_code}
                                language={preferencesStore.language}
                                color={partner?partner.brandingColor:productsObject.brandingColor}
                                source={this.props.match.params.partner?this.props.match.params.partner:''}
                            />
                        </BannerLayer>
                        <BannerLayer
                            animation='shortFromRight'>
                              <img
                                src={preferencesStore.getProduct(productsObject.product).bannerImage}
                                alt="bannerImage"
                                className={this.getVideoLink(partner,productsObject)?'openLightBox bannerImage videoLightBox':'bannerImage'}
                                onClick={()=>this.openLightBoxFunction(this.getVideoLink(partner,productsObject))}
                              />
                        </BannerLayer>
                  </Banner>
                );
            })}
            </Slider>
              <ProductsBlocks
                productsObjects={productsObjects}
                language={this.props.match.params.language}
                partner={this.props.match.params.partner || this.props.match.params.page}
              />
              {partner?
                <div className="container">
                  <div style={{height: '80px'}}></div>
                  <h4>
                    {this.includebreaks(partner.intro)}
                  </h4>
                  <div style={{height:'40px'}}></div>
                  <h5>
                    {this.includebreaks(partner.subIntro)}
                  </h5>
                  <div style={{height: '80px'}}></div>
                </div>
                :
                <React.Fragment>
                <div className='container'>
                  <div style={{height: '120px'}}></div>
                  <TapCarouselSlider
                    title={businessesListTitle?businessesListTitle:null}
                    businesses={businessesList}
                    ItemsInSlide={4}
                    language={preferencesStore.language}
                  />
                  <div style={{height: '80px'}}></div>
                  <Title
                  title={news.title}
                  separator={<Separator width='30%'/>}
                  />
                  <AnimatedRow
                  fullWidthOnMobile={true}
                  itemsInRow={5}
                  spaceBetweenRows={'40px'}
                  >
                  {news.items.map((item,key)=>{
                    return (
                      <div key={key} className='lessOpacityOnHover'>
                      {item.link?
                        <React.Fragment>
                        <a href={item.link} target='_blank'>
                        <img src={item.image} alt='newsImage' style={{width:'160px'}}/>
                        </a>
                        </React.Fragment>
                        :
                        <React.Fragment>
                        <img src={item.image} alt='newsImage' style={{width:'160px'}}/>
                        </React.Fragment>
                      }
                      </div>
                    )
                  })}
                  </AnimatedRow>
                  <div style={{height: '120px'}}></div>
                </div>
                </React.Fragment>
              }
        </React.Fragment>
      }
    </React.Fragment>
    );
  }
}

export default MainPage;
