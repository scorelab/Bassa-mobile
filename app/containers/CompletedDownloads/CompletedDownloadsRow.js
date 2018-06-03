// @flow
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import moment from 'moment';
import TimeAgo from 'react-native-timeago';

import { theme } from '../../styles';
import { formatBytes } from '../../helpers/utils';

const CompletedDownloadsRow = ({ item }) => {
  return (
    <View style={styles.rowFront}>
      <View style={styles.rowContainer}>
        <View style={styles.innerRowContainer}>
          <Text style={styles.downloadText}>{item.download_name.length > 30 ? `${item.download_name.substring(0, 25)}...` : item.download_name}</Text>
          <Text style={styles.timesAgoText}><TimeAgo time={moment.unix(item.completed_time)} /></Text>
        </View>
        <Text style={styles.usernameText}>By {item.user_name}</Text>
        <Text style={styles.sizeText}>{formatBytes(Number(item.size))}</Text>
      </View>
    </View>
  );
};


export default CompletedDownloadsRow;

const styles = StyleSheet.create({
  rowFront: {
    backgroundColor: 'white',
    borderBottomColor: 'rgba(50,50,50,0.1)',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 85,
  },
  rowContainer: {
    flex: 1,
    justifyContent: 'space-around',
    paddingRight: 15,
    paddingLeft: 15,
    paddingBottom: 10,
  },
  innerRowContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  downloadText: {
    fontSize: 17,
    fontWeight: '500',
  },
  usernameText: {
    fontSize: 15,
  },
  sizeText: {
    fontSize: 14,
    paddingTop: 5,
  },
  timesAgoText: {
    fontSize: 13,
    fontWeight: '300',
  },
});
