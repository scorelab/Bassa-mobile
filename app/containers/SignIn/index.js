// @flow
import React, { Component } from 'react';
import {
  StatusBar,
  ScrollView,
  Image,
  Easing,
  Animated,
  Dimensions,
  Platform,
  StyleSheet,
  Alert,
  View,
  PanResponder,
} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from 'react-native-button';

import { signIn } from '../../actions/userActions';
import { setHostPort, setHostUrl } from '../../actions/constantsActions'
import { theme } from '../../styles';
import ViewWrapper from '../../components/ViewWrapper';
import LoadingIndicator from '../../components/LoadingIndicator';

import Prompt from 'rn-prompt';

const HEIGHT: number = Dimensions.get('window').height;

class SignIn extends Component {
  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    signIn: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      moveAnimation: new Animated.Value(0),
      fadeAnimation: new Animated.Value(0),
      slideAnimationLeft: new Animated.Value(0),
      slideAnimationRight: new Animated.Value(0),
      movingContainer: 'right',
      username: '',
      password: '',
      usernameError: '',
      passwordError: '',
      isLoading: false,
      isPromptVisible: false,
    };

    this.passwordInputRef = React.createRef();
    this.onSignInPress = this.onSignInPress.bind(this);
    this.changeValues = this.changeValues.bind(this);
    this.handleDoubleTap = this.handleDoubleTap.bind(this);
  }

  componentDidMount() {
    setTimeout(() => this.startComponentAnimation(), 1000);
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => this.handleDoubleTap(),
    });
  }

  onSignInPress() {
    if (this.isValid()) {
      this.setState({ isLoading: true });
      this.startSignInAnimation();
      this.props.signIn(this.state.username, this.state.password);
    }
  }

  isValid() {
    if (this.state.username === '') {
      this.setState({ usernameError: 'Username is required' });
      return false;
    }
    if (this.state.password === '') {
      this.setState({ passwordError: 'Password is required' });
      return false;
    }
    return true;
  }

  startComponentAnimation() {
    Animated.timing(
      this.state.moveAnimation,
      {
        toValue: 1,
        duration: 900,
        easing: Easing.inOut(Easing.quad),
        useNativeDriver: true,
      },
    ).start();

    Animated.sequence([
      Animated.delay(600),
      Animated.timing(
        this.state.fadeAnimation,
        {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        },
      ),
    ]).start();
  }

  startSignInAnimation(reverse = false) {
    Animated.timing(
      this.state.fadeAnimation,
      {
        toValue: reverse ? 1 : 0,
        duration: 300,
        useNativeDriver: true,
      },
    ).start();
  }

  changeValues(value) {
    const addr = value.replace(/https?\:\/\//gi, "");
    splitted_vals = addr.split(":");
    url = "http://" + splitted_vals[0];
    port = parseInt(splitted_vals[1]);
    this.props.setHostUrl(url);
    this.props.setHostPort(port);
    this.setState({ isPromptVisible: false });
    // Display success message to the user
    Alert.alert(
      "Values changed",
      `Server URL has been successfully changed to ${url}:${port}!`,
    );
  }

  handleDoubleTap() {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;
    if (this.lastTap && (now - this.lastTap) < DOUBLE_PRESS_DELAY) {
      this.setState({ isPromptVisible: true });
    } else {
      this.lastTap = now;
    }
  }

  renderSignInContainer() {
    return (
      <Animated.View
        pointerEvents={this.state.isLoading ? 'none' : 'auto'}
        style={[styles.controlsContainer,
        {
          opacity: this.state.fadeAnimation,
          transform: [
            {
              translateY: this.state.fadeAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [5, -5],
              }),
            },
          ],
        }]}
      >
        <View
          style={styles.signInContainer}>
          <TextField
            label={'Username'}
            error={this.state.usernameError}
            tintColor={'#FFF'}
            textColor={'#FFF'}
            baseColor={'#FFF'}
            labelTextStyle={{ fontWeight: '500' }}
            autoCapitalize={'none'}
            onChangeText={text => this.setState({ usernameError: null, username: text })}
            returnKeyType={'next'}
            value={this.state.username}
            onSubmitEditing={() => {
              this.passwordInputRef.current.focus();
            }}
          />
          <TextField
            ref={this.passwordInputRef}
            label={'Password'}
            tintColor={'#FFF'}
            error={this.state.passwordError}
            textColor={'#FFF'}
            baseColor={'#FFF'}
            labelTextStyle={{ fontWeight: '500' }}
            autoCapitalize={'none'}
            secureTextEntry={true}
            onChangeText={text => this.setState({ passwordError: null, password: text })}
            returnKeyType={'next'}
            value={this.state.password}
            onSubmitEditing={() => {
              this.onSignInPress();
            }}
          />
          <View style={styles.buttonContainer}>
            <Button
              style={styles.buttonTitle}
              containerStyle={styles.buttonWrapper}
              onPress={this.onSignInPress}
            >
              Sign In
            </Button>
            <Button
              style={styles.buttonTitle}
              containerStyle={styles.buttonWrapper}
              onPress={() => this.props.navigation.navigate('SignUp')}
            >
              Sign Up
            </Button>
          </View>
        </View>
      </Animated.View>
    );
  }

  render() {
    const { hostUrl, hostPort } = this.props.constants;
    return (
      <ViewWrapper
        withFade={false}
        withMove={false}
        fromBackgroundStyle={styles.wrapperToBackground}
      >
        <StatusBar
          backgroundColor={theme.PRIMARY_STATUS_BAR_COLOR} />
        <ScrollView
          keyboardDismissMode={'on-drag'}
          style={styles.container}>
          <View style={styles.topArea} {...this._panResponder.panHandlers} />
          <View
            style={styles.mainContainer}>
            <Prompt
              title={'Change URL and port'}
              placeholder={'Split them by colon (:)'}
              submitText={'Change'}
              defaultValue={`${hostUrl}:${hostPort}`}
              visible={this.state.isPromptVisible}
              onCancel={() => this.setState({
                isPromptVisible: false,
              })}
              onSubmit={value => this.changeValues(value)} />
            <Animated.View
              style={[styles.logoBox, this.state.movingContainer === 'left' ? { height: HEIGHT } : {}, {
                transform: [
                  {
                    translateY: this.state.moveAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -(HEIGHT * 0.275)],
                    }),
                  },
                ],
              }]}
            >
              <Image
                source={require('../../images/bassa.png')} />
            </Animated.View>
            {this.renderSignInContainer()}
          </View>
          <LoadingIndicator
            isVisible={this.state.isLoading} />
        </ScrollView>
      </ViewWrapper>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  app: state.app,
  constants: state.constants,
});

