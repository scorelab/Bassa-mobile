// @flow
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { formatBytes } from '../../helpers/utils';

const QuotaUsageRow = ({ item }) => {
  console.log(item)
  return (
    <View style={styles.rowFront}>
      <View style={styles.rowContainer}>
        <Text style={styles.usernameText}>{item.user_name}</Text>
        <Text style={styles.sizeText}>{formatBytes(item.size)}</Text>
      </View>
    </View>
  );
};

export default QuotaUsageRow;

const styles = StyleSheet.create({
  rowFront: {
    alignItems: 'flex-start',
    backgroundColor: 'white',
    borderBottomColor: 'rgba(50,50,50,0.1)',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 70,
  },
  rowContainer: {
    flex: 1,
    justifyContent: 'space-around',
    paddingRight: 15,
    paddingLeft: 15,
    marginBottom: 3,
  },
  usernameText: {
    fontSize: 17,
    fontWeight: '500',
  },
  sizeText: {
    fontSize: 15,
  },
});
