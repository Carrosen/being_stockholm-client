import React, { Component } from 'react'
import { Form, Button, Container, Message, Header, Sidebar } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { registerUser } from '../reduxTokenAuthConfig'

class SignUp extends Component {
  state = {
    email: '',
    password: '',
    password_confirmation: '',
    level: '',
    message: '',
    errors_signup: '',
    activeItem: '',
  }

  onChangeHandler = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleChangeLevel = (e) => {
    this.setState({ level: e.target.value, activeItem: e.target.value })
  }

  createUser = (e) => {
    e.preventDefault();
    const { history, registerUser } = this.props
    const {
      email,
      password,
      password_confirmation,
      level,
    } = this.state
    registerUser({ email, password, password_confirmation, level })
      .then(response => {
        this.setState({ message: true })
        setTimeout(function () { history.push('/') }, 1000)
      }).catch(error => {
        this.setState({
          errors_signup: error.response.data.errors.full_messages,
          message: false
        })
      })
  }

  render() {
    const { activeItem } = this.state

    let userSignedIn = this.props.currentUser.isSignedIn
    let message

    if (userSignedIn === true && this.state.message === true) {
      message = (
        <>
          <br />
          <Message positive>
            <p>You have succesfully created an account!</p>
          </Message>
        </>
      )
    } else if (this.state.message === false) {
      message = (
        <>
          <br />
          <Message negative>
            <Message.Header textAlign='center'>Ooops!</Message.Header>
            <ul id="message-error-list">
              {this.state.errors_signup.map(error => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </Message>
        </>
      )
    }
    return (
      <Sidebar.Pushable as={Container} id="views-main-container-sidebar">
        <Container className="views-main-container"textAlign='center'>

          <Header className="views-main-header" as='h1'>
            Sign up
          </Header>
          <br></br>
          {message}
          <br></br>

          <Form id="signup-form">
            <Form.Input
              id="email"
              value={this.state.email}
              onChange={this.onChangeHandler}
              placeholder="Email"
            />
            <Form.Input
              id="password"
              type="password"
              value={this.state.password}
              onChange={this.onChangeHandler}
              placeholder="Password"
            />
            <Form.Input
              id="password_confirmation"
              type="password"
              value={this.state.password_confirmation}
              onChange={this.onChangeHandler}
              placeholder="Repeat password"
            />
          </Form>
          <br></br>

          <p
          className='text'>
          What type of Stockholmer do you consider yourself to be?</p>

          <Button.Group
            className='button-group'
            basic
          >
            <Button
              id='newbie'
              active={activeItem === 'newbie'}
              value={'newbie'}
              onClick={this.handleChangeLevel}>
              Newbie
            </Button>
            <Button
              id='settled'
              active={activeItem === 'settled'}
              value={'settled'}
              onClick={this.handleChangeLevel}>
              Settled
              </Button>
          </Button.Group>
          <br></br>
          <br></br>

          <Button className='submit-button' id="sign_up_button" onClick={this.createUser}>Sign up</Button>

        </Container>
      </Sidebar.Pushable>  
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
  { registerUser },
)(SignUp)