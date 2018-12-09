import React, { Component } from 'react';
import Img from '../../components/Img/Img.js';

class Feature extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount(){
    require('./feature.css');
  }

  componentDidMount() {
  }

  componentWillUnmount() {

  }

  render() {
    return (
      <div className='tapFeatureParagraphWithIcon'>
        <div className='tapFeatureIconDiv'>
            <Img className='tapFeatureIcon' src={this.props.icon}/>
            <h6 className='tapFeatureTitle'>
            {this.props.title}
            </h6>
        </div>
        <div className='tapFeatureParagraph'>
          <a href={this.props.link} style={{color:'#000'}} className='tapFeatureSubtitleLink'>
          <b><h5>{this.props.subtitle}</h5></b>
          </a>
          <h6>
          {this.props.description+' '}
          <span>
          <a href={this.props.link} className='tapFeatureLink'>
          {this.props.readMoreText+' '}
          <i className={this.props.language==='ar'?'fas fa-angle-left':'fas fa-angle-right'}></i>
          </a>
          </span>
          </h6>
        </div>
      </div>
    );
  }
}

export default Feature;
