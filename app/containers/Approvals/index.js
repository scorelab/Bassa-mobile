// @flow
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  RefreshControl,
  Dimensions,
  StatusBar,
  Alert,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SwipeListView } from 'react-native-swipe-list-view';
import PropTypes from 'prop-types';
import Toast from 'react-native-easy-toast';

import ApprovalsRowFront from './ApprovalsRowFront';
import ApprovalsRowBack from './ApprovalsRowBack';
import UserService from '../../services/userService';
import { theme } from '../../styles';

const HEIGHT: number = Dimensions.get('window').height;
const WIDTH: number = Dimensions.get('window').width;

class Approvals extends Component {
  static navigationOptions = {
    tabBarLabel: 'Approvals',
  }

  static propTypes = {
    navigation: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      pendingApprovals: [],
      isRefreshing: false,
    };
    this.toastRef = React.createRef();
    this.fetchPendingRequests = this.fetchPendingRequests.bind(this);
    this.onUserApprove = this.onUserApprove.bind(this);
    this.onUserApproveTapped = this.onUserApproveTapped.bind(this);
  }

  componentDidMount() {
    this.fetchPendingRequests();
  }

  async fetchPendingRequests() {
    try {
      const response = await UserService.getPendingRequests();
      this.setState({ pendingApprovals: response.data });
    } catch (error) {
      Alert.alert('Error', 'An error occured while fetching pending approvals');
    }
  }

  async onUserApprove(rowData, rowMap) {
    rowMap[rowData.index].closeRow();
    try {
      await UserService.approveUser(rowData.item.user_name);
      this.toastRef.current.show('User account approved');
      this.fetchPendingRequests();
    } catch (error) {
      Alert.alert('Error', 'An error occured while fetching pending approvals');
    }
  }

  onUserApproveTapped(rowData, rowMap) {
    Alert.alert(
      'Confirm Approval',
      `User: ${rowData.item.user_name}\nEmail: ${rowData.item.email}`,
      [
        { text: 'Cancel', onPress: () => { }, style: 'cancel' },
        { text: 'Approve', onPress: () => this.onUserApprove(rowData, rowMap) },
      ],
    );
  }

  renderPlaceholder() {
    return (
      <View pointerEvents={'box-none'} style={styles.placeholderContainer}>
        <Icon name="md-sad" size={45} color={'grey'} />
        <Text style={styles.placeholderText}>No pending approvals</Text>
      </View>
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
              onRefresh={() => this.fetchPendingRequests()}
              tintColor={theme.PRIMARY_COLOR}
            />
          }
          data={this.state.pendingApprovals}
          renderItem={(rowData, rowMap) => (
            <ApprovalsRowFront rowData={rowData} rowMap={rowMap} />
          )}
          renderHiddenItem={(rowData, rowMap) => (
            <ApprovalsRowBack rowData={rowData} rowMap={rowMap} onPress={this.onUserApproveTapped.bind(null, rowData, rowMap)} />
          )}
          disableRightSwipe={true}
          rightOpenValue={-75}
        />
        <Toast ref={this.toastRef} />
        {!this.state.isRefreshing
          && this.state.pendingApprovals.length === 0
          ? this.renderPlaceholder() : null}
      </View>
    );
  }
}

export default Approvals;

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
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
