import React, { Component } from 'react';

import Banner from '../../components/Banner/Banner.js';
import BannerLayer from '../../components/Banner/BannerLayer.js';
import Slider from '../../components/Slider/Slider.js';
import LightBox from '../../components/LightBox/LightBox.js';
import SendEmailFrom from '../../components/SendEmailFrom/SendEmailFrom.js';
import Separator from '../../components/Separator/Separator.js';
import TapButton from '../../components/TapButton/TapButton.js';
import ParallaxScroll from '../../components/ParallaxScroll/ParallaxScroll.js';
import Img from '../../components/Img/Img.js';

import pages from '../../dataSource/pages.json';
import formsFields from '../../dataSource/formsFields.json';


class JobsPaga extends Component {

  constructor(props) {
    super(props);
    this.state = {
      openLightBox:false
    };
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
  }

  componentWillMount(){
    const preferencesStore = this.props.preferencesStore;
    preferencesStore.filterJsonStringsBasedOnLanguage(pages);
    preferencesStore.filterJsonStringsBasedOnLanguage(formsFields);
  }

  includebreaks(text){
    return text.split("\n").map((text,key)=><span key={key}>{text}<br/></span>);
  }

  render() {
    const preferencesStore = this.props.preferencesStore;
    const pageObj = pages.filter(page=>page.page==='jobs')[0];
    const banners = [pageObj];
    const formFields = formsFields.filter(formFields=>formFields.key==='applyforajob')[0];
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
            template_id={formFields.template_id}
            fields={formFields.fields}
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
        backgroundImage={pageObj.bannerImage}
        backgroundSize='cover'
        backgroundPosition='top'
        hideOnSmall={banners.length>1}
        >
        {
          banners.map((banner,key)=>{
          return(
              <Banner
              key={0}
              preferencesStore={preferencesStore}
              cropped={65}>
                <BannerLayer/>
              </Banner>
            );
        })}
        </Slider>

        <div className='container'>
        {pageObj.intro?
          <React.Fragment>
          <div style={{height:'50px'}}></div>
          <h2>{pageObj.intro}</h2>
          </React.Fragment>
          :
          null
        }

        {pageObj.subIntro?
          <React.Fragment>
          <div style={{height:'20px'}}></div>
          <h5>{pageObj.subIntro}</h5>
          </React.Fragment>
          :
          null
        }

        <div style={{height:'40px'}}></div>
        <Separator width='90%'/>

        {pageObj.contentTitle?
          <React.Fragment>
          <div style={{height:'50px'}}></div>
          <h5>{pageObj.contentTitle}</h5>
          </React.Fragment>
          :
          null
        }

        {pageObj.content?
          pageObj.content.map((paragraph,key)=>{
            return (
              <div key={key} style={{width:'80%', margin:'auto'}}>
              <div style={{height:'60px'}}></div>
              <Img src={paragraph.icon} alt={paragraph.title} style={{width:'60px'}}/>
              <div style={{height:'10px'}}></div>
              <b><h6>{paragraph.title}</h6></b>
              <h6>{this.includebreaks(paragraph.paragraph)}</h6>
              </div>
            )
          })
          :
          null
        }
        </div>
        {pageObj.subImage?
          <React.Fragment>
            <div style={{height:'110px'}}></div>
            <ParallaxScroll
              height='500px'
              backgroundImage={pageObj.subImage}
              withContentBackground={true}
            >
            <div>
              <h2>{pageObj.subImageContent.title}</h2>
              <div style={{height:'15px'}}></div>
              <h6>{pageObj.subImageContent.paragraph}</h6>
              <div style={{height:'15px'}}></div>
              <TapButton
                text={pageObj.subImageContent.buttonText}
                onClick={()=>this.openLightBoxFunction()}
                shape='bordered colored'
                hoverStyle={true}
                color={pageObj.color}
              />
            </div>
            </ParallaxScroll>
          </React.Fragment>
          :
          null
        }
      </React.Fragment>
    );
  }
}

export default JobsPaga;
