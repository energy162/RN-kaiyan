import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  Text
} from 'react-native';
import { connect } from 'react-redux';

import AppHeader from '../common/AppHeader';
import PureListView from '../common/PureListView';

class FilterScreen extends Component {
  constructor (props) {
    super(props);

    this._innerRef = null;
    this.storeInnerRef = this.storeInnerRef.bind(this);

    this.closeCategoryScreen = this.closeCategoryScreen.bind(this);
  }
  render() {
    const leftItem = {
      layout:  'icon',
      // icon: require('./img/crop_ic_cancel.png'),
      title: 'Close',
      onPress: this.closeCategoryScreen,
    };

    return (
      <View style={styles.container}>
        <AppHeader
          title={'查询'}
          leftItem={leftItem}
          rightItem={null}
        />
        <View style={{height:1,backgroundColor:'black'}} />
      </View>
    );
  }

  closeCategoryScreen () {
    this.props.navigator.pop()
  }

  renderRow(item) {
    return (
      <Image source={{uri:item.data.image}} style={styles[item.data.dataType]}>
        <Text style={styles.title}>
          {item.data.title}
        </Text>
      </Image>
    );
  }

  storeInnerRef(ref) {
    this._innerRef = ref;
  }
}

const SQUARE_WIDTH = Dimensions.get('window').width/2 - 0.8;

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#FFF',
  },
  list: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  RectangleCard: {
    alignItems: 'center',
    justifyContent: 'center',
    height:SQUARE_WIDTH,
    width:Dimensions.get('window').width,
    marginTop: 2,
    backgroundColor:"#ddd"
  },
  SquareCard: {
    width:SQUARE_WIDTH,
    height:SQUARE_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
    backgroundColor: '#ddd',
  },
  title: {
    // paddingRight:5,
    fontWeight:'bold',
    color:"white",
    backgroundColor:'transparent'
  }
});

function select(store) {
  return {
    categories: store.category.categories,
  };
}

module.exports = connect(select)(FilterScreen);
