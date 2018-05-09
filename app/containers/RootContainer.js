// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  createReduxBoundAddListener,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';

import { AppNavigator } from './RootNavigator';

export const navMiddleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.nav,
);
const addListener = createReduxBoundAddListener('root');

type Props = {};
class AppWithNavigationState extends Component<Props> {
  render() {
    return <AppNavigator navigation={{
      dispatch: this.props.dispatch,
      state: this.props.nav,
      addListener,
    }} />
  }
}

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);