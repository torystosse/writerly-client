import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
import Header from '../Header/Header'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import SignOut from '../SignOut/SignOut'
import ChangePassword from '../ChangePassword/ChangePassword'
// import Home from '../Home/Home'

import Prompts from '../Prompt/Prompts'
import MyPrompts from '../Prompt/MyPrompts'
import PromptCreate from '../Prompt/PromptCreate'
import Prompt from '../Prompt/Prompt'
import PromptEdit from '../Prompt/PromptEdit'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      alerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  alert = ({ heading, message, variant }) => {
    this.setState({ alerts: [...this.state.alerts, { heading, message, variant }] })
  }

  render () {
    const { alerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {alerts.map((alert, index) => (
          <AutoDismissAlert
            key={index}
            heading={alert.heading}
            variant={alert.variant}
            message={alert.message}
          />
        ))}
        <main className="container">
          <Route exact path='/' render={({ match }) => (
            <Prompts alert={this.alert} user={user} match={match} />
          )} />
          {/* // <Route exact path='/' user={user} render={({ match }) => (
          //   <Home user={user} match={match}/>
          // )} /> */}
          <Route exact path="/prompts/:id" render={({ match, history }) => (
            <Prompt alert={this.alert} user={user} match={match} history={history}/>
          )}/>
          <AuthenticatedRoute user={user} path='/create-prompt' render={() => (
            <PromptCreate alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/prompts/:id/edit' render={({ match }) => (
            <PromptEdit alert={this.alert} user={user} match={match} />
          )} />
          <AuthenticatedRoute user={user} exact path='/my-prompts' render={() => (
            <MyPrompts alert={this.alert} user={user} />
          )} />
          <Route path='/sign-up' render={() => (
            <SignUp alert={this.alert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn alert={this.alert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut alert={this.alert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword alert={this.alert} user={user} />
          )} />
        </main>
      </Fragment>
    )
  }
}

export default App
