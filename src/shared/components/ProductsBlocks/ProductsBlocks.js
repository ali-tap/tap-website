import React, { Component } from 'react';
import  ProductBlock from './ProductBlock.js';

class ProductsBlocks extends Component {

  componentWillMount(){
    require('./productsBlocks.css');
  }

  render() {
    return (
          <React.Fragment>
          {this.props.productsObjects.length>1?
          <div className="productsBlocks">
          {this.props.productsObjects.map((productObj,key)=>{
            return (
              <ProductBlock
                key={key}
                blocksNumber={this.props.productsObjects.length}
                title={productObj.block.title}
                subtitle={productObj.block.subtitle}
                image={productObj.block.image}
                hoverImage={productObj.block.hoverImage}
                hoverColor={productObj.brandingColor}
                link={'/'+productObj.slot+'/'+(this.props.partner?this.props.partner:'')}
                language={this.props.language}
              />
              )
          })}
          </div>
          :
          null
          }
      </React.Fragment>
    );
  }
}

export default ProductsBlocks;
