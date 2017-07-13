import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';
import styles from './styles';

export default class JSX extends Component {
  render() {
    return(
      <View style={styles.container}>
        <Text style={styles.customProp2}>hello biach</Text>
      </View>
    );
  }
}
