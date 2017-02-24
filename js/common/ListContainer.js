import React, { Component } from 'react';
import {
  NativeModules,
  Dimensions,
  Animated,
  StyleSheet,
  View,
  Image,
  Text
} from 'react-native';

import AppHeader from './AppHeader';
import ParallaxBackground from './ParallaxBackground';
import ViewPager from './ViewPager';

const EMPTY_CELL_HEIGHT = Dimensions.get('window').height > 600 ? 150 : 100;

class ListContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      idx: this.props.selectedSegment || 0,
      anim: new Animated.Value(0),
      stickyHeaderHeight: 0,
    };

    this.renderFakeHeader = this.renderFakeHeader.bind(this);
    this.handleStickyHeaderLayout = this.handleStickyHeaderLayout.bind(this);
    this._refs = [];
  }

  render() {
    const content = React.Children.map(this.props.children, (child, idx) => {
      // segments.push(child.props.title);
      return <View>{
        React.cloneElement(child, {
          ref: (ref) => { this._refs[idx] = ref; },
          onScroll: (e) => this.handleScroll(idx, e),
          style: styles.listView,
          showsVerticalScrollIndicator: false,
          scrollEventThrottle: 16,
          contentInset: {bottom: 49, top: 0},
          automaticallyAdjustContentInsets: false,
          renderHeader: this.renderFakeHeader,
          scrollsToTop: idx === this.state.idx,
        })
      }</View>;
    });

    let {stickyHeader} = this.props;

    const backgroundShift = 0;

    return (
      <View style={styles.container}>
        <View style={styles.headerWrapper}>
          <ParallaxBackground
            minHeight={this.state.stickyHeaderHeight + AppHeader.height}
            maxHeight={EMPTY_CELL_HEIGHT + this.state.stickyHeaderHeight + AppHeader.height}
            offset={this.state.anim}
            backgroundImage={this.props.backgroundImage}
            backgroundShift={backgroundShift}
            backgroundColor={this.props.backgroundColor}>
            {this.renderParallaxContent()}
          </ParallaxBackground>
          <AppHeader
            title={this.props.title}
            leftItem={this.props.leftItem}
            rightItem={this.props.rightItem}>
            {this.renderHeaderTitle()}
          </AppHeader>
          {this.renderFixedStickyHeader()}
        </View>
        <ViewPager
          selectedIndex={this.state.idx}>
          {content}
        </ViewPager>
        {this.renderFloatingStickyHeader()}
      </View>
    );
  }

  renderParallaxContent() {
    if (this.props.parallaxContent) {
      return this.props.parallaxContent;
    }
    return (
      <Image
        source={require('../tabs/selected/img/home_page_header_icon.png')}
        style={{width: 140, height: 140}}
      />
    );
    return (
      <Text style={styles.parallaxText}>
        {this.props.title}
      </Text>
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (!NativeModules.AppScrolling) {
      return;
    }

    if (this.state.idx !== prevState.idx ||
        this.state.stickyHeaderHeight !== prevState.stickyHeaderHeight) {
      var distance = EMPTY_CELL_HEIGHT - this.state.stickyHeaderHeight;

      if (this._refs[prevState.idx] && this._refs[prevState.idx].getScrollResponder) {
        const oldScrollViewTag = ReactNative.findNodeHandle(
          this._refs[prevState.idx].getScrollResponder()
        );
        NativeModules.AppScrolling.unpin(oldScrollViewTag);
      }

      if (this._refs[this.state.idx] && this._refs[this.state.idx].getScrollResponder) {
        const newScrollViewTag = ReactNative.findNodeHandle(
          this._refs[this.state.idx].getScrollResponder()
        );
        const pinnedViewTag = ReactNative.findNodeHandle(this._pinned);
        NativeModules.AppScrolling.pin(newScrollViewTag, pinnedViewTag, distance);
      }
    }
  }

  renderHeaderTitle() {
    var transform;
    if (!this.props.parallaxContent) {
      var distance = EMPTY_CELL_HEIGHT - this.state.stickyHeaderHeight;
      transform = {
        opacity: this.state.anim.interpolate({
          inputRange: [distance - 20, distance],
          outputRange: [0, 1],
          extrapolate: 'clamp',
        })
      };
    }
    return (
      <Animated.Text style={[styles.headerTitle, transform]}>
        {this.props.title}
      </Animated.Text>
    );
  }

  handleScroll(idx, e) {
    if (idx !== this.state.idx) {
      return;
    }
    let y = 0;
    // if (Platform.OS === 'ios') {
      this.state.anim.setValue(e.nativeEvent.contentOffset.y);
      const height = EMPTY_CELL_HEIGHT - this.state.stickyHeaderHeight;
      y = Math.min(e.nativeEvent.contentOffset.y, height);
    // }
    this._refs.forEach((ref, ii) => {
      if (ii !== idx && ref) {
        ref.scrollTo && ref.scrollTo({y, animated: false});
      }
    });
  }

  renderFakeHeader() {
    // if (Platform.OS === 'ios') {
      const height = EMPTY_CELL_HEIGHT - this.state.stickyHeaderHeight;
      return (
        <View style={{height}} />
      );
    // }
  }

  renderFixedStickyHeader() {
    <View style={{height: this.state.stickyHeaderHeight, backgroundColor:"black"}} />
  }

  renderFloatingStickyHeader() {
    var opacity = this.state.stickyHeaderHeight === 0 ? 0 : 1;
    var transform;

    // If native pinning is not available, fallback to Animated
    if (!NativeModules.AppScrolling) {
      var distance = EMPTY_CELL_HEIGHT - this.state.stickyHeaderHeight;
      var translateY = this.state.anim.interpolate({
        inputRange: [0, distance],
        outputRange: [distance, 0],
        extrapolateRight: 'clamp',
      });
      transform = [{translateY}];
    }

    return (
      <Animated.View
        ref={(ref) => { this._pinned = ref; }}
        onLayout={this.handleStickyHeaderLayout}
        style={[styles.stickyHeader, {opacity}, {transform}]}>
      </Animated.View>
    );
  }

  handleStickyHeaderLayout({nativeEvent: { layout: {x, y, width, height}}}) {
    this.setState({stickyHeaderHeight: height});
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerWrapper: {
      backgroundColor: '#bbb',
    // android: {
    //   elevation: 2,
    //   backgroundColor: 'transparent',
    //   // FIXME: elevation doesn't seem to work without setting border
    //   borderRightWidth: 1,
    //   marginRight: -1,
    //   borderRightColor: 'transparent',
    // }
  },
})

module.exports = ListContainer;
