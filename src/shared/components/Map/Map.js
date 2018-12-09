
import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

export default class Map extends Component {

render() {

    return (
      <div className='google-map' style={{height:this.props.height?this.props.height:'500px',position: 'relative'}}>
        {this.props.children}
        <GoogleMapReact
          defaultCenter={ { lat: this.props.lat, lng: this.props.lng } }
          defaultZoom={ this.props.zoom }>
        </GoogleMapReact>
      </div>
    )
  }
}
