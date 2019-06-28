import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'
import MapStyle from '../Modules/MapStyle'
import { Icon, Container } from 'semantic-ui-react'
import Popup from 'reactjs-popup'
import axios from 'axios'
import { connect } from 'react-redux'
import AdminPopup from './AdminPopup'

class AdminPage extends Component {
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
    unpublished: [],
    datapointClass: ''
  }

  closeModal = () => {
    this.setState({ openEntryPopup: false })
  }

  componentDidMount() {
    this.axiosGetUnpublished()
  }

  combineFunctions = () => {
    this.props.dispatch({ type: 'CHANGE_SIDEBAR_VISIBILITY' })
    this.axiosGetUnpublished()
  }

  async axiosGetUnpublished() {
    let response = await axios.get('/api/v1/posts')
    this.setState({ posts: response.data })
    let unpublished = []
    this.state.posts.forEach(post => {
      if (post.status === 'pending') {
        unpublished.push(post)
      }
    })
    this.setState({ unpublished: unpublished })
  }

  handleDatapointClick = (e) => {
    const datapointClass = e.target.className.substr(18)
    const id = e.target.id
    this.setState({ id: id, datapointClass: datapointClass, openEntryPopup: true })
  }

  setDatapointColor = (post) => {
    if (post.category === 'work' && post.user.level === 'settled') {
      return 'datapoint-work-settled'
    } else if (post.category === 'work' && post.user.level === 'newbie') {
      return 'datapoint-work-newbie'
    } else if (post.category === 'play' && post.user.level === 'settled') {
      return 'datapoint-play-settled'
    } else if (post.category === 'play' && post.user.level === 'newbie') {
      return 'datapoint-play-newbie'
    }
  }

  render() {
    let userSignedIn = this.props.currentUser.isSignedIn
    let adminView

    if (userSignedIn === true && this.props.admin === true) {
      adminView = (
        <>
          <div id='map'
            onClick={this.props.sidebarVisible ? () => { this.combineFunctions() } : () => { this.axiosGetUnpublished() }}
          >

            <Icon
              className='map-icons'
              name='font'
              size='huge'
              color='orange'
              id='map-icon-admin'
            />

            <Popup
              open={this.state.openEntryPopup}
              closeOnDocumentClick={true}
              onClose={this.closeModal}>

              <div className="modal">
                <AdminPopup
                  id={this.state.id}
                  datapointClass={this.state.datapointClass}
                />
              </div>
            </Popup>

            <GoogleMapReact
              bootstrapURLKeys={{ key: process.env.REACT_APP_API_KEY_GOOGLE_MAPS }}
              defaultCenter={this.props.center}
              defaultZoom={this.props.zoom}
              options={{ styles: MapStyle }}>

              {this.state.unpublished.map(post => (

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
          </div>
        </>
      )
    } else {
      adminView = (
        <>
          <Container
            className='views-main-container'
            textAlign='center'>
            <Icon
              name='stop circle'
              size='massive'
              color='red' />
            <h1> You cannot access this page! </h1>
          </Container>
        </>
      )
    }

    return (
      <>
        {adminView}
      </>
    )
  }
}

const mapStateToProps = state => ({
  state: state,
  currentUser: state.reduxTokenAuth.currentUser,
  admin: state.reduxTokenAuth.currentUser.attributes.admin,
  sidebarVisible: state.animation.sidebarVisible
})

export default connect(mapStateToProps)(AdminPage)
