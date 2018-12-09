import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import root from 'window-or-global';

class ParallaxScroll extends Component {

  constructor(props) {
    super(props);
    this.state = {
        componentYPosition:0,
        componentYHeight:0,
        increase: false,
        oldScrollTop: 0,
        top:100
    },
    this.handleScroll = this.handleScroll.bind(this);
}

componentWillMount(){
  require('./parallaxScroll.css');
}

handleScroll(){
  let newScrollTop = (document.scrollingElement || document.documentElement).scrollTop;
  setTimeout(
      function() {
          this.setState({oldScrollTop: (document.scrollingElement || document.documentElement).scrollTop});
      }
      .bind(this),
      100
  );


  if(newScrollTop+100 > this.state.componentYPosition && newScrollTop <this.state.componentYPosition+this.state.componentYHeight){
    if(this.state.oldScrollTop<newScrollTop){
      this.setState({top: this.state.top-0.7});
    }
    else{
      this.setState({top: this.state.top+0.7});
    }
  }
}

componentDidMount(){
   root.addEventListener("scroll", this.handleScroll);
   this.setState({
    componentYPosition: ReactDOM.findDOMNode(this).getBoundingClientRect().top,
    componentYHeight: ReactDOM.findDOMNode(this).getBoundingClientRect().height,
  });
}

componentWillUnmount(){
  root.removeEventListener("scroll", this.handleScroll);
}

  render() {
    return (
      <div className='parallaxScroll' style={{height:this.props.height}}>
        <div className='parallaxScrollBackground' style={{backgroundImage:'url('+this.props.backgroundImage+')',top:-(this.state.top)}}>
        </div>
        {this.props.children?
          <div className='parallaxScrollContentBox'>
            <div className={this.props.withContentBackground?'parallaxScrollContent withContentBackground':'parallaxScrollContent'}>
              {this.props.children}
            </div>
          </div>
          :
          null
        }
      </div>
    );
  }
}

export default (ParallaxScroll);
