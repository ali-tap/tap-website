import React, { Component } from 'react';
import pages from '../../dataSource/pages.json';

class IframePage extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount(){
    require('./iframePage.css');
  }

  componentDidMount() {
  }

  componentWillUnmount() {

  }

  render() {
    let iframeSrc = pages.filter(page=>page.slot===this.props.page)[0].iframeSrc;
    return (
      <iframe className='iframePage' src={iframeSrc}>
      </iframe>
    );
  }
}

export default IframePage;
