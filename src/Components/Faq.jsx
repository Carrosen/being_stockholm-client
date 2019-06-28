import React, { Component } from 'react'
import { Header, Sidebar, Container, List, Grid, Image } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'


class Faq extends Component {
  render() {
    return (
      <Sidebar.Pushable as={Container} id="views-main-container-sidebar" onClick={this.props.sidebarVisible ? () => { this.props.dispatch({ type: 'CHANGE_SIDEBAR_VISIBILITY' }) } : () => { }}>
        <Container className="views-main-container">
          <Header className="views-main-header" as='h1'>
            FAQs
          </Header>
          <br></br>

          <Header className="views-third-header" as='h4'>
            What do the colour dots mean?
          </Header>
          <Container className="views-text-container">
            <p>
              Each post is colour coded to show whether it is showing a Newbie or Settled Stockholmer at work or play. If you’re logged into your accounts, your posts will also have their own colours!
            </p>
          </Container>
          <br></br>

          <Grid columns={2}>
              <Grid.Column>
                <div>
                  <Image className="views-image" src='legend.jpg' size='medium'></Image>
                </div>
              </Grid.Column>
              <Grid.Column>
              </Grid.Column>
            </Grid>
            <br></br>

          <Header className="views-third-header" as='h4'>
            What does mean to be a Newbie or Settled Stockholmer?
          </Header>
          <Container className="views-text-container">
            <p>
              This is entirely up to the user - depending how new or settled <b>they feel</b> living in Stockholm. Someone living in Stockholm for just a few months may feel more settled than someone living here for a few years. Someone who was born in Stockholm but returned after living abroad may feel like a Newbie.
            </p>
            
          </Container>
          <br></br>

          <Header className="views-third-header" as='h4'>
            What counts as work or play?
          </Header>
          <Container className="views-text-container">
            <p>
              <i>Does having fun playing ping pong in the office count as work or play?</i>
            </p>
            <p>
            <i>Does doing DIY at your summer house count as work or play?</i>
            </p>
            <p>
              Again, this is entirely up to the user. 
            </p>
            <p>
              Sweden is known for its quality of life and value for a good work-life balance, so we want to see if Stockholmers strike this (or not). We want to see the different ways of working in today’s interconnected and changing workplaces and make it easier for newcomers to see how the locals spend their free time. Is it true that all the Settled Stockholmers are having a fika at their summer houses on weekends? 
            </p>
          </Container>
          <br></br>

          <Header className="views-third-header" as='h4'>
            What is the best way to upload a post?
          </Header>
          <Container className="views-text-container">
            <p>
              On your phone’s web browser!
            </p>
            <p>
              You can upload from your photo album (recommended) or even take a photo directly from your camera. You can also use your tablet or computer. If your settings allow it, you can even upload from Google Drive, Dropbox, iCloud etc
            </p>
          </Container>
          <br></br>

          <Header className="views-third-header" as='h4'>
            Why can’t I map my post?
          </Header>
          <Container className="views-text-container">
            <p>
              Please check it contains all of the following:
            </p>
            <List bulleted>
              <List.Item>An image</List.Item>
              <List.Item>A short caption of less than 140 characters</List.Item>
              <List.Item>A location of where the photo was taken If the photo contains geolocation data, we can map it automatically. Otherwise you can enter and search for the address manually.</List.Item>
              <List.Item>Tap on the toggle to describe if the post is work or play</List.Item>
              <List.Item>Click ‘Map it!’</List.Item>
            </List>
          </Container>
          <br></br>

          <Header className="views-third-header" as='h4'>
            Why is my post declined?
          </Header>
          <Container className="views-text-container">
            <p>
              Mistakes happen! Maybe your little one got hold of your phone and uploaded a blurry photo and gibberish text.
            </p>
            <p>
              Or we feel the post has an inappropriate photo or caption that may cause offence - but hopefully not criminal!
            </p>
            <p>
              For the beta version, we can only accept photos from within Stockholm. Global domination will follow, don’t worry! Watch this space! If you haven’t already, subscribe to our <a href='https://urbanbeings.us18.list-manage.com/subscribe?u=511ba4646c76ccebddfc09524&id=4b6589bfcd' target="_blank" rel='noopener noreferrer'>mailing list</a>&nbsp;here.
            </p>
          </Container>
          <br></br>

          <Header className="views-third-header" as='h4'>
            How can I see my photos?
          </Header>
          <Container className="views-text-container">
            <p>
              You can see a list of all your posts in <Header as={Link} to={(this.props.currentUser.isSignedIn) ? '/my-profile' : '/log-in'} className='fake-link'>My profile</Header> - those pending to be reviewed, those declined and those published.
            </p>
          </Container>
          <br></br>

          <Header className="views-third-header" as='h4'>
            How can I share my post with my friends?
          </Header>
          <Container className="views-text-container">
            <p>
              Unfortunately this beta version isn’t able to share individual posts or datapoints. It is on the to-do list for the next iteration though!
            </p>
            <p>
              However you can still share the project website with your friends, so they can see the map and even better - share their photos too! Simply direct them to <a href='http://www.beingstockholm.se/' target="_blank" rel='noopener noreferrer'>www.beingstockholm.se.</a>&nbsp;Thanks in advance!
            </p>
          </Container>
          <br></br>

          <Header className="views-third-header" as='h4'>
            How will my data be used?
              </Header>
          <Container className="views-text-container">
            <p>
              Firstly, thank you for helping us test and develop the Being Stockholm project!</p>
            <p>
              Your posts will help inspire fellow Stockholmers to explore new places and try new activities! It will be colour coded to show whether it’s submitted by a new or settled Stockholm at work or play. Your personal information will not be visible.
            </p>
            <p>
              Your posts will also help us to understand where and how new and settled Stockholmers work and play. We plan to work with public authorities to help them design, plan and promote the city with a citizen-powered map.             </p>
            <p>
              All the data collected will only be used by Urban Beings as part of our research and development. Your posts may be used to promote the project online and in exhibitions, but your personal information (name, email, gender etc) will never be shared with any other third parties.
            </p>
          </Container>
          <br></br>

          <Header className="views-third-header" as='h4'>
            I don’t live in Stockholm - can I still take part?
          </Header>
          <Container className="views-text-container">
            <p>
              Sorry, not at the moment. We will let you know once this is available in your city! In the meanwhile, you’re very welcome to see the photos posted by Newbie and Settled Stockholmers.
            </p>
          </Container>
          <br></br>

          <Header className="views-third-header" as='h4'>
            Any other questions?
          </Header>
          <Container className="views-text-container">
            <p>
              Drop Yat a line &nbsp;<a href='mailto:hello@beingstockholm.se'>hello@beingstockholm.se</a>
            </p>
          </Container>
          <br></br>

        </Container>
      </Sidebar.Pushable>
    )
  }
}

const mapStateToProps = state => ({
  sidebarVisible: state.animation.sidebarVisible,
  currentUser: state.reduxTokenAuth.currentUser
})

export default connect(mapStateToProps)(Faq)
