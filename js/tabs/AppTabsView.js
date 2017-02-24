import React, { Component } from 'react';
import {
  Navigator,
} from 'react-native';
import { connect } from 'react-redux';
import TabBar from 'react-native-xtabbar';
import { switchTab } from '../actions';

import MainView from './selected/MainView';
import DiscoveryView from './discovery/DiscoveryView';
import FollowView from './follow/FollowView';
import ProfileView from './profile/ProfileView';

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
          icon={require('./selected/img/ic_tab_strip_icon_feed.png')}
          selectedIcon={require('./selected/img/ic_tab_strip_icon_feed_selected.png')}
          onPress={this.onTabSelect.bind(this, 'selected')}
          title='精选'>
          <MainView
            navigator={this.props.navigator}
          />
        </TabBar.Item>

        <TabBar.Item
          icon={require('./discovery/img/ic_tab_strip_icon_category.png')}
          selectedIcon={require('./discovery/img/ic_tab_strip_icon_category_selected.png')}
          onPress={this.onTabSelect.bind(this, 'discovery')}
          title='发现'>
          <DiscoveryView
            navigator={this.props.navigator}
          />
        </TabBar.Item>

        <TabBar.Item
          icon={require('./follow/img/ic_tab_strip_icon_follow.png')}
          selectedIcon={require('./follow/img/ic_tab_strip_icon_follow_selected.png')}
          onPress={this.onTabSelect.bind(this, 'follow')}
          title='关注'>
          <FollowView
            navigator={this.props.navigator}
          />
        </TabBar.Item>

        <TabBar.Item
          icon={require('./profile/img/ic_tab_strip_icon_pgc.png')}
          selectedIcon={require('./profile/img/ic_tab_strip_icon_pgc_selected.png')}
          onPress={this.onTabSelect.bind(this, 'profile')}
          title='我的'>
          <ProfileView
            navigator={this.props.navigator}
          />
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
