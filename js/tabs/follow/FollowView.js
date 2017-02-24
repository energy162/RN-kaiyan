import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Animated,
} from 'react-native';
import { connect } from 'react-redux';

import AppHeader from '../../common/AppHeader';
import FollowListView from './FollowListView';

class FollowView extends Component {
  constructor(props) {
    super(props);

    this.state = {
        visible: false,
        scale: new Animated.Value(1),
        y: new Animated.Value(0)
    };

    // this.openAllCategoryScreen = this.openAllCategoryScreen.bind(this);
    // this.openFilterScreen = this.openFilterScreen.bind(this);
  }

  componentDidMount() {
    // this.props.dispatch(loadCategory());
  }

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
        <View style={{height:1,backgroundColor:'rgba(218,218,218,1)'}} />
        <FollowListView />
      </View>
    );

    return content;
  }

  openFilterScreen() {
    this.state.y.setValue(640);
    this.state.scale.setValue(1);
    Animated.timing(this.state.y, {
      easing: Easing.linear,
      toValue: 0
    }).start();
    this.setState({
      visible: true
    });
    this.slide = true;
    // this.slideModal.bind(this);
    // this.props.navigator.push({ filter: true });
  }

  hideModal = () => {
      if (this.slide) {
          Animated.timing(this.state.y, {
              toValue: 640
          }).start(() => {
              this.setState({
                  visible: false
              });
          });
      } else {
          Animated.timing(this.state.scale, {
              toValue: 0
          }).start(() => {
              this.setState({
                  visible: false
              });
          });
      }

  };

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  }
});

module.exports = connect()(FollowView);
