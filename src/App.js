import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Avro from './pages/Avro'

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/" exact>
            <div>Home</div>
          </Route>
          <Route path="/avro">
            <Avro />
          </Route>
          <Route path="/*">
            <div>Not Found</div>
          </Route>
        </Switch>
      </Layout>
    </Router>
  )
}

export default App
