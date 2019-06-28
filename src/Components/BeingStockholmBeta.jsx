import React, { Component } from 'react'
import { Header, Container, Image, Segment, Sidebar, Divider } from 'semantic-ui-react'
import { connect } from 'react-redux'

class BeingStockholmBeta extends Component {
  render() {
    return (
      <>
        <Sidebar.Pushable as={Container} id="views-main-container-sidebar" onClick={this.props.sidebarVisible ? () => { this.props.dispatch({ type: 'CHANGE_SIDEBAR_VISIBILITY' }) } : () => { }}>
          <Container className="views-main-container">
            <Header className="views-main-header" as='h1'>
              Being Stockholm <span style={{ fontWeight: 100 }}>beta</span>
            </Header>
            <br></br>

            <Container className="views-ingress-container">
              <p>
                This is our first web app to test the project idea in 2019.
                </p>
            </Container>
            <br></br>

            <Container className="views-text-container">
              <p>
                We are extremely grateful to the coaches and senior students at the <b><a href='https://craftacademy.se/english/' target='_blank' rel='noopener noreferrer'>Craft Academy</a></b> Coding Bootcamp who helped us to develop our concept into a beautiful working prototype as part of their final design project.
                </p>
              <br></br>
              <p>
                <b>Big thank you</b> for all your hard work, love and nerdery:
                </p>
              <p>
                <i>In Stockholm:</i><a href='https://github.com/leiter007' target='_blank' rel='noopener noreferrer'>&nbsp;Felix Bonnier,</a><a href='https://github.com/Carrosen' target='_blank' rel='noopener noreferrer'>&nbsp;Carla Rosén,</a><a href='https://gtomaras-portfolio.netlify.com/' target='_blank' rel='noopener noreferrer'>&nbsp;George Tomaras</a>
              </p>
              <p>
                <i>In Gothenburg:</i><a href='https://www.linkedin.com/in/stefankarlberg' target='_blank' rel='noopener noreferrer'>&nbsp;Stefan Karlberg,&nbsp;</a><a href='https://www.linkedin.com/in/zane-neikena' target='_blank' rel='noopener noreferrer'>Zane Neikena</a>
              </p>
              <br></br>
              <p>
                <b>Special thanks:</b>
              </p>
              <p>
                <a href='https://github.com/tochman' target='_blank' rel='noopener noreferrer'>Thomas Ochman,</a><a href='https://github.com/faraznaeem' target='_blank' rel='noopener noreferrer'>&nbsp;Faraz Naaem,</a><a href='https://github.com/oliverochman' target='_blank' rel='noopener noreferrer'>&nbsp;Oliver Ochman,</a><a href='https://github.com/GergKllai1' target='_blank' rel='noopener noreferrer'>&nbsp;Gregory Kallai</a>&nbsp;and<a href='https://github.com/kianaditya' target='_blank' rel='noopener noreferrer'>&nbsp;Aditya Naik</a> for guiding and coaching the students and Urban Beings on this journey!
              </p>
            </Container>
            <br></br>

            <Segment className="image-segment-left">
              <div>
                <Image className="views-image" src='craft_team_photo.jpg' size='medium'></Image>
                <br></br>
                <p className="image-segment-label" >CraftAcademy squad - GOTHENBURG TO BE ADDED!</p>
              </div>
            </Segment>

            <Divider></Divider>

            <Header className="views-second-header" as='h3'>
              Next steps
              </Header>

            <Container className="views-text-container">
              <p>
                After this beta testing, we will curate an exhibition of how Stockholmers work and play and release an update to the app.
                </p>
              <p>
                <a href='https://urbanbeings.us18.list-manage.com/subscribe?u=511ba4646c76ccebddfc09524&id=4b6589bfcd' target="_blank" rel='noopener noreferrer'>Subscribe </a>to our mailing list to stay updated on our next steps!
                </p>
            </Container>

          </Container>
        </Sidebar.Pushable>
      </>
    )
  }
}

const mapStateToProps = state => ({
  sidebarVisible: state.animation.sidebarVisible
})


export default connect(mapStateToProps)(BeingStockholmBeta)
