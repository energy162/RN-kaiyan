import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Navigator,
  View
} from 'react-native';
import { connect } from 'react-redux';
import { switchTab } from './actions';
import AppTabsView from './tabs/AppTabsView';
import CategoryScreen from './category/CategoryScreen';
import FilterScreen from './filter/FilterScreen';



class AppNavigator extends Component {
  render() {
    return (
      <Navigator
        ref="navigator"
        style={styles.container}
        configureScene={(route) => {
          if (route.allCategory) {
            return {
              ...Navigator.SceneConfigs.FloatFromBottom,
              gestures:{}
            };
          }
          if (route.filter) {
            return {
              ...Navigator.SceneConfigs.VerticalDownSwipeJump,
              gestures:{}
            };
          }
          return Navigator.SceneConfigs.PushFromRight;
        }}
        initialRoute={{}}
        renderScene={this.renderScene}
      />
    );
  }

  renderScene(route, navigator) {
    if (route.notices) {
      return <View navigator={navigator} />;
    }
    if (route.allCategory) {
      return <CategoryScreen navigator={navigator} />;
    }
    if (route.filter) {
      return <FilterScreen navigator={navigator} />;
    }
    return <AppTabsView navigator={navigator} />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});

module.exports = connect()(AppNavigator);
