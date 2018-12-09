import React, { Component } from 'react';
import Separator from '../../components/Separator/Separator.js';
import Title from '../../components/Title/Title.js';

class CategoriesTitles extends Component {

  goToCategory(id,e){
      document.getElementById(id).scrollIntoView({ behavior: 'smooth', block: "start" });
  }

  componentsComposer(){
    return this.props.categories.map((category,key) =>
      {
      if( (category.partners && category.partners.filter(partner=>partner===this.props.partner)[0]) || category.partners=== undefined){
       return (
         <div key={key}
                    style={{width: (100*1/this.props.categories.length).toString()+'%',display:'inline-block',cursor:'pointer'}}
                    onClick={(e)=>this.goToCategory(category.categoryName.replace(/\s/g,''),e)}>
                    <Title
                      title={category.categoryName}
                    />
        </div>
       )
      }
      else{
        return(
          <React.Fragment key={key}></React.Fragment>
        )
      }
      }
    );
  }

  render() {
    return (
      <div className="categoriesTitles">
        {
          this.props.categories.length>1?
          <React.Fragment>
            {this.componentsComposer()}
            <Separator width="90%"/>
          </React.Fragment>
          :
          null
        }
      </div>
    );
  }
}

export default CategoriesTitles;
