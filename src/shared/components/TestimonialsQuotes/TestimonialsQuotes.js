import React, { Component } from 'react';
import {NavLink}  from 'react-router-dom';
import  TestimonialQuote from './TestimonialQuote.js';
import Title from '../../components/Title/Title.js';
import Separator from '../../components/Separator/Separator.js';


class TestimonialsQuotes extends Component {

  componentWillMount(){
    require('./testimonialsQuotes.css');
  }

  render() {
    return (
          <React.Fragment>
          {this.props.title?
          <React.Fragment>
          <Title
            title={this.props.title}
            separator={<Separator width='25%'/>}
          />
          <div style={{height:'20px'}}></div>
          </React.Fragment>
          :
          null
          }
          {this.props.testimonials.length>1?
          <div className="testimonialsQuotes">
          {this.props.testimonials.map((testimonialObj,key)=>{
            return (
              <TestimonialQuote
                key={key}
                testimonialNumber={this.props.testimonials.length}
                image={testimonialObj.testimonialImage}
                qoute={testimonialObj.qoute}
                name={testimonialObj.name}
                role={testimonialObj.role}
                businessName={testimonialObj.businessName}
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

export default TestimonialsQuotes;
