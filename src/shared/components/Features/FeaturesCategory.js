import React, { Component } from 'react';
import Feature from './Feature.js';
import Separator from '../../components/Separator/Separator.js';
import TapButton from '../../components/TapButton/TapButton.js';

class FeatureCategory extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hiddenFeatures: 'hiddenItem hide',
      showButton: 'shownItem'
    };
  }

  showFeatures(){
    
      this.setState({
        hiddenFeatures: 'shownItem'
      });

      this.setState({showButton: 'hiddenItem'});
      setTimeout(
          function() {
            this.setState({showButton: 'hiddenItem hide'});
          }
          .bind(this),
          500
      ); 
  }

  hideFeatures(middleFeatureId){

      this.setState({hiddenFeatures: 'hiddenItem'});
      setTimeout(
          function() {
            this.setState({hiddenFeatures: 'hiddenItem hide'});
          }
          .bind(this),
          500
      );

      this.setState({
        showButton: 'shownItem'
      });

      document.getElementById(middleFeatureId).scrollIntoView({ behavior: 'smooth' }); 
  }

  render() {
    let category = this.props.category;
    let middleFeatureId = category.categoryName.replace(/\s/g,'')+'middle';
    let features = category.items.filter(feature=>((feature.partner===this.props.partner) || feature.partner===undefined))
    return features.map((feature,key) =>
        <div 
            key={key}
            id={key===3?middleFeatureId:''}
            className={key>3? this.state.hiddenFeatures : ''}>
                <Feature
                  id={key}
                  feature={feature}
                  rightPartAnimation={this.props.rightPartAnimation}
                  leftPartAnimation={this.props.leftPartAnimation}
                />

                {/* WITH SHOW MORE BUTTON? */}
                {key===3 && features.length>4?
                  <div className={this.state.showButton}>
                    <div style={{height:'70px'}}></div>
                    <TapButton
                      text={category.showMoreButtonText}
                      shape='bordered colored'
                      product='general'
                      fontAwesomeIcon={<i className="fas fa-angle-down"></i>}
                      onClick={()=>this.showFeatures()}
                      className={this.state.showButton}
                      style={{width:'280px'}}
                      color='#585858'
                    />
                  </div>
                  :null
                }
                {/* WITH SHOW LESS BUTTON? */}
                {key===features.length-1 && features.length>4?
                  <div>
                    <div style={{height:'70px'}}></div>
                    <TapButton
                      text={category.showLessButtonText}
                      shape='bordered colored'
                      product='general'
                      fontAwesomeIcon={<i className="fas fa-angle-up"></i>}
                      onClick={()=>this.hideFeatures(middleFeatureId)}
                      style={{width:'280px'}}
                      color='#585858'
                    />
                  </div>
                  :<Separator width='90%'/>
                }
      </div>
    )
  }
}

export default FeatureCategory;
