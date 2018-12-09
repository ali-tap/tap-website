import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import Banner from '../../components/Banner/Banner.js';
import BannerLayer from '../../components/Banner/BannerLayer.js';
import Slider from '../../components/Slider/Slider.js';
import Separator from '../../components/Separator/Separator.js';
import ParallaxScroll from '../../components/ParallaxScroll/ParallaxScroll.js';
import pages from '../../dataSource/pages.json';
import teamMembers from '../../dataSource/teamMembers.json';
import TeamMembers from '../../components/TeamMembers/TeamMembers.js';

class AboutPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillMount(){
    const preferencesStore = this.props.preferencesStore;
    preferencesStore.filterJsonStringsBasedOnLanguage(pages);
    preferencesStore.filterJsonStringsBasedOnLanguage(teamMembers);
    // preferencesStore.filterJsonStringsBasedOnLanguage(teamMembers.items);

  }

  includebreaks(text){
    return text.split("\n").map((text,key)=><span key={key}>{this.includeLinks(text)}<br/></span>);
  }

  includeLinks(text){
    return text.split(" ").map((text,key)=>text.indexOf('\\')>-1?<Link key={key} style={{color:'#000',textDecoration:'underline'}} to={text.split("\\")[1]}>{text.split("\\")[0]+' '}</Link>:text+' ');
  }

  render() {
    const preferencesStore = this.props.preferencesStore;
    const pageObj = pages.filter(page=>page.page==='about')[0];
    const banners = [pageObj];
    return (
      <React.Fragment>
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

        <div style={{height:'30px'}}></div>
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
              <div key={key}>
              <div style={{height:'50px'}}></div>
              <b><h5>{paragraph.title}</h5></b>
              <div style={{height:'15px'}}></div>
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
            <div style={{height:'70px'}}></div>
            <ParallaxScroll
              backgroundImage={pageObj.subImage}
            >
            <div>
              <h2 style={{color:'#fff'}}>
                {pageObj.subImageContent.title}
              </h2>
            </div>
            </ParallaxScroll>
          </React.Fragment>
          :
          null
        }

        <div className='container'>
        {pageObj.conclusion?
          <React.Fragment>
          <div style={{height:'70px'}}></div>
          <h6>{this.includebreaks(pageObj.conclusion)}</h6>
          </React.Fragment>
          :
          null
        }
        {teamMembers?
          <React.Fragment>
          <div style={{height:'70px'}}></div>
          <TeamMembers
            title={teamMembers.title}
            teamMembers={teamMembers.members}
          />
          <div style={{height:'40px'}}></div>
          </React.Fragment>
          :
          null
        }

        </div>
      </React.Fragment>
    );
  }
}

export default AboutPage;
