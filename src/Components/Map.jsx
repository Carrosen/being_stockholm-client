import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import MapStyle from '../Modules/MapStyle'
import { Icon } from 'semantic-ui-react';
import axios from 'axios'
import { connect } from 'react-redux'

class Map extends Component {
  static defaultProps = {
    center: {
      lat: 59.330651,
      lng: 18.068562
    },
    zoom: 11
  };

  state = {
    posts: []
  }

  componentDidMount() {
    axios.get('/api/v1/posts').then(response => {
      console.log(response)
      this.setState({ posts: response.data });
    });
  }

  render() {
    const hide = this.props.sidebarVisible? (
    this.props.dispatch({ type: 'HIDE_SIDEBAR'})
    ) : (
    null)  

    return (
      <div id='map' onClick={hide} >
    
        <Icon
          id='map-icon-plus'
          name='plus'
          size='huge'
          color='orange' />

        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_API_KEY_GOOGLE_MAPS }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          options={{ styles: MapStyle }}>

          {this.state.posts.map(post => (
            <Icon name='circle'
              lat={post.latitude}
              lng={post.longitude}
              id={`post_${post.id}`}
              color={(post.category === 'work') ? 'teal' : 'yellow'} />
          ))}

        </GoogleMapReact>
      </div>
    );
  }
}

export default connect()(Map);
