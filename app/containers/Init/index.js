// @flow
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  StatusBar,
  Animated,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { resetToSignIn, configurePushNotifications } from '../../actions/appActions';
import ViewWrapper from '../../components/ViewWrapper';
import { theme } from '../../styles';

const HEIGHT: number = Dimensions.get('window').height;

class Init extends Component {
  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    resetToSignIn: PropTypes.func.isRequired,
    configurePushNotifications: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.state = {
      fadeAnimation: new Animated.Value(1),
      scaleAnimation: new Animated.Value(0),
    };
  }

  componentDidMount() {
    this.props.configurePushNotifications();
    setTimeout(() => this.navigateToNextView(), 1000);
  }

  navigateToNextView() {
    this.props.resetToSignIn();
  }

  startAnimation() {
    Animated.parallel([
      Animated.timing(
        this.state.fadeAnimation,
        {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        },
      ),
      Animated.timing(
        this.state.scaleAnimation,
        {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        },
      ),
    ]).start();
  }

  render() {
    return (
      <ViewWrapper
        withFade={true}
        withMove={false}
        statusBarColor={theme.PRIMARY_STATUS_BAR_COLOR}
        fromBackgroundStyle={styles.fromBackgroundStyle}
        toBackgroundStyle={styles.toBackgroundStyle}>
        <StatusBar
          backgroundColor={theme.PRIMARY_STATUS_BAR_COLOR} />
        <Animated.View
          style={[styles.animatedView, { opacity: this.state.fadeAnimation }]}>
          <View
            style={styles.logoBox}>
            <Animated.Image
              style={{
                transform: [
                  {
                    scale: this.state.scaleAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 4],
                    }),
                  },
                ],
              }}
              source={require('../../images/bassa.png')}
            />
          </View>
        </Animated.View>
      </ViewWrapper>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  app: state.app,
});

const mapDispatchToProps = dispatch => ({
  resetToSignIn: () => dispatch(resetToSignIn()),
  configurePushNotifications: () => dispatch(configurePushNotifications()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Init);

const styles = StyleSheet.create({
  logoBox: {
    position: 'absolute',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  animatedView: {
    flex: 1,
    backgroundColor: theme.PRIMARY_COLOR,
    height: HEIGHT,
    justifyContent: 'center',
  },
  fromBackgroundStyle: {
    backgroundColor: theme.PRIMARY_COLOR,
  },
  toBackgroundStyle: {
    backgroundColor: '#FFF',
  },
});
