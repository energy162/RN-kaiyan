import React, { Component } from 'react';
import {
  Navigator,
  View,
  Text
} from 'react-native';
import { connect } from 'react-redux';

import ListContainer from '../../common/ListContainer';
import FeedListView from './FeedListView';

class MainView extends Component {
  render() {
    const leftItem = {
    };
    const filterItem = {
      layout:  'icon',
      icon: require('./img/ic_action_search_white.png'),
      title: 'Filter',
      // onPress: this.openFilterScreen,
    };

    const content = (
      <ListContainer
        title="main"
        backgroundImage={require('./img/home_page_header_cover.jpg')}
        backgroundColor="transparent"
        leftItem={leftItem}
        rightItem={filterItem}>
        <FeedListView
          navigator={this.props.navigator}
        />
      </ListContainer>
    );

    return content;
  }
}

module.exports = connect()(MainView);
