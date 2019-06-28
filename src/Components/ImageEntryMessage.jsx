import React, { Component } from 'react'
import { Segment, Sidebar, Button } from 'semantic-ui-react'

class ImageEntryMessage extends Component {

  render() {
    let closeButton
    let message

    if (this.props.successMessage === false) {
      closeButton = (
        <Button
          id='close-topsidebar-error'
          onClick={this.props.handleMessageVisibility('overlay')}
        >
          Try again
        </Button>
      )
    } else if (this.props.adminMessage === true) {
      message = (
        <>
          <h5>You have accepted this post!</h5>
          <p>Click on map to continue</p>
        </>
      )
    } else if (this.props.adminMessage === false) {
      message = (
        <>
          <h5>You have declined this post!</h5>
          <p>Click on map to continue</p>
        </>
      )
    } else {
      message = (
        <>
          <h5>Thank you!</h5>
          <p>Once we have reviewed your photo, it will be live on the map to inspire other Stockholmers to try out!</p>
        </>
      )
    }

    if (this.props.errorMessage === true && this.props.image.length === 0) {
      message = (
        <>
          <h5>Ooops!</h5>
          <ul id="message-error-list">
            {this.props.errors.map(error => (
              <li key={error}>{error}</li>
            ))}
            <li>You need to upload an image</li>
          </ul>
        </>
      )
    }
    if (this.props.errorMessage === true && this.props.image.length !== 0) {
      message = (
        <>
          <h5>Your post could not be created since:</h5>
          <ul id="message-error-list">
            {this.props.errors.map(error => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </>
      )
    }

    if (this.props.deleteMessage === true) {
      message = (
        <>
          <h5>Are you sure?</h5>
          <Button 
            id='confirm-delete-button'
            onClick={this.props.deletePost}>
            Yes, delete it!
          </Button>

          <Button 
            id='cancel-delete-button'
            onClick={this.props.handleMessageVisibility('overlay')}
          >
            No, don't!
          </Button>
        </>
      )
    }

    return (
      <>
        <Sidebar
          id={(this.props.successMessage === true) ? 'message-topsidebar-success' : 'message-topsidebar-error'}
          as={Segment}
          animation='overlay'
          direction='top'
          visible={this.props.visible}>

          {message}
          {closeButton}
        </Sidebar>
      </>
    )
  }
}

export default ImageEntryMessage
