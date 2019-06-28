import React, { Component } from 'react'
import axios from 'axios'
import moment from 'moment'
import { Container, Image, Icon, Header, Button, Sidebar, Segment } from 'semantic-ui-react'
import { connect } from 'react-redux'
import ImageEntryMessage from './ImageEntryMessage'

class EntryPopup extends Component {

  state = {
    caption: '',
    category: '',
    created_at: '',
    image: '',
    latitude: '',
    longitude: '',
    address: '',
    messageVisible: false,
    deleteMessage: false
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

  deletePost = () => {
    axios.delete(`/api/v1/posts/${this.props.id}`)
    this.handleMessageVisibility()
    this.props.closeModal()
  }

  handleDeleteMessage = () => {
    this.setState({ messageVisible: true, deleteMessage: true })
  }

  handleMessageVisibility = animation => () =>
  this.setState(prevState => ({ animation, messageVisible: !prevState.messageVisible }))

  render() {

    let userSignedIn = this.props.currentUser.isSignedIn
    let deleteButton

    if (userSignedIn === true && this.props.admin === true) {
      deleteButton = (
        <>
          <br></br>
          <Button
            id='delete-button'
            onClick={this.handleDeleteMessage}
          >
            Delete
          </Button>
          <br></br>
        </>
      )
    }

    let dateString = this.state.created_at
    let dateObj = new Date(dateString)
    let momentObj = moment(dateObj)
    let date = momentObj.format('DD-MM-YYYY')
    let time = momentObj.format('HH:mm')

    return (
      <>
        <Sidebar.Pushable as={Segment} textAlign='center' id='pushable-segment'>
          <Container className={`entry-wrapper-${this.props.datapointClass}`} id='entry-wrapper'>

            <ImageEntryMessage
              visible={this.state.messageVisible}
              handleMessageVisibility={this.handleMessageVisibility}
              deletePost={this.deletePost}
              deleteMessage={this.state.deleteMessage}
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
                {deleteButton}
              </Container>
            </Sidebar.Pusher>
          </Container>
        </Sidebar.Pushable>
      </>
    )
  }
}

const mapStateToProps = state => ({
  state: state,
  currentUser: state.reduxTokenAuth.currentUser,
  admin: state.reduxTokenAuth.currentUser.attributes.admin,
})

export default connect(mapStateToProps)(EntryPopup);
