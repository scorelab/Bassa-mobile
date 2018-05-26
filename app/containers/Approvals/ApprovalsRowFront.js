// @flow
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

const ApprovalsRowFront = ({ rowData, rowMap, }) => {
  return (
    <View style={styles.rowFront}>
      <View style={styles.rowContainer}>
        <Text style={styles.usernameText}>{rowData.item.user_name}</Text>
        <Text style={styles.emailText}>{rowData.item.email}</Text>
      </View>
    </View>
  );
};


export default ApprovalsRowFront;

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
  emailText: {
    fontSize: 15,
  },
});
