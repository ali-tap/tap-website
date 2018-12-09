
import React, { Component } from 'react';
import Slider from 'react-slick';
import Title from '../../components/Title/Title.js';
import Separator from '../../components/Separator/Separator.js';
import Img from '../../components/Img/Img.js';

class TapCarouselSlider extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentWillMount(){
    require('./tapCarouselSlider.css');
  }

  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: false,
      autoplay: true,
      autoplaySpeed: 4000,
      // rtl: this.props.language==='ar'?true:false
    };
    let ItemsInSlide = this.props.ItemsInSlide || 4;
    let arr = [];
    let subArr = [];

    {this.props.businesses.map((businesse,key)=>
      {
        key%ItemsInSlide===0?
        subArr=[]
        :
        null;
        subArr.push(businesse);
        key%ItemsInSlide===0?
        arr.push(subArr)
        :
        null;
      }
    )}

    return (
      <div>
        {this.props.title?
          <Title
            title={this.props.title}
            separator={<Separator width="25%"/>}
          />
          :
          null
        }
        <Slider {...settings}>
        {arr.map((arrayObj,key)=>
          {
          return(
            <div key={key}>
              {arrayObj.map((businesse,key)=>{
                return(
                  <a href={businesse.businesseLink} target='_blank' key={key}>
                    <Img className='TapCarouselSliderItem' src={businesse.businesseLogo} style={{width:(1/ItemsInSlide*100)+'%'}}/>
                  </a>
                )
              })
            }
            </div>
          )
          })
        }
        </Slider>
      </div>
    );
  }
}

export default TapCarouselSlider;
