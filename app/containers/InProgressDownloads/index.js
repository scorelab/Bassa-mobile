// @flow
import React, { Component } from 'react';
import {
  StyleSheet,
  RefreshControl,
  Text,
  Dimensions,
  Alert,
  StatusBar,
  View,
} from 'react-native';

import io from 'socket.io-client';
import Icon from 'react-native-vector-icons/Ionicons';
import { SwipeListView } from 'react-native-swipe-list-view';
import PropTypes from 'prop-types';
import Toast from 'react-native-easy-toast';
import { connect } from 'react-redux';

import InProgressDownloadsRowFront from './InProgressDownloadsRowFront';
import DownloadService from '../../services/downloadService';
import { theme } from '../../styles';
import APIConstants from '../../constants/API';
import InProgressDownloadsRowBack from './InProgressDownloadsRowBack';

const HEIGHT: number = Dimensions.get('window').height;
const WIDTH: number = Dimensions.get('window').width;

class InProgressDownloads extends Component {
  static navigationOptions = {
    title: 'Downloads',
    tabBarLabel: 'In Progress',
  }

  static propTypes = {
    navigation: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      isRefreshing: false,
      activeDownloads: [],
    };
    this.socket = io(`${APIConstants.HOST_URL}:${APIConstants.HOST_PORT}/progress`);

    this.socket.on('connect', () => {
      this.socket.emit('join', { room: this.props.user.currentUser.username });
    });
    this.toastRef = React.createRef();
    this.fetchActiveDownloads = this.fetchActiveDownloads.bind(this);
    this.onDownloadRemove = this.onDownloadRemove.bind(this);
    this.onDownloadRemoveTapped = this.onDownloadRemoveTapped.bind(this);
    this.setupSocketConnection = this.setupSocketConnection.bind(this);
  }

  componentDidMount() {
    this.fetchActiveDownloads();
    this.setupSocketConnection();
  }

  componentWillUnmount() {
    if (this.socket !== null) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  renderPlaceholder() {
    return (
      <View pointerEvents={'box-none'} style={styles.placeholderContainer}>
        <Icon name="md-sad" size={45} color={'grey'} />
        <Text style={styles.placeholderText}>No active downloads</Text>
      </View>
    );
  }

  setupSocketConnection() {
    this.socket.on('status', (data) => {
      const { activeDownloads } = this.state;
      activeDownloads.forEach((download, index) => {
        if (download.id === data.id) {
          activeDownloads[index].progress = data.progress;
        }
      });
      this.setState({ activeDownloads });
    });
  }

  async fetchActiveDownloads() {
    this.setState({ isRefreshing: true });
    try {
      const response = await DownloadService.getDownloadsForUser();
      const activeDownloads = response.data
        .filter(download => download.status === 0)
        .map(download => ({
          ...download,
          progress: 0,
        }));
      this.setState({ activeDownloads, isRefreshing: false });
    } catch (error) {
      Alert.alert('Error', 'An error occured while fetching active downloads');
    }
  }

  async onDownloadRemove(rowData, rowMap) {
    rowMap[rowData.index].closeRow();
    try {
      await DownloadService.removeDownload(rowData.item.id);
      this.toastRef.current.show('Download removed');
      this.fetchActiveDownloads();
    } catch (error) {
      Alert.alert('Error', 'An error occured while removing the download');
    }
  }

  onDownloadRemoveTapped(rowData, rowMap) {
    Alert.alert(
      'Confirm Removal',
      `File: ${rowData.item.download_name}`,
      [
        { text: 'Cancel', onPress: () => { }, style: 'cancel' },
        { text: 'Remove', onPress: () => this.onDownloadRemove(rowData, rowMap) },
      ],
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor={theme.PRIMARY_STATUS_BAR_COLOR} />
        <SwipeListView
          useFlatList={true}
          keyExtractor={(item, index) => `${index}`}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this.fetchActiveDownloads}
              tintColor={theme.PRIMARY_COLOR}
            />
          }
          data={this.state.activeDownloads}
          renderItem={(rowData, rowMap) => (
            <InProgressDownloadsRowFront rowData={rowData} rowMap={rowMap} />
          )}
          renderHiddenItem={(rowData, rowMap) => (
            <InProgressDownloadsRowBack onPress={this.onDownloadRemoveTapped.bind(null, rowData, rowMap)} />
          )}
          disableRightSwipe={true}
          rightOpenValue={-55}
        />
        <Toast ref={this.toastRef} />
        {!this.state.isRefreshing
          && this.state.activeDownloads.length === 0
          ? this.renderPlaceholder() : null}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(InProgressDownloads);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: 'white',
  },
  placeholderContainer: {
    position: 'absolute',
    width: WIDTH,
    height: HEIGHT,
    marginTop: -80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    marginTop: 15,
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 23,
  },
});
