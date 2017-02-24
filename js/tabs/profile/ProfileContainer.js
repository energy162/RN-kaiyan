import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Animated,
} from 'react-native';
import { connect } from 'react-redux';

import AppHeader from '../../common/AppHeader';

class ProfileContainer extends Component {
  constructor(props) {
    super(props);
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

    const content = React.Children.map(this.props.children, (child, idx) => {
      // segments.push(child.props.title);
      return <View>{
        React.cloneElement(child, {
          // ref: (ref) => { this._refs[idx] = ref; },
          // onScroll: (e) => this.handleScroll(idx, e),
          style: styles.listView,
          showsVerticalScrollIndicator: false,
          scrollEventThrottle: 16,
          contentInset: {bottom: 49, top: 0},
          automaticallyAdjustContentInsets: false,
          // scrollsToTop: idx === this.state.idx,
        })
      }</View>;
    });

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.avataBox}>
            <Image source={require('./img/pgc_default_avatar.png')} style={styles.avata}/>
          </View>
          <Text style={styles.subtitle}>点击登录后可评论</Text>
          <View style={{paddingTop:36,flexDirection: 'row',alignItems: 'center',justifyContent: 'flex-start',}}>
            <View style={{flex:1,alignItems: 'center'}}>
              <Text style={styles.actionText}>收藏</Text>
            </View>
            <View style={{height:20,width:1,backgroundColor:"#111"}} />
            <View style={{flex:1,alignItems: 'center'}}>
              <Text style={styles.actionText}>评论</Text>
            </View>
          </View>
        </View>
        <AppHeader
          leftItem={{}}
          rightItem={rightItem}
          title=""/>
        <View style={{height:187,borderColor:'rgba(218,218,218,1)',borderBottomWidth:1}} />
        {content}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    overflow: 'hidden',
    height: 250,
    backgroundColor:"rgb(248,248,248)",
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
    // borderBottomColor: "#ccc",
  },
  avataBox:{
    height:74,
    width:74,
    borderRadius:37,
    borderColor: "#ccc",
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avata:{
    height:70,
    width:70,
    borderRadius:35,
  },
  subtitle: {
    paddingTop: 14,
    fontSize: 11,
    color: "#555",
  },
  actionText:{
    color: "#555",
    fontSize: 13,
  },
  listView:{

  },
});

module.exports = ProfileContainer;
