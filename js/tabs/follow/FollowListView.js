import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ListView,
  Dimensions,
  Text
} from 'react-native';
import { connect } from 'react-redux';
import { loadFollow } from '../../actions';

import VideoCollectionOfHorizontalScrollCard from '../../common/VideoCollectionOfHorizontalScrollCard'
import VideoCollectionWithBrief from '../../common/VideoCollectionWithBrief'


const defaultOnEndReachedThreshold = 150

const LIST_VIEW_PAGE_SIZE = 6;

class FollowListView extends Component {
  static defaultProps = {
    data: [],
    contentInset: { top: 0, bottom: 0 },
    // TODO: This has to be scrollview height + fake header
    minContentHeight: Dimensions.get('window').height + 20,
    renderSeparator: (sectionID, rowID) => <View style={styles.separator} key={rowID} />,
  };

  constructor(props) {
    super(props)

    let dataSource = new ListView.DataSource({
      getRowData: (dataBlob, sid, rid) => dataBlob[sid][rid],
      getSectionHeaderData: (dataBlob, sid) => dataBlob[sid],
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    });
    this.state = {
      contentHeight: 0,
      dataSource: cloneWithData(dataSource, props.datalist),
    };

    this.renderFooter = this.renderFooter.bind(this);
    this.onContentSizeChange = this.onContentSizeChange.bind(this);
    this.onEndReached = this.onEndReached.bind(this);
  }

  componentWillReceiveProps(nextProps) {
      let dataSource = new ListView.DataSource({
        getRowData: (dataBlob, sid, rid) => dataBlob[sid][rid],
        getSectionHeaderData: (dataBlob, sid) => dataBlob[sid],
        rowHasChanged: (row1, row2) => row1 !== row2,
        sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
      });

      this.state = {
        dataSource: cloneWithData(dataSource, nextProps.datalist)
      }
  }

  render() {
    const {contentInset} = this.props;
    const bottom = contentInset.bottom +
      Math.max(0, this.props.minContentHeight - this.state.contentHeight);

    return (
      <ListView
        initialListSize={10}
        pageSize={LIST_VIEW_PAGE_SIZE}
        ref="listview"
        dataSource={this.state.dataSource}
        contentInset={{bottom, top: contentInset.top}}
        onContentSizeChange={this.onContentSizeChange}
        renderRow={this.renderRow}
        contentContainerStyle={styles.list}
        removeClippedSubviews={false}
        enableEmptySections={true}
        renderSeparator={()=>{}}
        automaticallyAdjustContentInsets={false}
        renderFooter={this.renderFooter}
        onEndReachedThreshold={defaultOnEndReachedThreshold}
        onEndReached={this.onEndReached}
        {...this.props}/>

    );
  }

  renderRow(item) {
    switch (item.type) {
      case 'videoCollectionWithBrief':
        return (
          <VideoCollectionWithBrief data={item.data} />
        )
        break;
      case 'videoCollectionOfHorizontalScrollCard':
        return (
          <VideoCollectionOfHorizontalScrollCard data={item.data} />
        )
        break;
      default:
        return null;
        break;
    }
  }

  onEndReached() {
    if(this.props.nextPageUrl){
      this.props.dispatch(loadFollow(this.props.nextPageUrl));
    }
  }

  onContentSizeChange(contentWidth, contentHeight) {
    if (contentHeight !== this.state.contentHeight) {
      this.setState({contentHeight});
    }
  }

  scrollTo(...args) {
    this.refs.listview.scrollTo(...args);
  }

  renderFooter() {
    if (this.state.dataSource.getRowCount() === 0) {
      return this.props.renderEmptyList && this.props.renderEmptyList();
    }

    // return this.props.renderFooter && this.props.renderFooter();
    return (
      <View style={styles.footer}>
        <Text style={{fontFamily: 'Lobster 1.4',}}>{'-The End-'}</Text>
      </View>
    )
  }

}

function cloneWithData(dataSource, data) {
  if (!data) {
    return dataSource.cloneWithRows([]);
  }
  if (Array.isArray(data)) {
    return dataSource.cloneWithRows(data);
  }
  return dataSource.cloneWithRowsAndSections(data);
}

const styles = StyleSheet.create({
  list: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(234, 234, 234, 1)'
  },
  footer:{
    justifyContent: 'center',
    alignItems: 'center',
    height:100,
    width:Dimensions.get('window').width,
    backgroundColor:'#FFF'
  },
  separator: {
    backgroundColor: '#eeeeee',
    height: 1,
  },
});

function select(store) {
  return {
    datalist: store.follow.datalist,
    nextPageUrl: store.follow.nextPageUrl,
  };
}

module.exports = connect(select)(FollowListView);
