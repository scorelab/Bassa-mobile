// @flow
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import ProgressCircle from 'react-native-progress-circle';

import { theme } from '../../styles';

const InProgressDownloadsRowFront = ({ rowData }) => {
  return (
    <View style={styles.rowFront}>
      <View style={styles.rowContainer}>
        <View>
          <ProgressCircle
            percent={rowData.item.progress}
            radius={30}
            borderWidth={5}
            color={theme.PRIMARY_COLOR}
            shadowColor={'#999'}
            bgColor={'white'}
          >
            <Text style={styles.percentageText}>{`${rowData.item.progress}%`}</Text>
          </ProgressCircle>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.downloadText}>{rowData.item.download_name.length > 30 ? `${rowData.item.download_name.substring(0, 30)}\n${rowData.item.download_name.substring(30)}` : rowData.item.download_name}</Text>
        </View>
      </View>
    </View>
  );
};


export default InProgressDownloadsRowFront;

const styles = StyleSheet.create({
  rowFront: {
    backgroundColor: 'white',
    flex: 1,
    borderBottomColor: 'rgba(50,50,50,0.1)',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 80,
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 15,
    paddingLeft: 15,
  },
  infoContainer: {
    justifyContent: 'flex-start',
    paddingLeft: 15,
    alignItems: 'center',
  },
  downloadText: {
    fontSize: 16,
    fontWeight: '500',
  },
  percentageText: {
    fontSize: 15,
  },
});
