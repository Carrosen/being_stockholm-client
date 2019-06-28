import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment, Sidebar, Grid, Icon, Header } from 'semantic-ui-react'

class Legend extends Component {

  hideLegend = async () => {
    await this.props.dispatch({ type: 'CHANGE_LEGEND_VISIBILITY' })
  }

  render() {

    let userSignedIn = this.props.currentUser.isSignedIn
    let legendDescriptions

    if (userSignedIn === true) {
      legendDescriptions = (
        <>
          <Grid.Column
            className='legend-grid-column-level'
            width={6}>
            <Header className='level-text-legend' as='h4'>
              Me at
            </Header>

            <Header className='level-text-legend' as='h4'>
              Newbie at
            </Header>

            <Header className='level-text-legend' as='h4'>
              Settled at
            </Header>

          </Grid.Column>

          <Grid.Column
            centered
            width={5}
            className='legend-grid-column'
          >
            <Header as='h4'>
              <Icon
                id='circle-my-work'
                name='circle'
                size='small'
              >
              </Icon>
              work
            </Header>

            <Header as='h4'>
              <Icon
                id='circle-newbie-work'
                name='circle'
                size='small'
              >
              </Icon>
              work
            </Header>

            <Header as='h4'>
              <Icon
                id='circle-settled-work'
                name='circle'
                size='small'
              >
              </Icon>
              work
            </Header>
          </Grid.Column>

          <Grid.Column
            centered
            className='legend-grid-column'
            width={5}>
            <Header as='h4'>
              <Icon
                id='circle-my-play'
                name='circle'
              >
              </Icon>
              play
            </Header>

            <Header as='h4'>
              <Icon
                id='circle-newbie-play'
                name='circle'
                size='small'
              >
              </Icon>
              play
            </Header>

            <Header as='h4'>
              <Icon
                id='circle-settled-play'
                name='circle'
                size='small'
              >
              </Icon>
              play
            </Header>
          </Grid.Column>
        </>
      )
    } else {
      legendDescriptions = (
        <>
          <Grid.Column
            className='legend-grid-column-level'
            width={6}>

            <Header className='level-text-legend' as='h4'>
              Newbie at
            </Header>

            <Header className='level-text-legend' as='h4'>
              Settled at
            </Header>

          </Grid.Column>

          <Grid.Column
            centered
            width={5}
            className='legend-grid-column'
          >

            <Header as='h4'>
              <Icon
                id='circle-newbie-work'
                name='circle'
                size='small'
              >
              </Icon>
              work
            </Header>

            <Header as='h4'>
              <Icon
                id='circle-settled-work'
                name='circle'
                size='small'
              >
              </Icon>
              work
            </Header>
          </Grid.Column>

          <Grid.Column
            centered
            className='legend-grid-column'
            width={5}>

            <Header as='h4'>
              <Icon
                id='circle-newbie-play'
                name='circle'
                size='small'
              >
              </Icon>
              play
            </Header>

            <Header as='h4'>
              <Icon
                id='circle-settled-play'
                name='circle'
                size='small'
              >
              </Icon>
              play
            </Header>
          </Grid.Column>
        </>
      )
    }
    return (
      <>
        <Sidebar
          className='legend-content'
          id='legend'
          as={Segment}
          animation='overlay'
          direction='bottom'
          visible={this.props.visible}
          onClick={this.hideLegend}
        >
          <Grid >
            <Grid.Column textAlign='center' className="legend-padding" >
              <Icon
                name='window minimize outline'
                color='grey'
                className="legend-icon"
                size='large'
              />
              <br></br>
            </Grid.Column>
          </Grid>

          <Grid className='legend-grid'>
            {legendDescriptions}
          </Grid>
        </Sidebar>
      </>

    )
  }
}
const mapStateToProps = (state) => {
  return {
    visible: state.animation.legendVisible,
    currentUser: state.reduxTokenAuth.currentUser
  }
}

export default connect(mapStateToProps)(Legend);
