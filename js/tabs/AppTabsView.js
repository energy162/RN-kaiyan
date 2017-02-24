import React, { Component } from 'react';
import {
  Navigator,
} from 'react-native';
import { connect } from 'react-redux';
import TabBar from 'react-native-xtabbar';
import { switchTab } from '../actions';

import MainView from './main/MainView';
import SubscriptionView from './subscription/SubscriptionView';
import DiscoverView from './discover/DiscoverView';

class AppTabsView extends Component {
  render() {
    return (
      <TabBar
        style={{}}
        navFontSize={11}
        navTextColor={'#929292'}
        navTextColorSelected={'black'}
        onItemSelected={(index) => {}}>
        <TabBar.Item
          icon={require('./main/img/ic_tab_strip_icon_feed.png')}
          selectedIcon={require('./main/img/ic_tab_strip_icon_feed_selected.png')}
          onPress={this.onTabSelect.bind(this, 'main')}
          title='精选'>
          <MainView
            navigator={this.props.navigator}
          />
        </TabBar.Item>

        <TabBar.Item
          icon={require('./discover/img/ic_tab_strip_icon_category.png')}
          selectedIcon={require('./discover/img/ic_tab_strip_icon_category_selected.png')}
          onPress={this.onTabSelect.bind(this, 'discover')}
          title='发现'>
          <DiscoverView
            navigator={this.props.navigator}
          />
        </TabBar.Item>

        <TabBar.Item
          icon={require('./subscription/img/ic_tab_strip_icon_follow.png')}
          selectedIcon={require('./subscription/img/ic_tab_strip_icon_follow_selected.png')}
          onPress={this.onTabSelect.bind(this, 'follow')}
          title='关注'>
          <SubscriptionView
            navigator={this.props.navigator}
          />
        </TabBar.Item>

        <TabBar.Item
          icon={require('./profile/img/ic_tab_strip_icon_pgc.png')}
          selectedIcon={require('./profile/img/ic_tab_strip_icon_pgc_selected.png')}
          onPress={this.onTabSelect.bind(this, 'profile')}
          title='我的'>
        </TabBar.Item>
      </TabBar>
    );
  }

  onTabSelect(tab) {
    if (this.props.tab !== tab) {
      this.props.onTabSelect(tab);
    }
  }
}

function select(store) {
  return {
    // tab: store.navigation.tab,
  };
}

function actions(dispatch) {
  return {
    onTabSelect: (tab) => dispatch(switchTab(tab)),
  };
}

// module.exports = connect()(AppTabsView);
module.exports = connect(select, actions)(AppTabsView);
