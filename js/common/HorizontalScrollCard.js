import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  Text
} from 'react-native';

import Swiper from 'react-native-swiper'

const { width } = Dimensions.get('window')

class HorizontalScrollCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Swiper style={styles.wrapper} height={200} horizontal={true} activeDotColor={'white'} autoplay>
        {
          this.props.data.itemList.map((item)=>{
            return (
                <Image source={{uri:item.data.image}} style={styles.image} />
            )
          })
        }
      </Swiper>
    );
  }
}

var styles = StyleSheet.create({
  wrapper: {
  },

  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },

  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },

  image: {
    width,
    flex: 1
  }
})

module.exports = HorizontalScrollCard;
