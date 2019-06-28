import React, { Component } from 'react'
import axios from 'axios'
import moment from 'moment'
import { Container, Image, Icon, Header, Button, Sidebar, Segment } from 'semantic-ui-react'
import ImageEntryMessage from './ImageEntryMessage'

class AdminPopup extends Component {

  state = {
    caption: '',
    category: '',
    created_at: '',
    image: '',
    latitude: '',
    longitude: '',
    address: '',
    successMessage: false,
    errorMessage: false,
    messageVisible: false,
    errors: '',
    adminMessage: ''
  }

  async componentDidMount() {
    let response = await axios.get(`/api/v1/posts/${this.props.id}`)
    this.setState({
      caption: response.data.caption,
      category: response.data.category,
      created_at: response.data.created_at,
      image: response.data.image,
      latitude: response.data.latitude,
      longitude: response.data.longitude,
      address: response.data.address
    })
  }

  acceptButton = () => {
    const path = `/api/v1/posts/${this.props.id}`
    const payload = {
      status: 'published'
    }
    axios.patch(path, payload)
      .then(() => {
        this.setState({
          successMessage: true,
          errorMessage: false,
          messageVisible: true,
          adminMessage: true
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

  declineButton = () => {
    const path = `/api/v1/posts/${this.props.id}`
    const payload = {
      status: 'declined'
    }
    axios.patch(path, payload)
      .then(() => {
        this.setState({
          successMessage: true,
          errorMessage: false,
          messageVisible: true,
          adminMessage: false
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

  handleMessageVisibility = animation => () =>
    this.setState(prevState => ({ animation, messageVisible: !prevState.messageVisible }))

  render() {

    let dateString = this.state.created_at
    let dateObj = new Date(dateString)
    let momentObj = moment(dateObj)
    let date = momentObj.format('DD-MM-YYYY')
    let time = momentObj.format('HH:mm')

    return (
      <>
        <Sidebar.Pushable as={Segment} textAlign='center' id='pushable-segment'>
          <Container id='entry-wrapper' className={`entry-wrapper-${this.props.datapointClass}`}>

            <ImageEntryMessage
              visible={this.state.messageVisible}
              successMessage={this.state.successMessage}
              errorMessage={this.state.errorMessage}
              handleMessageVisibility={this.handleMessageVisibility}
              errors={this.state.errors}
              adminMessage={this.state.adminMessage}
            />

            <Sidebar.Pusher dimmed={this.state.messageVisible}>
              <Container id='entry-image-wrapper'>
                <Image
                  fluid
                  rounded
                  centered
                  verticalAlign='top'
                  size='medium'
                  id={`image_${this.props.id}`}
                  alt='entry image'
                  src={this.state.image} />
              </Container>

              <Header id="entry-caption">
                {this.state.caption}
              </Header>

              <Container id='entry-location'>
                <Icon
                  name='map marker alternate'
                />
                {this.state.address}
              </Container>

              <Container id='date-container'>
                <p><i> {date} | {time} </i></p>
              </Container>

              <Container>
                <Button
                  id='accept-button'
                  color='green'
                  onClick={this.acceptButton.bind(this)}
                >
                  Accept
                </Button>

                <Button
                  id='decline-button'
                  color='red'
                  onClick={this.declineButton.bind(this)}
                >
                  Decline
                </Button>
                <br></br>

              </Container>
            </Sidebar.Pusher>
          </Container>
        </Sidebar.Pushable>
      </>
    )
  }
}

export default AdminPopup
