import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import DefaultTemplate from './DefaultTemplate';
import MaskRCNNModel from './MaskRCNNModel';
import Navigation from './Navigation';

export default class App extends React.Component<{}, {}> {

  public render() {
    return (
        <div>
          <Navigation />
          <Switch>
            <Route path="/mrcnn" component={MaskRCNNModel} />
            <Route path='/' component={DefaultTemplate} />
          </Switch>
        </div>
    );
  }
}
