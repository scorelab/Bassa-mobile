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
import ActionButton from 'react-native-action-button';
import Prompt from 'rn-prompt';
import _ from 'lodash';

import InProgressDownloadsRowFront from './InProgressDownloadsRowFront';
import DownloadService from '../../services/downloadService';
import { theme } from '../../styles';
import { showPushNotification } from '../../helpers/utils';
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
      isPromptVisible: false,
      activeDownloads: [],
    };
    this.socket = io(`${APIConstants.HOST_URL}:${APIConstants.HOST_PORT}/progress`, {
      // transports: ['websocket'],
    });

    this.socket.on('connect', () => {
      console.log('connected')
      this.socket.emit('join', { room: this.props.user.currentUser.username });
    });
    this.socket.on('status', (data) => {
      console.log('data: ', data)
      const { activeDownloads } = this.state;
      activeDownloads.forEach((download, index) => {
        if (download.id === data.id) {
          if (Number(data.progress) === 100) {
            showPushNotification(
              'Download Complete',
              activeDownloads[index].download_name,
              `${activeDownloads[index].download_name} has been successfully downloaded`,
            );
            _.pullAt(activeDownloads, [index]);
          } else {
            activeDownloads[index].progress = data.progress;
          }
        }
      });
      this.setState({ activeDownloads });
    });
    this.toastRef = React.createRef();
    this.fetchActiveDownloads = this.fetchActiveDownloads.bind(this);
    this.onDownloadRemove = this.onDownloadRemove.bind(this);
    this.onDownloadRemoveTapped = this.onDownloadRemoveTapped.bind(this);
    this.onDownloadSubmit = this.onDownloadSubmit.bind(this);
  }

  componentDidMount() {
    this.fetchActiveDownloads();
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

  isValidLink(link) {
    const urlvalidatorRegex = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/i;
    const magnetvalidatorRegex = /magnet:\?xt=/i;
    if (urlvalidatorRegex.test(link) || link.match(magnetvalidatorRegex) !== null) {
      return true;
    }
    return false;
  }

  async onDownloadSubmit(link) {
    if (this.isValidLink(link)) {
      this.setState({
        isPromptVisible: false,
      });
      try {
        await DownloadService.addDownload({ link });
        this.toastRef.current.show('New download added');
        this.fetchActiveDownloads();
      } catch (error) {
        Alert.alert('Error', 'An error occured while adding the download');
      }
    } else {
      this.toastRef.current.show('Invalid download link');
    }
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
            <InProgressDownloadsRowFront
              rowData={rowData}
              rowMap={rowMap} />
          )}
          renderHiddenItem={(rowData, rowMap) => (
            <InProgressDownloadsRowBack
              onPress={this.onDownloadRemoveTapped.bind(null, rowData, rowMap)} />
          )}
          disableRightSwipe={true}
          rightOpenValue={-55}
        />
        <Toast ref={this.toastRef} />
        <Prompt
          title={'Add New Download'}
          placeholder={'Entr The URL'}
          submitText={'Add'}
          visible={this.state.isPromptVisible}
          onCancel={() => this.setState({
            isPromptVisible: false,
          })}
          onSubmit={value => this.onDownloadSubmit(value)} />
        <ActionButton
          buttonColor={theme.PRIMARY_COLOR}
          onPress={() => this.setState({
            isPromptVisible: true,
          })}
        />
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
