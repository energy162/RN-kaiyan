import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Animated,
} from 'react-native';
import { connect } from 'react-redux';

import PureListView from '../../common/PureListView';
import ProfileContainer from './ProfileContainer';

class ProfileView extends Component {
  constructor(props) {
    super(props);

    this.state = {
        item: [{title:'我的消息',},{title:'我的关注',},
          {title:'我的缓存',},{title:'功能开关',},
          {title:'我要投稿',},{title:'意见反馈',}]
    };

    this.renderRow = this.renderRow.bind(this);
  }

  componentDidMount() {
    // this.props.dispatch(loadCategory());
  }

  render() {
    const rightItem = {
      layout:  'icon',
      icon: require('./img/ic_menu_more.png'),
      title: 'More',
      // onPress: this.openFilterScreen,
    };

    return (
      <ProfileContainer>
        <PureListView
          // contentContainerStyle={}
          data={this.state.item}
          renderSeparator={()=>{}}
          enableEmptySections={true}
          removeClippedSubviews={false}
          renderRow={this.renderRow}/>
      </ProfileContainer>
    );
  }

  renderRow(item) {
    return (
      <View style={{height:80, alignItems:'center',justifyContent: 'flex-end'}}>
        <Text>session</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});

module.exports = ProfileView;
