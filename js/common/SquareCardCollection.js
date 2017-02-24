import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  ScrollView,
  Text
} from 'react-native';

const { width } = Dimensions.get('window');
const SQUARE_WIDTH = 165;

class SquareCardCollection extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <Text style={styles.title}>{this.props.data.header.title}</Text>
          <Image
            source={require('./img/ic_action_down_dark.png')}
            style={styles.HeaderAction}/>
        </View>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          style={styles.body}
          horizontal={true}>
          {this.props.data.itemList.map((item)=>{
            return (
              <Image source={{uri:item.data.image}} style={styles.SquareCard} resizeMode={'stretch'}>
                <Text style={styles.CardTitle}>{item.data.title}</Text>
              </Image>
            )
          })}
        </ScrollView>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  wrapper: {
    height: SQUARE_WIDTH + 64,
    backgroundColor:'rgba(255, 255, 255, 1)',
    marginTop:5,
    paddingBottom:8,
    borderBottomWidth:1,
    borderBottomColor:'rgba(218,218,218,1)',
    width
  },
  header: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  HeaderAction: {
    resizeMode:'stretch',
    position:'absolute',
    height:30,
    width:30,
    right:10,
    top:12
  },
  title:{
    fontWeight:'bold',
    color:"black",
    letterSpacing: 4,
  },
  body: {
    height: SQUARE_WIDTH,
    width
  },
  SquareCard: {
    height: SQUARE_WIDTH,
    width: SQUARE_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft:4,
  },
  CardTitle: {
    fontWeight:'bold',
    color:"white",
    backgroundColor:'transparent'
  },
})

module.exports = SquareCardCollection;
