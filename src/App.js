import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Avro from './pages/Avro'
import Base64 from './pages/Base64'
import URIEnDecode from './pages/URIEnDecode'
import Timestamp from './pages/Timestamp'
import URIComponentEnDecode from './pages/URIComponentEnDecode'

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
          <Route path="/timestamp">
            <Timestamp />
          </Route>
          <Route path="/base64">
            <Base64 />
          </Route>
          <Route path="/uri-endecode">
            <URIEnDecode />
          </Route>
          <Route path="/uri-component-endecode">
            <URIComponentEnDecode />
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
