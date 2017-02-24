import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Dimensions,
  Easing,
  Animated
} from 'react-native';
import { connect } from 'react-redux';

import Modal from 'react-native-root-modal';
import AppHeader from '../../common/AppHeader';
import DiscoverListView from './DiscoverListView';

import { loadCategory } from '../../actions';

class DiscoveryView extends Component {
  constructor(props) {
    super(props);

    this.state = {
        visible: false,
        scale: new Animated.Value(1),
        y: new Animated.Value(0)
    };

    this.openAllCategoryScreen = this.openAllCategoryScreen.bind(this);
    this.openFilterScreen = this.openFilterScreen.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(loadCategory());
  }

  render() {
    const filterItem = {
      layout:  'icon',
      icon: require('../../common/img/ic_action_search.png'),
      title: 'Filter',
      onPress: this.openFilterScreen,
    };
    const leftItem = {
      title: '全部分类',
      onPress: this.openAllCategoryScreen,
    };
    const rightItem = {
      title: 'right'
    };

    return (
      <View style={styles.container}>
        <AppHeader
          leftItem={leftItem}
          rightItem={filterItem}
          title="Discover"/>
        <View style={{height:1,backgroundColor:'rgba(218,218,218,1)'}} />
        <DiscoverListView />
        <Animated.Modal
          ref='modal'
          visible={this.state.visible}
          style={[styles.modal, {
              transform: [
                  {
                      scale: this.state.scale
                  },
                  {
                      translateY: this.state.y
                  }
              ]
            }]}>
            <TouchableHighlight
              style={[styles.button, styles.close]}
              underlayColor="#aaa"
              onPress={this.hideModal}>
              <Text>Close</Text>
            </TouchableHighlight>

            <View style={styles.modalContainer}>
              <Text style={styles.text}>You can set any animation on Modal element</Text>
            </View>
        </Animated.Modal>
      </View>
    );
  }

  openAllCategoryScreen() {
    this.props.navigator.push({ allCategory: true });
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
  },
  modal: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.8)'
  },
  button: {
      backgroundColor: '#ccc',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10
  },
  close: {
      position: 'absolute',
      right: 20,
      top: 40,
      backgroundColor: 'red'
  },
  modalContainer: {
      height: 100,
      width: 200,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'blue'
  },
  text: {
      color: '#fff'
  }
});

function select(store) {
  return {
    datalist: store.discovery.datalist,
    nextPageUrl: store.discovery.nextPageUrl,
  };
}

module.exports = connect(select)(DiscoveryView);
