// @flow
import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Ionicons';

import { theme } from '../../styles';

const InProgressDownloadsRowBack = ({ onPress }) => (
  <View style={styles.rowBack}>
    <View />
    <View style={[styles.quickActionButtonsBox, styles.rightQuickPanel]}>
      <TouchableOpacity style={[styles.quickActionButtons, styles.btnDelete]}
        onPress={onPress}>
        <Icon name='md-trash' size={30} color='#FFFFFF' />
      </TouchableOpacity>
    </View>
  </View>
);

export default InProgressDownloadsRowBack;

const styles = StyleSheet.create({
  rowBack: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#eaeaea',
  },
  quickActionButtonsBox: {
    width: 55,
    justifyContent: 'center',
    backgroundColor: '#d8d8d8',
  },
  quickActionButtons: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnDelete: {
    backgroundColor: '#FF3B30',
  },
  quickActionButtonText: {
    color: '#fff',
    fontWeight: '500',
  },
  rightQuickPanel: {
    flexDirection: 'row',
    width: 55,
  },
});
