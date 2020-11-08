import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import {DataProvider} from './context/dataState';
import DonationPage from './pages/donation_page/DonationPage';
import CheckoutPage from './pages/checkout_page/CheckoutPage';
import NoMatch from './pages/no_match/NoMatch';

const history = createBrowserHistory();

function App() {
  return (
    <Fragment>
      <DataProvider>
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={DonationPage} />
            <Route exact path="/checkout" component={CheckoutPage} />
            <Route exact path="*" component={NoMatch} />
          </Switch>
        </Router>
      </DataProvider>
    </Fragment>
  );
}

export default App;
