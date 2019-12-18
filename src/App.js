import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Avro from './Avro'

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact>
            <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/avro">Avro</Link>
                </li>
              </ul>
            </nav>
          </Route>
          <Route path="/avro">
            <Avro />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
