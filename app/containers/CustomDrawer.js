import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  Alert,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';

import { theme } from '../styles';
import { resetToSignIn, closeDrawer, setDrawerTab } from '../actions/appActions';
import { signOut } from '../actions/userActions';

class CustomDrawer extends Component {
  static propTypes = {
    signOut: PropTypes.func.isRequired,
    closeDrawer: PropTypes.func.isRequired,
    setDrawerTab: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    app: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.signOut = this.signOut.bind(this);
    this.navigateTo = this.navigateTo.bind(this);
  }

  signOut() {
    Alert.alert(
      'Are you sure?',
      'You are about to Sign-Out',
      [
        { text: 'No', onPress: () => { }, style: 'cancel' },
        { text: 'Yes', onPress: () => this.props.signOut() },
      ],
    );
  }

  navigateTo(screen, tabIndex) {
    this.props.setDrawerTab(tabIndex);
    this.props.navigation.navigate(screen);
    this.props.closeDrawer();
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
          <View style={styles.logoContainer}>
            <Image
              source={require('../images/bassa.png')} />
          </View>
          <View style={styles.mainDrawer}>
            <View>
              <View style={[styles.itemContainer, this.props.app.selectedDrawer === 0 ? styles.selectedItem : null]}>
                <TouchableOpacity onPress={() => this.navigateTo('Downloads', 0)} style={styles.touchableItem}>
                  <Icon name="md-download" size={15} color={theme.PRIMARY_STATUS_BAR_COLOR} />
                  <View style={styles.iconSpcaer} />
                  <Text style={styles.listItemText}>Downloads</Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.itemContainer, this.props.app.selectedDrawer === 1 ? styles.selectedItem : null]}>
                <TouchableOpacity disabled={!this.props.user.currentUser.isAdmin} onPress={() => this.navigateTo('Accounts', 1)} style={styles.touchableItem}>
                  <Icon name="md-people" size={15} color={theme.PRIMARY_STATUS_BAR_COLOR} />
                  <View style={styles.iconSpcaer} />
                  <Text style={styles.listItemText}>Accounts</Text>
                </TouchableOpacity>
                {this.props.user.currentUser.isAdmin ? null : <Icon name="md-lock" size={20} color={'grey'} />}
              </View>
            </View>
            <View style={styles.bottomContainer}>
              <View style={styles.userInfoContainer}>
                <Icon name="md-person" size={16} color={theme.PRIMARY_STATUS_BAR_COLOR} />
                <Text style={styles.userText}>{this.props.user.currentUser.username}</Text>
              </View>
              <TouchableOpacity onPress={this.signOut} style={styles.signOutButton}>
                <Text style={styles.signOutText}>Sign Out</Text>
                <Icon name="md-log-out" size={12} color={theme.PRIMARY_STATUS_BAR_COLOR} />
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  signOut: () => {
    dispatch(closeDrawer());
    dispatch(signOut());
    dispatch(resetToSignIn());
  },
  closeDrawer: () => dispatch(closeDrawer()),
  setDrawerTab: tabIndex => dispatch(setDrawerTab(tabIndex)),
});

const mapStateToProps = state => ({
  app: state.app,
  user: state.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomDrawer);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    paddingRight: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userInfoContainer: {
    flexDirection: 'row',
    paddingLeft: 15,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  selectedItem: {
    backgroundColor: 'rgba(230, 230, 230, 1)',
    padding: 0,
  },
  userText: {
    fontSize: 16,
    marginLeft: 7,
    color: theme.PRIMARY_STATUS_BAR_COLOR,
    fontWeight: '500',
  },
  logoContainer: {
    height: 170,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.PRIMARY_COLOR,
  },
  iconSpcaer: {
    width: 20,
  },
  touchableItem: {
    height: 50,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  mainDrawer: {
    flex: 1,
    paddingBottom: 15,
    justifyContent: 'space-between',
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  listItemText: {
    color: theme.PRIMARY_STATUS_BAR_COLOR,
    textAlign: 'left',
    fontSize: 16,
  },
  signOutText: {
    marginRight: 7,
    fontSize: 12,
    color: theme.PRIMARY_STATUS_BAR_COLOR,
    fontWeight: '500',
  },
  signOutButton: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.PRIMARY_STATUS_BAR_COLOR,
    paddingTop: 5,
    paddingLeft: 15,
    paddingRight: 15,
    marginRight: 15,
    paddingBottom: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
