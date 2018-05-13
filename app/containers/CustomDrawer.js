import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';

import { theme } from '../styles';
import { resetToSignIn } from '../actions/initActions';
import { signOut } from '../actions/userActions';

class CustomDrawer extends Component {
  static propTypes = {
    signOut: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.signOut = this.signOut.bind(this);
  }

  signOut() {
    this.props.signOut();
  }

  render() {
    return (
            <ScrollView contentContainerStyle={styles.container}>
                <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
                    <View style={styles.mainDrawer}>
                        <View>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('InProgress')} style={styles.touchableItem}>
                                <Icon name="md-download" size={15} color={theme.PRIMARY_STATUS_BAR_COLOR} />
                                <View style={styles.iconSpcaer} />
                                <Text style={styles.listItemText}>Downloads</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('InProgress')} style={styles.touchableItem}>
                                <Icon name="md-people" size={15} color={theme.PRIMARY_STATUS_BAR_COLOR} />
                                <View style={styles.iconSpcaer} />
                                <Text style={styles.listItemText}>Accounts</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.bottomContainer}>
                            <View style={styles.iconSpcaer} />
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
    dispatch({ type: 'Navigation/NAVIGATE/CLOSE_DRAWER' });
    dispatch(signOut());
    dispatch(resetToSignIn());
  },
});

const mapStateToProps = state => ({
  app: state.app,
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomDrawer);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconSpcaer: {
    width: 20,
  },
  touchableItem: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  mainDrawer: {
    flex: 1,
    padding: 15,
    paddingTop: 25,
    paddingBottom: 15,
    justifyContent: 'space-between',
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  listItemText: {
    color: theme.PRIMARY_COLOR,
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
    paddingBottom: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
