// @flow
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Ionicons';

import { theme } from '../../styles';

const ApprovalsRowBack = ({ rowData, rowMap, onPress }) => (
  <View style={styles.rowBack}>
    <View />
    <View style={[styles.quickActionButtonsBox, styles.rightQuickPanel]}>
      <TouchableOpacity style={[styles.quickActionButtons, styles.btnApprove]}
        onPress={onPress}>
        <Icon name='md-checkmark' size={20} color='#FFFFFF' />
        <Text style={styles.quickActionButtonText}>Approve</Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default ApprovalsRowBack;

const styles = StyleSheet.create({
  rowBack: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#eaeaea',
  },
  quickActionButtonsBox: {
    width: 75,
    justifyContent: 'center',
    backgroundColor: '#d8d8d8',
  },
  quickActionButtons: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnApprove: {
    backgroundColor: theme.PRIMARY_COLOR,
  },
  quickActionButtonText: {
    color: '#fff',
    fontWeight: '500',
  },
  rightQuickPanel: {
    flexDirection: 'row',
    width: 75,
  },
});
