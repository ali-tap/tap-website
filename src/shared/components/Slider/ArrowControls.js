import React, { Component } from 'react';


class ArrowControls extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };

  }

  render() {
    return (
      <div className={"sliderControls "+this.props.hideControls}>
            <div
              className={this.props.languageSlideDirection==='right'?'sliderControl goBack':'sliderControl goNext'}
              onClick={this.props.goBack}>
              <i
                className={this.props.languageSlideDirection==='right'?'fas fa-chevron-left':'fas fa-chevron-right'}>
              </i>
            </div>
            <div
              className={this.props.languageSlideDirection==='right'?'sliderControl goNext':'sliderControl goBack'}
              onClick={this.props.goNext}>
              <i
                className={this.props.languageSlideDirection==='right'?'fas fa-chevron-right':'fas fa-chevron-left'}>
              </i>
            </div>
      </div>
    );
  }
}

export default ArrowControls;
