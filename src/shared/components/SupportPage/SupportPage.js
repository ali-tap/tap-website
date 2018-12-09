import React, { Component } from 'react';
import root from 'window-or-global';

import Banner from '../../components/Banner/Banner.js';
import BannerLayer from '../../components/Banner/BannerLayer.js';
import Slider from '../../components/Slider/Slider.js';
import Map from '../../components/Map/Map.js';
import TapAddress from '../../components/TapAddress/TapAddress.js';
import LightBox from '../../components/LightBox/LightBox.js';
import SendEmailFrom from '../../components/SendEmailFrom/SendEmailFrom.js'
import Img from '../../components/Img/Img.js';

import pages from '../../dataSource/pages.json';
import formsFields from '../../dataSource/formsFields.json';
import addresses from '../../dataSource/addresses.json';


class SupportPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      mapHeight : 0,
      openLightBox:false
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  openLightBoxFunction(){
      this.setState({
        openLightBox: true,
      });
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

  componentWillMount(){
    const preferencesStore = this.props.preferencesStore;
    preferencesStore.filterJsonStringsBasedOnLanguage(pages);
    preferencesStore.filterJsonStringsBasedOnLanguage(formsFields);
    preferencesStore.filterJsonStringsBasedOnLanguage(addresses);
  }

  componentDidMount() {
    root.addEventListener('resize', this.updateWindowDimensions);
    this.updateWindowDimensions();
  }

  componentWillUnmount() {
    root.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ mapHeight: root.innerHeight });
  }

  includebreaks(text){
    return text.split("\n").map((text,key)=><span key={key}>{text}<br/></span>);
  }

  render() {
    const preferencesStore = this.props.preferencesStore;
    const pageObj = pages.filter(page=>page.page==='support')[0];
    const banners = [pageObj];
    const formFields = formsFields.filter(formFields=>formFields.key==='contactus')[0];
    const addressObj = preferencesStore.getValueBasedOnCountryCode(addresses);

    return (
      <React.Fragment>
      <LightBox
        open={this.state.openLightBox}
        onClick={()=>this.closeLightBoxFunction()}
        dialogueBoxStyle={{width:'55%'}}
        fullOnSmall={true}
      >
          <div style={{height:'50px'}}></div>
          <SendEmailFrom
            title={formFields.title}
            fields={formFields.fields}
            template_id={formFields.template_id}
            successMessage={formFields.successMessage}
            successSubMessage={formFields.successSubMessage}
            buttonText={formFields.buttonText}
            buttonColor={pageObj.color}
            fieldsStyle={{width:'80%',border:'1px solid #e0e0e0'}}
          />
          <div style={{height:'50px'}}></div>
      </LightBox>
        <Slider
        language={preferencesStore.language}
        oneBackground={true}
        backgroundColor={pageObj.color}
        hideOnSmall={banners.length>1}
        >
        {
          banners.map((banner,key)=>{
          return(
              <Banner
              key={0}
              preferencesStore={preferencesStore}
              cropped={65}>
                <BannerLayer
                    animation=''>
                      <Img src={banner.bannerImage}/>
                </BannerLayer>
              </Banner>
            );
        })}
        </Slider>
        {pageObj.content?
          pageObj.content.map((paragraph,key)=>{
            return (
              <React.Fragment key={key}>
              <div style={{height:'80px'}}></div>
              <h2>{paragraph.title}</h2>
              <div style={{height:'20px'}}></div>
              <h5>{this.includebreaks(paragraph.paragraph)}</h5>
              <div style={{height:'80px'}}></div>
              </React.Fragment>
            )
          })
          :
          null
        }
        <Map
          height={this.state.mapHeight}
          lat={29.3460378}
          lng={48.0848072}
          zoom={15}
        >
        <TapAddress
          title={addressObj.address.addressTitle}
          address={this.includebreaks(addressObj.address.addressDetails)}
          phoneNumber={addressObj.phoneNumber}
          buttonColor={pageObj.color}
          buttonText={formFields.title}
          onButtonClick={()=>this.openLightBoxFunction()}
        />
        </Map>
      </React.Fragment>
    );
  }
}

export default SupportPage;
