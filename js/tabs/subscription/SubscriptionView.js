import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import { connect } from 'react-redux';

import AppHeader from '../../common/AppHeader';

class SubscriptionView extends Component {
  render() {
    const filterItem = {
      layout:  'icon',
      icon: require('../../common/img/ic_action_search.png'),
      title: 'Filter',
      // onPress: this.openFilterScreen,
    };
    const leftItem = {
      title: '全部作者'
    };
    const rightItem = {
      title: 'right'
    };

    const content = (
      <View style={styles.container}>
        <AppHeader
          leftItem={leftItem}
          rightItem={filterItem}
          title="Subscription"/>
      </View>
    );

    return content;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#1B3B79',
  }
});

module.exports = connect()(SubscriptionView);
