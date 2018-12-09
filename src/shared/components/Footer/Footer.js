import React, { Component } from 'react';
import FooterMenus from './FooterMenus.js';
import FooterImages from './FooterImages.js'
import SocialMedia from './SocialMedia.js';
import LanguageSwitcher from './LanguageSwitcher.js';
import CountrySwitcher from './CountrySwitcher.js'
import RightsFooterMenu from './RightsFooterMenu.js'

class Footer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      firstSide:'leftSide',
      secondSide:'rightSide'
    };
  }

  componentWillMount(){
    require('./Footer.css');
  }

  componentDidMount(){
    if(this.props.language==='ar'){
      this.setState({
          firstSide:'rightSide',
          secondSide:'leftSide'
      });
    }
  }

  render() {

    return (
        <React.Fragment>

        <div className="footer">
          {!this.props.noItemsFooter?
            <div className="footerFirstSection">
              <div className="container">
                <div className={this.state.firstSide + ' menusSide'}>
                  <FooterMenus footerMenus={this.props.footerMenus} language={this.props.language}/>
                </div>
                <div className={this.state.secondSide + ' imagesSide'}>
                  <FooterImages footerImages={this.props.footerImages}/>
                </div>
              </div>
            </div>
            :
            null
          }
          <div className="footerSecondSection" style={{border:this.props.noItemsFooter?'none':''}}>
            <div className="container">
              <div className={this.state.secondSide}>
                <CountrySwitcher
                  country_code={this.props.country_code}
                  language={this.props.language}
                />
                <LanguageSwitcher
                  language={this.props.language}
                  languages={this.props.languages}
                  changeLanguage={this.props.changeLanguage}
                  />
                <SocialMedia socialMedia={this.props.socialMedia}/>
              </div>
              <div className={this.state.firstSide}>
                <RightsFooterMenu
                  rightsFooterMenu={this.props.rightsFooterMenu}
                  language={this.props.language}
                  />
              </div>
            </div>
          </div>
        </div>
        </React.Fragment>
    );
  }
}

export default Footer;