const mapDispatchToProps = dispatch => ({
  signIn: (username, password) => dispatch(signIn(username, password)),
  setHostUrl: url => dispatch(setHostUrl(url)),
  setHostPort: port => dispatch(setHostPort(port)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

const styles = StyleSheet.create({
  wrapperToBackground: {
    backgroundColor: theme.PRIMARY_COLOR,
  },
  buttonContainer: {
    marginTop: 30,
  },
  container: {
    flex: 1,
  },
  logoBox: {
    position: 'absolute',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWrapper: {
    height: 35,
    borderRadius: 100,
    width: 200,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#FFF',
    padding: 5,
    alignSelf: 'center',
    marginTop: 20,
  },
  buttonTitle: {
    fontWeight: '400',
    textAlign: 'center',
    color: '#FFF',
  },
  controlsContainer: {
    height: HEIGHT,
    paddingHorizontal: 35,
  },
  signInContainer: {
    marginTop: HEIGHT * 0.33,
  },
  signInText: {
    color: theme.TEXT_COLOR_INVERT,
    fontSize: 14,
    fontWeight: '300',
  },
  signInLink: {
    color: theme.TEXT_COLOR_INVERT,
    fontSize: 14,
    fontWeight: '400',
    textDecorationLine: 'underline',
  },
  mainContainer: {
    flex: 1,
    height: HEIGHT,
    justifyContent: 'center',
    marginTop: (-HEIGHT / 5) - (Platform.OS === 'ios' ? -2.5 : 9.5),
  },
  topArea: {
    height: HEIGHT / 7,
    margin: 20,
    zIndex: 10,
    backgroundColor: 'transparent',
  },
});
