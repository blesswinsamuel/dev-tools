import React, { Suspense } from 'react'
import { Router, Switch, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Base64 from './pages/Base64'
import CaseConverter from './pages/CaseConverter'
import Home from './pages/Home'
import Timestamp from './pages/Timestamp'
import UriComponentEndecode from './pages/UriComponentEndecode'
import UriEndecode from './pages/UriEndecode'
import { createBrowserHistory } from 'history'

var history = createBrowserHistory()

history.listen((location) => {
  ;(window as any).goatcounter.count({
    path: location.pathname + location.search,
  })
})

const Avro = React.lazy(() => import('./pages/Avro'))

function App() {
  return (
    <Router history={history}>
      <Layout>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/timestamp">
              <Timestamp />
            </Route>
            <Route exact path="/avro">
              <Avro />
            </Route>
            <Route exact path="/base64">
              <Base64 />
            </Route>
            <Route exact path="/uri-endecode">
              <UriEndecode />
            </Route>
            <Route exact path="/uri-component-endecode">
              <UriComponentEndecode />
            </Route>
            <Route exact path="/case-converter">
              <CaseConverter />
            </Route>
          </Switch>
        </Suspense>
      </Layout>
    </Router>
  )
}

export default App
