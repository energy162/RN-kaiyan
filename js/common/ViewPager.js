import React, { Component } from 'react';
import {
  Navigator,
  StyleSheet,
  ScrollView,
  View,
  Text
} from 'react-native';

class ViewPager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      height: 0,
      selectedIndex: this.props.selectedIndex,
      initialSelectedIndex: this.props.selectedIndex,
      scrollingTo: null,
    };

    this.adjustCardSize = this.adjustCardSize.bind(this);
  }

  render() {
    const content = (
      <ScrollView
        ref="scrollview"
        contentOffset={{
          x: this.state.width * this.state.initialSelectedIndex,
          y: 0,
        }}
        style={[styles.scrollview, this.props.style]}
        horizontal={true}
        pagingEnabled={true}
        bounces={!!this.props.bounces}
        scrollsToTop={false}
        // onScroll={this.handleHorizontalScroll}
        scrollEventThrottle={100}
        removeClippedSubviews={true}
        automaticallyAdjustContentInsets={false}
        directionalLockEnabled={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        onLayout={this.adjustCardSize}>
        {this.renderContent()}
      </ScrollView>
    );

    return content;
  }

  adjustCardSize(e) {
    this.setState({
      width: e.nativeEvent.layout.width,
      height: e.nativeEvent.layout.height,
    });
  }

  renderContent() {
    var {width, height} = this.state;
    return React.Children.map(this.props.children, (child, i) => (
      <View style={[{width, height}]} key={'r_' + i}>
        {child}
      </View>
    ));
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollview: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});

module.exports = ViewPager;
