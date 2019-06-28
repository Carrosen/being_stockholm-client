import React, { Component } from 'react'
import { Form, Button, Icon, Segment, Container, Sidebar, Grid } from 'semantic-ui-react'
import axios from 'axios'
import ImageUploader from 'react-images-upload'
import ImageEntryMessage from './ImageEntryMessage'
import ExifReader from 'exifreader'
import fileToArrayBuffer from 'file-to-array-buffer'
import Geocode from 'react-geocode'
import { connect } from 'react-redux'

class CreateImageEntry extends Component {
  state = {
    caption: '',
    image: '',
    longitude: '',
    latitude: '',
    category: 'play',
    successMessage: false,
    errorMessage: false,
    errors: '',
    activeItem: 'play',
    button: 'show-button',
    messageVisible: false,
    address: '',
    userInputAddress: '',
    addressSearch: false
  }

  onChangeHandler = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  geolocationDataAddress = () => {
    Geocode.setApiKey(process.env.REACT_APP_API_KEY_GOOGLE_MAPS)
    Geocode.fromAddress(this.state.userInputAddress).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        this.setState({
          latitude: lat,
          longitude: lng

        })
        this.geolocationDataCoords()
      },
      error => {
        this.setState({ messageVisible: true, errorMessage: true, errors: [error] })
      }
    )
  }

  geolocationDataCoords = () => {
    Geocode.setApiKey(process.env.REACT_APP_API_KEY_GOOGLE_MAPS)
    Geocode.fromLatLng(this.state.latitude, this.state.longitude).then(
      response => {
        const addressGeocode = response.results[0].formatted_address
        this.setState({
          address: addressGeocode,
          addressSearch: false
        })
      },
      error => {
        this.setState({ messageVisible: true, errorMessage: true, errors: [error] })
      }
    )
  }

  onImageDropHandler = (pictureFiles, pictureDataURLs) => {
    if (pictureFiles.length > 0) {
      this.setState({
        button: 'hide-button'
      })
      if (pictureFiles[0].type === 'image/jpeg') {
        let image = pictureFiles[0]
        fileToArrayBuffer(image).then((data) => {
          try {
            var tags = ExifReader.load(data)
          }
          catch (error) {
            this.setState({ messageVisible: true, errorMessage: true, errors: ['This is an invalid image format'] })
          }
          if (tags === undefined || tags.GPSLatitude === undefined) {
            this.setState({
              image: pictureDataURLs,
              address: 'No location data detected'
            })
          } else {
            this.setState({
              image: pictureDataURLs,
              longitude: tags.GPSLongitude.description,
              latitude: tags.GPSLatitude.description
            })
            this.geolocationDataCoords()
          }
        })
      } else if (pictureFiles[0].type === 'image/gif' || pictureFiles[0].type === 'image/png') {
        this.setState({
          image: pictureDataURLs,
          address: 'No location data detected'
        })
      }
    } else {
      this.setState({
        button: 'show-button',
        address: '',
        image: '',
        latitude: '',
        longitude: ''
      })
    }
  }

  uploadPost = (e) => {
    e.preventDefault();
    const path = '/api/v1/posts'
    const payload = {
      image: this.state.image,
      caption: this.state.caption,
      category: this.state.category,
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      address: this.state.address,
      user_id: this.props.currentUser.attributes.id
    }
    axios.post(path, payload)
      .then( () => {
        this.setState({
          successMessage: true,
          errorMessage: false,
          messageVisible: true,
        })
      })
      .catch(error => {
        this.setState({
          errorMessage: true,
          messageVisible: true,
          errors: error.response.data.error
        })
      })
  }

  handleChangeCategory = (e) => {
    this.setState({ category: e.target.value, activeItem: e.target.value })
  }

  handleMessageVisibility = animation => () =>
    this.setState(prevState => ({ animation, messageVisible: !prevState.messageVisible })
    )

  render() {
    const { activeItem } = this.state

    let addressSearch
    if (this.state.image.length > 0) {
      if (this.state.addressSearch === true) {
        addressSearch = (
          <>
            <Grid id='user-input-address-grid'>
              <Grid.Row id='user-input-address-row' columns={2}>
                <Grid.Column id='user-input-address-column' width={13}>
                  <Form size="mini" type='medium'>
                    <Form.Input
                      required
                      id="userInputAddress"
                      value={this.state.userInputAddress}
                      onChange={this.onChangeHandler}
                      placeholder="Write your address"
                    />
                  </Form>

                </Grid.Column>

                <Grid.Column id='adress-icon-column' width={3}>
                  <Icon
                    circular
                    name='search'
                    onClick={this.geolocationDataAddress.bind(this)}
                  />
                </Grid.Column>
              </Grid.Row>

            </Grid>
          </>
        )
      } else if (this.state.address === "No location data detected") {
        addressSearch = (
          <div className="change-address-link">
            <p className='address-change' onClick={() => { this.setState({ addressSearch: true }) }}>
              Enter address manually
            </p>
          </div>
        )
      }
      else {
        addressSearch = (
          <div className="change-address-link">
            <p className='address-change' onClick={() => { this.setState({ addressSearch: true }) }}>
              Change location
            </p>
          </div>
        )
      }
    }

    return (
      <>
        <Sidebar.Pushable as={Segment} textAlign='center'
          className={this.state.activeItem}>

          <ImageEntryMessage
            visible={this.state.messageVisible}
            successMessage={this.state.successMessage}
            errorMessage={this.state.errorMessage}
            image={this.state.image}
            handleMessageVisibility={this.handleMessageVisibility}
            errors={this.state.errors}
          />

          <Sidebar.Pusher dimmed={this.state.messageVisible}>
            <Container id="upload-post-wrapper">
              <ImageUploader
                buttonText={
                  <div>
                    <p id="add-photo-headline">1. Add a photo!</p>
                    <Icon id="add-photo-icon" name="image outline" size="huge"></Icon>
                    <p id="add-photo-label">Maximum image file size: 5 MB</p>
                  </div>
                }
                buttonClassName={this.state.button}
                withLabel={false}
                withIcon={false}
                withPreview={true}
                singleImage={true}
                onChange={this.onImageDropHandler}
                imgExtension={['.jpg', '.png', '.gif', '.jpeg']}
                maxFileSize={5242880}
                errorClass={(this.state.image.length > 0) ? 'image-upload-error-hidden' : 'image-upload-error-visible'}
              />
              <Form size="mini" type='medium'>
                <Form.Input
                  required
                  id="caption"
                  className="image-upload-caption"
                  value={this.state.caption}
                  onChange={this.onChangeHandler}
                  placeholder="2. Add a caption in any language!"
                />

              </Form>
              <p id="location">
                <Icon
                  name='map marker alternate' />
                {this.state.address}</p>

              <Container>
                {addressSearch}
              </Container>
              
              <p id="image-upload-button-headline">3. I am at:</p>
              
              <Button.Group
                basic
              >
                <Button
                  id='work'
                  active={activeItem === 'work'}
                  value='work'
                  onClick={this.handleChangeCategory}>
                  WORK
                </Button>

                <Button
                  id='play'
                  active={activeItem === 'play'}
                  value='play'
                  onClick={this.handleChangeCategory}>
                  PLAY
                </Button>
              </Button.Group>
              <br></br>
              <Button id="upload-button" onClick={this.uploadPost}>MAP IT!</Button>
            </Container>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.reduxTokenAuth.currentUser
  }
}

export default connect(mapStateToProps)(CreateImageEntry)
