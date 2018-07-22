// @flow
import React, { Component } from 'react';
import {
  StyleSheet,
  Dimensions,
  Alert,
  StatusBar,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ActionButton from 'react-native-action-button';
import PropTypes from 'prop-types';
import { PieChart } from 'react-native-svg-charts';
import Toast from 'react-native-easy-toast';
import { connect } from 'react-redux';

import { theme } from '../../styles';
import { formatBytes } from '../../helpers/utils';
import DownloadService from '../../services/downloadService';

const HEIGHT: number = Dimensions.get('window').height;

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
    try {
      const response = await DownloadService.getQuotaUsages();
      this.setState({ quotaUsages: response.data });
    } catch (error) {
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

  getRandomColor() {
    return (`#${(Math.random() * 0xFFFFFF << 0).toString(16)}000000`).slice(0, 7);
  }

  render() {
    const pieData = this.state.quotaUsages
      .map(item => item.size)
      .filter(value => value > 0)
      .map((value, index) => ({
        value,
        svg: {
          fill: this.getRandomColor(),
          onPress: () => this.toastRef.current.show(`${this.state.quotaUsages[index].user_name} ${formatBytes(value)}`),
        },
        key: `pie-${index}`,
      }));

    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor={theme.PRIMARY_STATUS_BAR_COLOR} />
        <PieChart
          style={{ height: HEIGHT / 2 }}
          data={pieData}
        />
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
    paddingTop: HEIGHT / 7,
    backgroundColor: 'white',
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});
