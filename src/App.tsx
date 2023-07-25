import { Payments } from 'pages';
import { BrowserRouter as Router, Route, Routes as Switch } from 'react-router-dom'

const App = () => {
  return (
      <Router>
          <Switch>
              <Route
                path='/'
                Component={Payments}
              />
          </Switch>
      </Router>
  )
}

export default App;
