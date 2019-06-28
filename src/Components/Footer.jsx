import React, { Component } from 'react'
import { Grid, Header, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class Footer extends Component {
  render() {

    let userSignedIn = this.props.currentUser.isSignedIn
    let userIcon

    if (userSignedIn === true && this.props.admin === true) {
      userIcon = (
        <>
          <Grid.Column
            id='admin-icon'
            as={Link}
            to='admin'
            textAlign='center'
            width={3}>
            <Icon
              name='key'
              size='large'
            >
            </Icon>
          </Grid.Column>
        </>
      )
    } else if (userSignedIn === true && this.props.admin === false) {
      userIcon = (
        <>
          <Grid.Column
            id='profile-icon'
            as={Link}
            to='my-profile'
            textAlign='center'
            width={3}>
            <svg className='footer-icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fill='#F2711C' d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zM7 6v2a3 3 0 1 0 6 0V6a3 3 0 1 0-6 0zm-3.65 8.44a8 8 0 0 0 13.3 0 15.94 15.94 0 0 0-13.3 0z" /></svg>
          </Grid.Column>
        </>
      )
    } else {
      userIcon = (
        <>
          <Grid.Column
            id='profile-icon'
            as={Link}
            to='log-in'
            textAlign='center'
            width={3}>
            <svg className='footer-icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fill='#D3D3D3' d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zM7 6v2a3 3 0 1 0 6 0V6a3 3 0 1 0-6 0zm-3.65 8.44a8 8 0 0 0 13.3 0 15.94 15.94 0 0 0-13.3 0z" /></svg>
          </Grid.Column>
        </>
      )
    }

    return (
      <>
        <Grid
          id='footer'
          verticalAlign='middle'
          centered columns={3}>

          <Grid.Column
            textAlign='center'
            verticalAlign='middle'
            width={3}>
            <svg className='footer-icon' id='footer-menu-icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" onClick={() => this.props.dispatch({ type: 'CHANGE_SIDEBAR_VISIBILITY' })}><path fill='#F2711C' d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
          </Grid.Column>

          <Grid.Column
            textAlign='center'
            width={10}>
            <Header
              color='orange'
              id='footer-logo'
              as={Link}
              to='/'
              onClick={() => this.props.dispatch({ type: 'CLOSE_IMAGE_POST' })}
            >
              Being Stockholm
            </Header>

          </Grid.Column>

          {userIcon}

        </Grid>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    admin: state.reduxTokenAuth.currentUser.attributes.admin,
    currentUser: state.reduxTokenAuth.currentUser
  }
}

export default connect(mapStateToProps)(Footer);
