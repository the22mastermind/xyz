import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {DataProvider} from './context/dataState';
import DonationPage from './pages/donation_page/DonationPage';
import CheckoutPage from './pages/checkout_page/CheckoutPage';
import NoMatch from './pages/no_match/NoMatch';

function App() {
  return (
    <>
      <DataProvider>
        <Router>
          <Switch>
            <Route exact path="/" component={DonationPage} />
            <Route exact path="/checkout" component={CheckoutPage} />
            <Route exact path="*" component={NoMatch} />
          </Switch>
        </Router>
      </DataProvider>
    </>
  );
}

export default App;
