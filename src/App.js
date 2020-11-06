import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {DataProvider} from './context/dataState';
import DonationPage from './pages/donation_page/DonationPage'
import NoMatch from './pages/no_match/NoMatch'

function App() {
  return (
    <>
      <DataProvider>
        <Router>
          <Switch>
            <Route exact path="/" component={DonationPage} />
            <Route exact path="*" component={NoMatch} />
          </Switch>
        </Router>
      </DataProvider>
    </>
  );
}

export default App;
