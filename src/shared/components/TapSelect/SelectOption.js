import React, { Component } from 'react';

class SelectOption extends Component {

  decideLanguage(string1,string2){
  	if(string1.length > string2.length){
  		return string1;
  	}
  	else{
  		return string2;
  	}
  }

  render() {
    return (
      <option className="selectOption" value={this.props.item.country_code}>
      		{this.decideLanguage(this.props.item.country_name_arabic,this.props.item.country_name_english)} (+{this.props.item.international_code})
      </option>
    );
  }
}

export default SelectOption;
