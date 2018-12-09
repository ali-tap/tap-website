import React, { Component } from 'react';
import {NavLink}  from 'react-router-dom';
import ReactDOM from 'react-dom';
import Img from '../../components/Img/Img.js';
import root from 'window-or-global';

class TestimonialQuote extends Component {

	constructor(props) {
		super(props);
		this.state = {
			componentYPosition: 0,
			componentYHeight: 0,
			startAnimation: false,
			descriptionActive: '',
			animation:this.props.animationClass? this.props.animationClass:'shownTestimonialQuote',
		};
		this.handleScroll = this.handleScroll.bind(this);
	}
	getBodyScrollTop(){
	 const el = document.scrollingElement || document.documentElement;
	 return el.scrollTop ;
 }

	// come back here
	handleScroll(){
		if(this.getBodyScrollTop() + 500 > this.state.componentYPosition){
			this.setState({
				startAnimation:true
			})
		}
	}

	componentDidMount(){
		 root.addEventListener("scroll", this.handleScroll);
		 this.setState({
			componentYPosition: ReactDOM.findDOMNode(this).getBoundingClientRect().top,
		});
	}

	componentWillUnmount(){
    root.removeEventListener("scroll", this.handleScroll);
  }

	render() {
		// console.log( this.props.testimonialNumber );
		let bigSpace = '30px';
		let smallSpace = '10px';
		return (
						<div
							className={this.state.startAnimation ? this.state.animation+' TestimonialQuote' : 'hiddenTestimonialQuote TestimonialQuote'}
							style={{width: (100*1/this.props.testimonialNumber).toString()+'%'}}>
							<Img className={this.state.startAnimation?'circleImage circleImageNormalSize':'circleImage circleImageSmallSize'} src={this.props.image}/>
							 <div style = {{height:bigSpace}}></div>
								<h3 className='quotationsMarks'><i className={this.props.language==='ar'?"fas fa-quote-right":"fas fa-quote-left"}></i>{' '+this.props.qoute+' '}<i className={this.props.language==='ar'?"fas fa-quote-left":"fas fa-quote-right"}></i></h3>
								 <div style = {{height:bigSpace}}></div>
									<h5 className='quoterName'>{this.props.name}</h5>
									<h5 className='quoterRole'>{this.props.role}</h5>
								 <div style = {{height:smallSpace}}></div>
								<h5 className='quoterBusName'>{this.props.businessName}</h5>
						</div>
		);
	}
}

export default TestimonialQuote;
