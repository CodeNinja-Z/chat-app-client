import React from 'react'
import './App.css'
import { Route, Switch } from 'react-router-dom'
import Forums from './components/forums/Forums'
import Forum from './components/forum/Forum'

const App = () => {
  return (
    <Switch>
      <Route exact path='/' component={Forums}/>
      <Route exact path='/forums/:id' component={Forum}/>
    </Switch>
  )
}

export default App