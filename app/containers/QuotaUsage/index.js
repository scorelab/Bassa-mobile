// @flow
import React, { Component } from 'react';
import {
  StyleSheet,
  Alert,
  Text,
  FlatList,
  Dimensions,
  StatusBar,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ActionButton from 'react-native-action-button';
import PropTypes from 'prop-types';
import Toast from 'react-native-easy-toast';
import { connect } from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';
import _ from 'lodash';

import { theme } from '../../styles';
import DownloadService from '../../services/downloadService';
import QuotaUsageRow from './QuotaUsageRow';

const HEIGHT: number = Dimensions.get('window').height;
const WIDTH: number = Dimensions.get('window').width;

class QuotaUsage extends Component {
  static navigationOptions = {
    tabBarLabel: 'Quota Usage',
  }

  static propTypes = {
    navigation: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      quotaUsages: [],
      sortPropety: null,
      isRefreshing: false,
    };
    this.toastRef = React.createRef();
    this.fetchQuotaUsages = this.fetchQuotaUsages.bind(this);
    this.startAllDownloads = this.startAllDownloads.bind(this);
    this.killAllDownloads = this.killAllDownloads.bind(this);
    this.onStartAllTapped = this.onStartAllTapped.bind(this);
    this.onKillAllTapped = this.onKillAllTapped.bind(this);
  }

  componentDidMount() {
    this.fetchQuotaUsages();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.downloads.lastDownloadTimestamp !== this.props.downloads.lastDownloadTimestamp) {
      this.fetchQuotaUsages();
    }
  }

  async fetchQuotaUsages() {
    this.setState({ isRefreshing: true });
    try {
      const response = await DownloadService.getQuotaUsages();
      this.setState({ quotaUsages: response.data, isRefreshing: false });
    } catch (error) {
      this.setState({ isRefreshing: false });
      Alert.alert('Error', 'An error occured while fetching quota usages');
    }
  }

  async startAllDownloads() {
    try {
      await DownloadService.startAllDownloads();
      this.toastRef.current.show('All downloads started');
    } catch (error) {
      Alert.alert('Error', 'An error occured while starting all downloads');
    }
  }

  async killAllDownloads() {
    try {
      await DownloadService.killAllDownloads();
      this.toastRef.current.show('All downloads killed');
    } catch (error) {
      Alert.alert('Error', 'An error occured while killing all downloads');
    }
  }

  onStartAllTapped() {
    Alert.alert(
      'Confirm Action',
      'Start all downloads?',
      [
        { text: 'No', onPress: () => { }, style: 'cancel' },
        { text: 'Yes', onPress: () => this.startAllDownloads() },
      ],
    );
  }

  onKillAllTapped() {
    Alert.alert(
      'Confirm Action',
      'Kill all downloads?',
      [
        { text: 'No', onPress: () => { }, style: 'cancel' },
        { text: 'Yes', onPress: () => this.killAllDownloads() },
      ],
    );
  }

  sortItems(list = [], sortPropety = '', isAscending = true) {
    return isAscending ? _.sortBy(list, sortPropety)
      : _.chain(list).sortBy(sortPropety).reverse().value();
  }

  renderPlaceholder() {
    return (
      <View pointerEvents={'box-none'} style={styles.placeholderContainer}>
        <Icon name="md-sad" size={45} color={'grey'} />
        <Text style={styles.placeholderText}>No quota usages</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor={theme.PRIMARY_STATUS_BAR_COLOR} />
        <RNPickerSelect
          placeholder={{
            label: 'Sort Preference:',
            value: null,
          }}
          items={[
            {
              label: 'Sort By: User',
              value: 'user_name'
            },
            {
              label: 'Sort By: Usage',
              value: 'size'
            }
          ]}
          onValueChange={(value) =>
            this.setState({
              sortPropety: value,
              quotaUsages: this.sortItems(this.state.quotaUsages, value, value === 'user_name'),
            })
          }
          disabled={this.state.quotaUsages.length === 0}
          value={this.state.sortPropety}
        />
        <FlatList
          data={this.state.quotaUsages}
          refreshing={this.state.isRefreshing}
          onRefresh={this.fetchQuotaUsages}
          style={{ paddingTop: 10 }}
          keyExtractor={(item, index) => `${index}`}
          renderItem={({ item }) => <QuotaUsageRow item={item} />}
        />
        {!this.state.isRefreshing
          && this.state.quotaUsages.length === 0
          ? this.renderPlaceholder() : null}
        <ActionButton
          renderIcon={active => (active ?
            <Icon
              name="md-add"
              style={styles.actionButtonIcon} /> :
            <Icon
              name="md-settings"
              style={styles.actionButtonIcon} />)}
          buttonColor={theme.PRIMARY_COLOR}>
          <ActionButton.Item
            buttonColor='#3498db'
            title='Start All Downloads'
            onPress={this.onStartAllTapped}>
            <Icon
              name="md-refresh"
              style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor='rgba(231,76,60,1)'
            title='Kill All Downloads'
            onPress={this.onKillAllTapped}>
            <Icon
              name="md-hand"
              style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
        <Toast
          ref={this.toastRef} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  downloads: state.downloads,
});

export default connect(mapStateToProps)(QuotaUsage);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: 'white',
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
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
