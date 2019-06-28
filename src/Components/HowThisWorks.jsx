import React, { Component } from 'react'
import { Header, Container, Image, Grid, Sidebar, Divider } from 'semantic-ui-react'
import { connect } from 'react-redux'

class HowThisWorks extends Component {
  render() {
    return (
      <>
        <Sidebar.Pushable as={Container} id="views-main-container-sidebar" onClick={this.props.sidebarVisible ? () => { this.props.dispatch({ type: 'CHANGE_SIDEBAR_VISIBILITY' }) } : () => { }}>
          <Container className="views-main-container">
            <Header className="views-main-header" as='h1'>
              How this works
              </Header>
            <br></br>

            <Container className="views-ingress-container">
              <p>
                Are you looking for inspirations of things to do and new places to explore in Stockholm?
                </p>
            </Container>
            <br></br>

            <Container className="views-ingress-container">
              <p>
                Do you have a favourite place or activity that you’d like to shout about?
                </p>
            </Container>
            <br></br>

            <Container className="views-text-container">
              <p>
                If so, Being Stockholm is the place for you!
                </p>
            </Container>
            <br></br>
            <Divider></Divider>

            <Header className="views-second-header" as='h3'>
              Where do Stockholmers work and play?
              </Header>
  

            <Grid columns={2}>
              <Grid.Column>
                <div>
                  <Image className="views-image" src='landing.jpg' size='medium'></Image>
                </div>
              </Grid.Column>
              <Grid.Column>
                <div>
                  <Image className="views-image" src='view_photo.jpg' size='medium'></Image>
                </div>
              </Grid.Column>
            </Grid>

            <Header className="views-second-header" as='h3'>
              Share your recommendations!
              </Header>
            <Header className="views-third-header" as='h4'>
              1. Set up a profile
              </Header>

            <Grid columns={2}>
              <Grid.Column>
                <div>
                  <Image className="views-image" src='log_in.jpg' size='medium'></Image>
                </div>
              </Grid.Column>
              <Grid.Column>
                <div>
                  <Image className="views-image" src='sign_up.jpg' size='medium'></Image>
                </div>
              </Grid.Column>
            </Grid>

            <Container>
              <p className="screenshot-label">
                We’d like to see if new and settled Stockholmers go to the same places and use them in different ways - so let us know whether you feel you’re a Newbie or a Settled Stockholmer!
                </p>
            </Container>
            <br></br>

            <Header className="views-third-header" as='h4'>
              2. Add a photo
              </Header>
            <Container className="views-text-container">
              <p>
                Best on your phone’s browser, but also works on your tablet or computer.
                </p>
            </Container>
            <br></br>

            <Grid columns={2}>
              <Grid.Column>
                <div>
                  <Image className="views-image" src='add_photo_1.jpg' size='medium'></Image>
                </div>
              </Grid.Column>
              <Grid.Column>
                <div>
                  <Image className="views-image" src='add_photo_2.jpg' size='medium'></Image>
                </div>
              </Grid.Column>
            </Grid>
            <Grid columns={2}>
              <Grid.Column>
                <div>
                  <Image className="views-image" src='add_photo_3.jpg' size='medium'></Image>
                </div>
              </Grid.Column>
              <Grid.Column>
                <div>
                  <Image className="views-image" src='add_photo_4.jpg' size='medium'></Image>
                </div>
              </Grid.Column>
            </Grid>

            <Container>
              <p className="screenshot-label">
                We recommend that the GPS and location services is switched on when you take the photo.
              </p>
            </Container>
            <br></br>

            <Header className="views-third-header" as='h4'>
              3. Map it!
              </Header>

            <Container className="views-text-container">
              <p>
                Once we have reviewed your photo, your photo will be live on the map to inspire other Stockholmers to try out!
              </p>
            </Container>
            <br></br>

            <Grid columns={2}>
              <Grid.Column>
                <div>
                  <Image className="views-image" src='mapped.jpg' size='medium'></Image>
                </div>
              </Grid.Column>
              <Grid.Column>
                <div>
                  <Image className="views-image" src='legend.jpg' size='medium'></Image>
                </div>
              </Grid.Column>
            </Grid>

            <Header className="views-second-header" as='h3'>
              How we use your information
              </Header>

            <Container className="views-ingress-container">
              <p>
                Only your photo and caption will be displayed as a 'Newbie' or 'Settled' Stockholmer.
                </p>
            </Container>
            <br></br>
            <Container className="views-text-container">
              <p>
                <b>Your personal information will not be displayed publicly or shared with any third parties.</b> It will be used for Urban Beings' research and development purposes so that we can understand how new and settled Stockholmers use the city. This includes your email address and further information such as which municipality you live in, where you lived previously, how long you have lived in Stockholm, your gender and age group.
              </p>
              <p>
                By taking part in the project, you allow us to use your posts to be displayed on the Being Stockholm map, website and other marketing purposes.
              </p>
            </Container>

            <Header className="views-second-header" as='h3'>
              Thank you for helping us understand how Stockholmers work and play!
              </Header>
            <br></br>
          </Container>
        </Sidebar.Pushable>
      </>
    )
  }
}

const mapStateToProps = state => ({
  sidebarVisible: state.animation.sidebarVisible
})

export default connect(mapStateToProps)(HowThisWorks)
