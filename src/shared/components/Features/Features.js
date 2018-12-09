
import React, { Component } from 'react';
import Separator from '../../components/Separator/Separator.js';
import Title from '../../components/Title/Title.js';
import FeaturesCategory from './FeaturesCategory.js';
import CategoriesTitles from './CategoriesTitles.js'
class Features extends Component {

  categoriesComponentsComposer(features,rightPartAnimation,leftPartAnimation){
    return features.categories.map((category,key) =>
      {
      if( (category.partners && category.partners.filter(partner=>partner===this.props.partner)[0]) || category.partners=== undefined){
       return (
         <div key={key} id={category.categoryName.replace(/\s/g,'')}>
          <div className={key===0?'hidden-xs':'visible-xs'} style={{height:'60px'}}></div>
          <div className='hidden-xs' style={{height:'150px'}}></div>
          <Title
            title={category.categoryName}
            separator={<Separator width="25%"/>}
          />
          <FeaturesCategory
            category={category}
            rightPartAnimation={rightPartAnimation}
            leftPartAnimation={leftPartAnimation}
            partner={this.props.partner}
          />
         </div>
       )
      }
      else{
        return (<React.Fragment key={key}></React.Fragment>)
      }
      }
    );
  }

  componentWillMount(){
    require('./Features.css');
  }

  render() {
    return (
      <div className="features">
        <div className="container">
          <CategoriesTitles
            categories={this.props.features.categories}
            partner={this.props.partner}
          />
          {this.categoriesComponentsComposer(this.props.features,this.props.rightPartAnimation,this.props.leftPartAnimation)}
        </div>
      </div>
    );
  }
}

export default Features;
