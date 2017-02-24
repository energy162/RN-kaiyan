import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  ScrollView,
  Text
} from 'react-native';

import { cutstr } from './function';

const { width } = Dimensions.get('window');
const SQUARE_WIDTH = 165;

class VideoCollectionWithBrief extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <Image source={{uri:this.props.data.header.icon}} style={styles.icon} />
          <View style={{flex:1}}>
            <Text style={styles.title}>{this.props.data.header.title}</Text>
            <Text style={styles.description}>{cutstr(this.props.data.header.description,36,'…')}</Text>
          </View>
          <View style={styles.HeaderAction}>
            <Text style={{fontSize:11}}>{'+ 关 注'}</Text>
          </View>
        </View>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          style={styles.body}
          horizontal={true}>
          {this.props.data.itemList.map((item)=>{
            return (
              <View style={styles.ItemCollection}>
                <Image
                  source={{uri:item.data.cover.feed}}
                  style={styles.ItemCover}/>
                <Text style={styles.ItemTitle}>{item.data.title}</Text>
                <Text style={styles.ItemSubTitle}>{'#' + item.data.category + ' / ' + item.data.duration}</Text>
              </View>
            )
          })}
        </ScrollView>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  wrapper: {
    height: 280,
    backgroundColor:'rgba(255, 255, 255, 1)',
    paddingBottom:8,
    paddingLeft:10,
    borderBottomWidth:1,
    borderBottomColor:'rgba(218,218,218,1)',
    width
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 70,
  },
  icon: {
    width:40,
    height:40,
    borderRadius: 20,
    marginRight:10,
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
    fontSize: 14,
  },
  description:{
    color:"rgb(171,171,171)",
    fontSize: 12,
    paddingTop: 6,
  },
  body: {
    width
  },
  ItemCollection:{
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: 260,
    height: 200,
    // backgroundColor: 'yellow',
    marginRight: 3,
  },
  ItemCover: {
    width: 260,
    height: 150,
    resizeMode: Image.resizeMode.cover,
  },
  ItemTitle: {
    fontWeight:'bold',
    color:"rgb(54,54,54)",
    fontSize: 14,
    paddingTop: 8,
    paddingLeft: 6,
  },
  ItemSubTitle: {
    color:"rgb(171,171,171)",
    fontSize: 12,
    paddingTop: 6,
    paddingLeft: 6,
  },
  CardTitle: {
    fontWeight:'bold',
    color:"white",
    backgroundColor:'transparent'
  },
})

module.exports = VideoCollectionWithBrief;
