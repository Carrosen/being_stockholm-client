import React, { Component } from 'react'
import { Form, Button, Container, Message, Header } from 'semantic-ui-react'
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
      .then(response => {
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
    let user = this.props.currentUser.isSignedIn

    if (user === true && this.state.message === true) {
      message = (
        <>
          <br />
          <Message color="green">
            <p>You have succesfully logged in!</p>
          </Message>
        </>
      )
    } else if (this.state.message === false) {
      message = (
        <>
          <br />
          <Message color="red">
            <p>{this.state.errorsLogin}</p>
          </Message>
        </>
      )
    }
    return (

      <Container className="views-main-container"textAlign='center'>

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
    )
  }
}
const mapStateToProps = (state) => {
  return {
    currentUser: state.reduxTokenAuth.currentUser
  }
}
export default connect(
  mapStateToProps,
  { signInUser },
)(Login)