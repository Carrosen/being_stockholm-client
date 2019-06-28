import React, { Component } from 'react'
import { Header, Container, Grid, Sidebar, Divider } from 'semantic-ui-react'
import { connect } from 'react-redux'

class Contact extends Component {
  render() {
    return (
      <>
        <Sidebar.Pushable as={Container} id="views-main-container-sidebar" onClick={this.props.sidebarVisible ? () => { this.props.dispatch({ type: 'CHANGE_SIDEBAR_VISIBILITY' }) } : () => { }}>
          <Container className="views-main-container">
            <Header className="views-main-header" as='h1'>
              Contact
              </Header>
            <br></br>

            <Container className="views-ingress-container">
              <p>
                We would love to hear your feedback on the project!
                </p>
            </Container>
            <br></br>

            <Container className="views-text-container">
              <p>
                We are particularly interested to build up a network of partners who would like to make the Stockholm region as welcoming and inclusive as possible for its residents, such as the public sector, major employers of internationals and those working on social cohesion and integration.
                </p>
            </Container>
            <br></br>

            <Container className="views-ingress-container">
              <p>
                Do email us or give us a call!
                </p>
            </Container>

            <Divider></Divider>

            <Grid>
              <Grid.Row className="contact-label-rows">
                <Grid.Column className="contact-label-columns">
                  <svg className='contact-labels' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fill='#F2711C' d="M13.6 13.47A4.99 4.99 0 0 1 5 10a5 5 0 0 1 8-4V5h2v6.5a1.5 1.5 0 0 0 3 0V10a8 8 0 1 0-4.42 7.16l.9 1.79A10 10 0 1 1 20 10h-.18.17v1.5a3.5 3.5 0 0 1-6.4 1.97zM10 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" /></svg>
                </Grid.Column>
                <Grid.Column className="contact-text-columns">
                  <a href='mailto:hello@beingstockholm.se'>hello@beingstockholm.se</a>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row className="contact-label-rows">
                <Grid.Column className="contact-label-columns">
                  <svg className='contact-labels' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fill='#F2711C' d="M20 18.35V19a1 1 0 0 1-1 1h-2A17 17 0 0 1 0 3V1a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4c0 .56-.31 1.31-.7 1.7L3.16 8.84c1.52 3.6 4.4 6.48 8 8l2.12-2.12c.4-.4 1.15-.71 1.7-.71H19a1 1 0 0 1 .99 1v3.35z" /></svg>
                </Grid.Column>
                <Grid.Column className="contact-text-columns">
                  <a href='tel:+46793476613'>+46 793 47 66 13</a>
                </Grid.Column>
              </Grid.Row>
              <br></br>
              <Grid.Row className="contact-label-rows">
                <Grid.Column className="contact-label-columns">
                  <svg className='contact-labels' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fill='#F2711C' d="M18 2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4c0-1.1.9-2 2-2h16zm-4.37 9.1L20 16v-2l-5.12-3.9L20 6V4l-10 8L0 4v2l5.12 4.1L0 14v2l6.37-4.9L10 14l3.63-2.9z" /></svg>
                </Grid.Column>
                <Grid.Column className="contact-text-columns">
                  <p><b>Open Lab</b> Vallhallavägen 79, 114 28 Stockholm, Sweden</p>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </Sidebar.Pushable>
      </>
    )
  }
}

const mapStateToProps = state => ({
  sidebarVisible: state.animation.sidebarVisible
})

export default connect(mapStateToProps)(Contact)
