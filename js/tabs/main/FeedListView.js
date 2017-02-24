import React, { Component } from 'react';
import {
  Navigator,
  StyleSheet,
  View,
  Text
} from 'react-native';
import PureListView from '../../common/PureListView';

class FeedListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feed: [
        1,2,3,4,5,6,7,8,9,10,11,12,13
      ],
    }

    this._innerRef = null;

    this.storeInnerRef = this.storeInnerRef.bind(this);
  }

  render() {
    const content = (
      <PureListView
        ref={this.storeInnerRef}
        data={this.state.feed}
        renderRow={this.renderRow}
        {...this.props}
      />
    );

    // const content = null;
    return content;
  }

  renderRow() {
    return (
      <View style={{height:50}}>
        <Text>
          session
        </Text>
      </View>
    );
  }

  storeInnerRef(ref) {
    this._innerRef = ref;
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

module.exports = FeedListView;
