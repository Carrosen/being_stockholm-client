import React, { Component } from 'react'
import { Form, Button, Container, Message, Header, Sidebar } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { signInUser } from '../reduxTokenAuthConfig'
import { Link } from 'react-router-dom'

class Login extends Component {
  state = {
    email: '',
    password: '',
    message: '',
    errorsLogin: ''
  }

  onChangeHandler = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { history, signInUser } = this.props
    const {
      email,
      password
    } = this.state
    signInUser({ email, password })
      .then(() => {
        this.setState({ message: true })
        setTimeout(function () { history.push('/') }, 1000)
      }).catch(error => {
        this.setState({
          errorsLogin: error.response.data.errors[0],
          message: false
        })
      })
  }

  render() {

    let message
    let userSignedIn = this.props.currentUser.isSignedIn

    if (userSignedIn === true && this.state.message === true) {
      message = (
        <>
          <br />
          <Message success>
            <p>You have succesfully logged in!</p>
          </Message>
        </>
      )
    } else if (this.state.message === false) {
      message = (
        <>
          <br />
          <Message negative>
            <p>{this.state.errorsLogin}</p>
          </Message>
        </>
      )
    }
    return (
      <Sidebar.Pushable as={Container} id="views-main-container-sidebar" onClick={this.props.sidebarVisible ? () => { this.props.sidebarVisbilityHandler() } : () => { }}>
        <Container className="views-main-container" textAlign='center'>

          <Header className="views-main-header" as='h1'>
            Log In
          </Header>
          <br></br>
          <br></br>

          <p>{message}</p>
          <Form
            id="login-form"
            onSubmit={this.onSubmit}
          >

            <Form.Input
              required
              id="email"
              value={this.state.email}
              onChange={this.onChangeHandler}
              placeholder="Email"
            />
            <Form.Input
              required
              id="password"
              type="password"
              value={this.state.password}
              onChange={this.onChangeHandler}
              placeholder="Password"
            />
            <br></br>

            <Button className="submit-button" id="login_form_button">Login</Button>
          </Form>

          <br></br>
          <br></br>

          <Header
            className='text'
            id="sign_up_link"
            as={Link}
            to='sign-up'
          >
            Not registered? Create an account!
          </Header>

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

const mapDispatchToProps = {
  sidebarVisbilityHandler: () => ({
    type: 'CHANGE_SIDEBAR_VISIBILITY'
  }),
  signInUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
