import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  ScrollView,
  Text
} from 'react-native';

import Swiper from 'react-native-swiper'

const { width } = Dimensions.get('window');
const COVER_HEIGHT = 185;

class VideoCollectionOfHorizontalScrollCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <Text style={styles.title}>{this.props.data.header.title}</Text>
          <Text style={styles.subTitle}>{this.props.data.header.subTitle}</Text>
          <View style={styles.HeaderAction}>
            <Text style={{fontSize:11}}>{'+ 关 注'}</Text>
          </View>
        </View>
        <View style={styles.body}>
          <Swiper horizontal={true}
            width={Dimensions.get('window').width - 36}
            height={270}
            style={{overflow:'visible'}}
            dot={<View style={{backgroundColor:'rgba(0,0,0,.2)', width: 6, height: 6,borderRadius: 3, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />}
            activeDot={<View style={{backgroundColor: 'black', width: 6, height: 6, borderRadius: 3, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />}
            paginationStyle={{bottom:0}}>
            {
              this.props.data.itemList.map((item)=>{
                return (
                  <View style={[styles.video]}>
                    <Image style={[styles.cover]}
                      source={{uri:item.data.cover.feed}}/>
                    <Text style={styles.videoTitle}>{item.data.title}</Text>
                    <Text style={styles.videoInfo}>{'#' + item.data.category + ' / ' + item.data.duration}</Text>
                  </View>
                )
              })
            }
          </Swiper>
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  wrapper: {
    backgroundColor:'rgba(255, 255, 255, 1)',
    marginTop:5,
    paddingBottom:8,
    borderBottomWidth:1,
    borderBottomColor:'rgba(218,218,218,1)',
    width
  },
  header: {
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  HeaderAction: {
    alignItems: 'center',
    justifyContent: 'center',
    position:'absolute',
    height:24,
    width:50,
    right:16,
    top:20,
    borderRadius: 4,
    borderColor: 'rgb(133,133,133)',
    borderWidth: 1,
  },
  title:{
    fontWeight:'bold',
    color:"rgb(54,54,54)",
    letterSpacing: 4,
    fontSize: 16,
  },
  subTitle:{
    color:"rgb(171,171,171)",
    fontSize: 12,
    paddingTop: 10,
  },
  body:{
    alignItems: 'center',
    width
  },
  video:{
    height:COVER_HEIGHT+100,
    alignItems: 'center',
    paddingLeft:2,
    paddingRight:2,
  },
  cover: {
    height: COVER_HEIGHT,
    width: Dimensions.get('window').width - 40,
  },
  videoTitle:{
    fontWeight:'bold',
    marginTop:20,
    color:"rgb(54,54,54)",
  },
  videoInfo:{
    marginTop:5,
    fontSize: 12,
    color:"rgb(171,171,171)",
  },
})

module.exports = VideoCollectionOfHorizontalScrollCard;
