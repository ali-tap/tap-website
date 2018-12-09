import React, { Component } from 'react';

class Counter extends Component {

  constructor(props) {
    super(props);
    this.state = { seconds: 0 };
  }

  tick() {
    let increase = Math.floor( this.props.countTo/1000 );
    increase===0?increase=1:increase=increase;
    if(this.state.seconds<this.props.countTo){
      this.setState(prevState => ({
        seconds: prevState.seconds + increase
      }));
    }
    else{
      this.setState(prevState => ({
        seconds: this.props.finalText
      }));
    }
  }

  componentDidMount() {
    let interval = 1/this.props.countTo;
    this.props.countTo<100?interval=300:interval=interval;
    this.interval = setInterval(() => this.tick(), interval);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <h5>
        {this.state.seconds}
      </h5>
    );
  }
}

export default Counter;
