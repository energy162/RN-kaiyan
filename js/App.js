import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  StatusBar,
  View
} from 'react-native';

import { connect } from 'react-redux';

import { loadConfig, loadDiscovery, loadFollow } from './actions';

import AppNavigator from './AppNavigator';

class App extends Component {
  state: {
    isLoading: boolean;
    store: any;
  };

  componentDidMount() {
    this.props.dispatch(loadConfig());
    this.props.dispatch(loadDiscovery());
    this.props.dispatch(loadFollow());
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          translucent={true}
          backgroundColor="rgba(0, 0, 0, 0.2)"
          barStyle="light-content"
         />
         <AppNavigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

module.exports = connect()(App);
