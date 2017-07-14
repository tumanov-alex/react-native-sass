import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';
import styles from './styles';

export default class JSX extends Component {
  render() {
    return(
      <View
        style={styles.container}
        onPress={() => console.log('suka')}
      >
        <Text style={styles.customProp2}>hello biach</Text>

        <View style={styles.customProp}>
          <Text style={styles.customProp2}>222</Text>
        </View>

        <Text>soochka</Text>
      </View>
    );
  }
}
