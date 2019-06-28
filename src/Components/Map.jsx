import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import GoogleMapReact from 'google-map-react'
import MapStyle from '../Modules/MapStyle'
import { Icon } from 'semantic-ui-react'
import Popup from 'reactjs-popup'
import CreateImageEntry from './CreateImageEntry'
import EntryPopup from './EntryPopup'
import axios from 'axios'
import { connect } from 'react-redux'
import Legend from './Legend'

class Map extends Component {
  static defaultProps = {
    center: {
      lat: 59.330651,
      lng: 18.068562
    },
    zoom: 11
  };

  state = {
    openEntryPopup: false,
    posts: [],
    id: '',
    published: [],
    datapointClass: ''
  }

  closeModal = () => {
    this.setState({ openEntryPopup: false })
  }

  componentDidMount() {
    this.axiosGetPublishedPosts()
  }

  hideSidebar = () => {
    this.axiosGetPublishedPosts()
  }

  async axiosGetPublishedPosts() {
    let response = await axios.get('/api/v1/posts')
    this.setState({ posts: response.data })
    let published = []
    this.state.posts.forEach(post => {
      if (post.status === 'published') {
        published.push(post)
      }
    })
    this.setState({ published: published })
  }

  handleDatapointClick = (e) => {
    const datapointClass = e.target.className.substr(18)
    const id = e.target.id
    this.setState({ id: id, datapointClass: datapointClass, openEntryPopup: true })
    if (this.props.legendVisible) {
      this.props.dispatch({ type: 'CHANGE_LEGEND_VISIBILITY' })
    }
    if (this.props.sidebarVisible) {
      this.props.dispatch({ type: 'CHANGE_SIDEBAR_VISIBILITY' })
    }
  }

  setDatapointColor = (post) => {
    let userSignedIn = this.props.currentUser.isSignedIn;
    let userSession = this.props.currentUser.attributes.uid;
    let category = post.category;
    let userLevel = post.user.level;

    if (userSignedIn === true && post.user.uid === userSession) {
      switch (category) {
        case 'work':
          return 'datapoint-my-work'
        case 'play':
          return 'datapoint-my-play'
      }
    } else {
      switch (category) {
        case 'work':
          switch (userLevel) {
            case 'newbie':
              return 'datapoint-work-newbie'
            case 'settled':
              return 'datapoint-work-settled'
          }
          break;
        case 'play':
          switch (userLevel) {
            case 'newbie':
              return 'datapoint-play-newbie'
            case 'settled':
              return 'datapoint-play-settled'
          }
          break;
      }
    }
  }

  hideElements = () => {
    if (this.props.sidebarVisible) {
      this.props.dispatch({ type: 'CHANGE_SIDEBAR_VISIBILITY' })
      this.axiosGetPublishedPosts()
    } else if (this.props.legendVisible) {
      this.props.dispatch({ type: 'CHANGE_LEGEND_VISIBILITY' })
      this.axiosGetPublishedPosts()
    }
  }

  render() {

    let createEntry
    let userSignedIn = this.props.currentUser.isSignedIn

    if (userSignedIn === true) {
      createEntry = (
        <CreateImageEntry />
      )
    } else {
      createEntry = (
        <Redirect to='/log-in' />
      )
    }

    return (

      <div id='map'>

        <Popup modal trigger={
          <Icon
            className='map-icons'
            name='plus'
            size='huge'
            color='orange'
            id='map-icon-plus'
          />
        }
          position="top center"
          closeOnDocumentClick={true}
        >
          {createEntry}
        </Popup>

        <Popup
          open={this.state.openEntryPopup}
          closeOnDocumentClick={true}
          onClose={this.closeModal}
          onClick={this.hideElements}>

          <div className="modal">
            <EntryPopup
              id={this.state.id}
              datapointClass={this.state.datapointClass}
            />
          </div>
        </Popup>

        <Popup modal open={this.props.renderCreate} position="right center">
          <CreateImageEntry />
        </Popup>

        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_API_KEY_GOOGLE_MAPS }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          options={{ styles: MapStyle }}
          onClick={this.hideElements}
        >

          {this.state.published.map(post => (
            <Icon name='circle'
              size='large'
              lat={parseFloat(post.latitude)}
              lng={parseFloat(post.longitude)}
              key={post.id}
              id={post.id}
              onClick={this.handleDatapointClick}
              className={this.setDatapointColor(post)} />
          ))}

        </GoogleMapReact>
        <Legend />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  state: state,
  currentUser: state.reduxTokenAuth.currentUser,
  sidebarVisible: state.animation.sidebarVisible,
  legendVisible: state.animation.legendVisible,
  renderCreate: state.animation.renderCreate
})

export default connect(mapStateToProps)(Map);
