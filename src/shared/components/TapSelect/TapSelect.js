import React, { Component } from 'react';
import SelectOption from './SelectOption.js';
import {observer} from 'mobx-react';

class TapSelect extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value
    };
  }

  componentWillMount(){
    require('./TapSelect.css');
  }

  listItemsComponentsComposer(items){
    return items.map((item,key) => <SelectOption key={key} item={item} store={this.props.store}/>);
  }

  changeCountry(e){
    this.props.store.selectCountry(e.target.value);
  }

  changeValue(e){
    this.setState({
      value: e.target.value
    });
    this.props.onChange?this.props.onChange():null;
    this.props.customOnChangeFun?this.props.customOnChangeFun(this.props.fieldKey,e):null;
  }

  render() {
    return (
      <React.Fragment>
      {this.props.type && this.props.type==='customSelect'?
        <select className={this.props.withArrow?'selectWithArrow'+' '+'tapSelect':'tapSelect'}
                value={this.state.value}
                style={this.props.style}
                onChange={this.changeValue.bind(this)}>
                <option value={this.props.value}>
                {this.props.value}
                </option>
                {this.props.options.map((option,key)=>{
                  return(
                    <option value={option.optionValue} key={key}>
                    {option.optionValue}
                    </option>
                  )
                })}
        </select>
        :
        <select className={this.props.className}
                value={this.props.store.currentCountry.country_code}
                style={{backgroundImage:'url('+this.props.store.currentCountry.country_flag_url+')'}}
                onChange={(e)=>this.changeCountry(e)}>
                    {this.listItemsComponentsComposer(this.props.store.countries)}
        </select>
      }
      </React.Fragment>

    );
  }
}

export default observer(TapSelect);
