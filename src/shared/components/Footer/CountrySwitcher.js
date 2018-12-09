import React, { Component } from 'react';
import Img from '../../components/Img/Img.js';

class CountrySwitcher extends Component {

  constructor(props) {
    super(props);
    this.state = {
      countries: [],
      marginTop: {},
      openMenu: false
    };
    this.retriveCountries = this.retriveCountries.bind(this);
    this.close = this.close.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.close, false);
    this.retriveCountries(this.props.language);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.close, false);
  }

  retriveCountries(language){
    fetch('https://partners.payments.tap.company/api/v1.3/api/Country/GetCountries?language_code='+language)
      .then(results => {
        return results.json();
      })
        .then(data => {
            this.setState({
              'countries':data
            });
        });
  }

  open(){
      this.setState({openMenu:true});
  }

  close(e){
    if(e.target.id!=='openMenuDiv'){
      this.setState({openMenu:false});
    }
  }

  countrySwitcherComposer(current_country_code,countries){
        if(countries.length!==0){
          let currentCountry = countries.filter(country => country.country_code.toLowerCase()===current_country_code.toLowerCase());
          return (
            <div className="choice">
                <div className={this.state.openMenu?'countryList openList':'countryList closeList'} >
                    {countries.map((country,key) => country!==currentCountry[0]?
                      <div className="countryListItems" key={key}><span><Img className="countryFlag" src={country.country_flag_url}/><div className='flagSpace'></div></span><a className="footerLink choice" href={'/'+country.country_code.toLowerCase()+'/'+this.props.language}>{country.country_name_english}</a></div>
                      :null)}
                </div>
                <span id="openMenuDiv" onClick={()=>this.open()}><span><Img className="countryFlag" src={currentCountry[0].country_flag_url}/><div className='flagSpace'></div></span>{currentCountry[0].country_name_english}</span>
            </div>
            )
        }
  }

  render() {

    return (
        <div className="countrySwitcher">
          {this.countrySwitcherComposer(this.props.country_code,this.state.countries)}
        </div>
    );
  }
}

export default CountrySwitcher;
