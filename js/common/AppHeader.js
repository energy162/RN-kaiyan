import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text
} from 'react-native';

class AppHeader extends Component {
  constructor() {
    super();
  }
  render() {
    const {leftItem, title, rightItem} = this.props;
    const titleColor = 'black';
    const itemsColor = 'black';

    const content = React.Children.count(this.props.children) === 0
      ? <Text style={[styles.titleText]}>{title}</Text>
      : this.props.children;

    // const content = null;

    return (
      <View style={[styles.header, this.props.style]}>
        <View style={styles.leftItem}>
          <ItemWrapper color={itemsColor} item={leftItem}/>
        </View>
        <View
          style={styles.centerItem}>
          {content}
        </View>
        <View style={styles.rightItem}>
          <ItemWrapper color={itemsColor} item={rightItem}/>
        </View>
      </View>
    );
  }
}

class ItemWrapper extends Component {
  render() {
    const {item, color} = this.props;
    if (!item) {
      return null;
    }

    const {title, icon, layout, onPress} = item;

    let content;
    if ( layout !== 'icon' && title) {
      content = (
        <Text style={[styles.itemText, {color}]}>{title}</Text>
      );
    } else if (icon) {
      content = <Image source={icon} style={{width: 40, height: 40}}/>;
    }

    return (
      <TouchableOpacity
        onPress={onPress}
        style={styles.itemWrapper}>
        {content}
      </TouchableOpacity>
    );
  }
}

var STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : 25;
var HEADER_HEIGHT = Platform.OS === 'ios' ? 44 + STATUS_BAR_HEIGHT : 56 + STATUS_BAR_HEIGHT;

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'transparent',
    paddingTop: STATUS_BAR_HEIGHT,
    height: HEADER_HEIGHT,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    fontFamily: 'Lobster 1.4',
  },
  leftItem: {
    flex: 1,
    alignItems: 'flex-start',
  },
  centerItem: {
    flex: 2,
    alignItems: 'center',
  },
  rightItem: {
    flex: 1,
    alignItems: 'flex-end',
  },
  itemWrapper: {
    padding: 11,
  },
  itemText: {
    // letterSpacing: 1,
    fontFamily:"FZLanTingHeiS-L-GB",
    fontSize: 13,
    color: 'black',
  },
});

const Header = AppHeader;
Header.height = HEADER_HEIGHT;

module.exports = Header;
