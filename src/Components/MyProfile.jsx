import React, { Component } from 'react'
import { Header, Container, Sidebar, Button, Divider, Grid, Icon, Label } from 'semantic-ui-react'
import { connect } from 'react-redux'
import axios from 'axios'
import moment from 'moment'


class MyProfile extends Component {
  state = {
    entries: []
  }

  componentDidMount() {
    axios.get(`/api/v1/posts?user_id=${this.props.currentUser.attributes.id}`).then(response => {
      this.setState({ entries: response.data })
    })
  }

  date = (data) => {
    let dateString = data
    let dateObj = new Date(dateString)
    let momentObj = moment(dateObj)
    let date = momentObj.format('DD-MM-YYYY')
    let time = momentObj.format('HH:mm')
    return `${date} | ${time}`
  }

  render() {

    let userSignedIn = this.props.currentUser.isSignedIn
    let userLevel = this.props.currentUser.attributes.level
    let userEmail = this.props.currentUser.attributes.uid
    let emailLabel
    let levelLabel

    if (userSignedIn === true) {
      emailLabel = (
        <Header className="profile-email-header" as='h3'>
          {userEmail}
        </Header>
      )
      levelLabel = (
        <p>
          I am a {userLevel} Stockholmer
          </p>
      )

    }

    let publishedEntriesToDisplay
    let pendingEntriesToDisplay
    let declinedEntriesToDisplay

    let publishedEntries = []
    let pendingEntries = []
    let declinedEntries = []

    this.state.entries.forEach(entry => {
      if (entry.status === 'published') {
        return publishedEntries.push(entry)
      } else if (entry.status === 'pending') {
        return pendingEntries.push(entry)
      } else if (entry.status === 'declined') {
        return declinedEntries.push(entry)
      }
    })

    pendingEntriesToDisplay = (
      pendingEntries.map(entry => {

        let trimmedEntryCaption = entry.caption.substr(0, 40);
        let trimmedCaption = trimmedEntryCaption.substr(0, Math.min(trimmedEntryCaption.length, trimmedEntryCaption.lastIndexOf(""))) + ' ...'

        let entryDate = this.date(entry.created_at)

        return (
          <>
            <Grid id={entry.id} className='my-profile-card'>
              <Grid.Column
                mobile={4} tablet={5} computer={6}
                href={entry.image}
                target='_blank'
                className='my-profile-entry-image'
                style={{ background: `url(${entry.image})` }}
              >
              </Grid.Column>
              <Grid.Column className='my-profile-entry-data' mobile={12} tablet={11} computer={10}>
                <h3 className='my-profile-caption'>{trimmedCaption}</h3>
                <p className='my-profile-date'>{entryDate}</p>
                <Grid columns={2}>
                  <Grid.Column width={11} >
                    <p className='my-profile-geo' id='entry-location'>
                      <Icon name='map marker alternate' />
                      {entry.address}
                    </p>
                  </Grid.Column>
                  <Grid.Column width={5}>
                    <Label basic>
                      {entry.category}
                    </Label>
                  </Grid.Column>
                </Grid>
              </Grid.Column>
            </Grid>
            <Divider section className='my-profile-divider' />
          </>
        )
      })
    )

    declinedEntriesToDisplay = (
      declinedEntries.map(entry => {

        let trimmedEntryCaption = entry.caption.substr(0, 40);
        let trimmedCaption = trimmedEntryCaption.substr(0, Math.min(trimmedEntryCaption.length, trimmedEntryCaption.lastIndexOf(""))) + ' ...'

        let entryDate = this.date(entry.created_at)
        return (
          <>
            <Grid id={entry.id} className='my-profile-card'>
              <Grid.Column
                mobile={4} tablet={5} computer={6}
                href={entry.image}
                target='_blank'
                className='my-profile-entry-image'
                style={{ background: `url(${entry.image})` }}
              >
              </Grid.Column>
              <Grid.Column className='my-profile-entry-data' mobile={12} tablet={11} computer={10}>
                <h3 className='my-profile-caption'>{trimmedCaption}</h3>
                <p className='my-profile-date'>{entryDate}</p>
                <Grid columns={2}>
                  <Grid.Column width={11} >
                    <p className='my-profile-geo' id='entry-location'>
                      <Icon name='map marker alternate' />
                      {entry.address}
                    </p>
                  </Grid.Column>
                  <Grid.Column width={5}>
                    <Label basic>
                      {entry.category}
                    </Label>
                  </Grid.Column>
                </Grid>
              </Grid.Column>
            </Grid>
            <Divider section className='my-profile-divider' />
          </>
        )
      })
    )

    publishedEntriesToDisplay = (
      publishedEntries.map(entry => {

        let trimmedEntryCaption = entry.caption.substr(0, 40);
        let trimmedCaption = trimmedEntryCaption.substr(0, Math.min(trimmedEntryCaption.length, trimmedEntryCaption.lastIndexOf(""))) + ' ...'

        let entryDate = this.date(entry.created_at)
        return (
          <>
            <Grid id={entry.id} className='my-profile-card'>
              <Grid.Column
                mobile={4} tablet={5} computer={6}
                href={entry.image}
                target='_blank'
                className='my-profile-entry-image'
                style={{ background: `url(${entry.image})` }}
              >
              </Grid.Column>
              <Grid.Column className='my-profile-entry-data' mobile={12} tablet={11} computer={10}>
                <h3 className='my-profile-caption'>{trimmedCaption}</h3>
                <p className='my-profile-date'>{entryDate}</p>
                <Grid columns={2}>
                  <Grid.Column width={11} >
                    <p className='my-profile-geo' id='entry-location'>
                      <Icon name='map marker alternate' />
                      {entry.address}
                    </p>
                  </Grid.Column>
                  <Grid.Column width={5}>
                    <Label basic>
                      {entry.category}
                    </Label>
                  </Grid.Column>
                </Grid>
              </Grid.Column>
            </Grid>
            <Divider section className='my-profile-divider' />
          </>
        )
      })
    )

    return (
      <Sidebar.Pushable as={Container} id="views-main-container-sidebar" onClick={this.props.sidebarVisible ? () => { this.props.dispatch({ type: 'CHANGE_SIDEBAR_VISIBILITY' }) } : () => { }}>
        <Container className="views-main-container">
          <Header className="views-main-header" as='h1'>
            My profile
            </Header>
          <br></br>

          {emailLabel}

          <Grid className="align-center">
            <Grid.Column>
              {levelLabel}
              <Divider></Divider>
              <p>
                Your personal details will not be visible on the post but shown only as posted by a Newbie/Settled
              </p>
              <p>
                We’d love to find out more about you and how to stay in touch
              </p>
              <Button
                className='submit-button'
                href='https://urbanbeings.us18.list-manage.com/subscribe?u=511ba4646c76ccebddfc09524&id=4b6589bfcd'
                target='_blank'
              >
                1 min survey
              </Button>
            </Grid.Column>
          </Grid>
          <br></br>
          <Divider></Divider>
          <br></br>

          <Grid >
            <Grid.Column id='pending-entries' mobile={16} tablet={16} computer={16} largeScreen={5} widescreen={5}>
              <Header as='h2' textAlign='center'>You have ({pendingEntries.length}) pending posts </Header>
              {pendingEntriesToDisplay}
            </Grid.Column>

            <Grid.Column id='declined-entries' mobile={16} tablet={16} computer={16} largeScreen={5} widescreen={5}>
              <Header as='h2' textAlign='center'>You have ({declinedEntries.length}) declined posts</Header>
              {declinedEntriesToDisplay}
            </Grid.Column>

            <Grid.Column id='published-entries' mobile={16} tablet={16} computer={16} largeScreen={6} widescreen={6}>
              <Header as='h2' textAlign='center'>You have ({publishedEntries.length}) published posts</Header>
              {publishedEntriesToDisplay}
            </Grid.Column>
          </Grid>

        </Container>
      </Sidebar.Pushable>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.reduxTokenAuth.currentUser,
    sidebarVisible: state.animation.sidebarVisible
  }
}

export default connect(mapStateToProps)(MyProfile)
