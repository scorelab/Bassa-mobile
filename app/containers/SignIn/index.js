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
  View,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { TextField } from 'react-native-material-textfield';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from 'react-native-button';

import { signIn } from '../../actions/userActions';
import { theme } from '../../styles';
import ViewWrapper from '../../components/ViewWrapper';
import LoadingIndicator from '../../components/LoadingIndicator';

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
    };

    this.passwordInputRef = React.createRef();
    this.onSignInPress = this.onSignInPress.bind(this);
  }

  componentDidMount() {
    setTimeout(() => this.startComponentAnimation(), 1000);
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
    Animated.timing(this.state.moveAnimation, {
      toValue: 1,
      duration: 900,
      easing: Easing.inOut(Easing.quad),
      useNativeDriver: true,
    }).start();

    Animated.sequence([
      Animated.delay(600),
      Animated.timing(this.state.fadeAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }

  startSignInAnimation(reverse = false) {
    Animated.timing(this.state.fadeAnimation, {
      toValue: reverse ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }

  renderSignInContainer() {
    return (
      <Animated.View
        pointerEvents={this.state.isLoading ? 'none' : 'auto'}
        style={[
          styles.controlsContainer,
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
          },
        ]}
      >
        <View style={styles.signInContainer}>
          <View style={styles.signInTextFieldContainer}>
            <Icon name="user" size={30} style={{ marginRight: 8 }} />
            <TextInput
              placeholder={'User name'}
              placeholderTextColor={'#303030'}
              value={this.state.username}
              onChangeText={text => this.setState({ username: text })}
              returnKeyType={'next'}
              underlineColorAndroid={'transparent'}
              style={styles.signInTextField}
              onSubmitEditing={() => {
                this.passwordInputRef.current.focus();
              }}
              autoCapitalize={'none'}
              returnKeyType={'next'}
            />
          </View>
          <View style={styles.signInTextFieldContainer}>
            <Icon name="lock" size={30} style={{ marginRight: 8 }} />
            <TextInput
              ref={this.passwordInputRef}
              placeholder={'Password'}
              placeholderTextColor={'#303030'}
              value={this.state.password}
              onChangeText={text => this.setState({ password: text })}
              returnKeyType={'next'}
              underlineColorAndroid={'transparent'}
              style={styles.signInTextField}
              onSubmitEditing={() => {
                this.onSignInPress();
              }}
              secureTextEntry={true}
              autoCapitalize={'none'}
              returnKeyType={'next'}
            />
          </View>
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
    return (
      <ViewWrapper
        withFade={false}
        withMove={false}
        fromBackgroundStyle={styles.wrapperToBackground}
      >
        <StatusBar backgroundColor={theme.PRIMARY_STATUS_BAR_COLOR} />
        <ScrollView keyboardDismissMode={'on-drag'} style={styles.container}>
          <View style={styles.topArea} />
          <View style={styles.mainContainer}>
            <Animated.View
              style={[
                styles.logoBox,
                this.state.movingContainer === 'left' ? { height: HEIGHT } : {},
                {
                  transform: [
                    {
                      translateY: this.state.moveAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, -(HEIGHT * 0.275)],
                      }),
                    },
                  ],
                },
              ]}
            >
              <Image source={require('../../images/bassa.png')} />
            </Animated.View>
            {this.renderSignInContainer()}
          </View>
          <LoadingIndicator isVisible={this.state.isLoading} />
        </ScrollView>
      </ViewWrapper>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  app: state.app,
});

const mapDispatchToProps = dispatch => ({
  signIn: (username, password) => dispatch(signIn(username, password)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignIn);

const styles = StyleSheet.create({
  wrapperToBackground: {
    backgroundColor: theme.PRIMARY_COLOR,
  },
  buttonContainer: {
    marginTop: 10,
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
    borderRadius: 100,
    width: '100%',
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.PRIMARY_COLOR,
    elevation: 15,
    paddingVertical: 16,
    alignSelf: 'center',
    marginBottom: 15,
  },
  buttonTitle: {
    fontWeight: '600',
    textAlign: 'center',
    color: '#FFF',
  },
  controlsContainer: {
    height: HEIGHT,
    paddingHorizontal: 10,
  },
  signInContainer: {
    marginTop: HEIGHT * 0.33,
    backgroundColor: '#efefef',
    borderRadius: 10,
    paddingHorizontal: 25,
    paddingVertical: 20,
    elevation: 5,
  },
  signInText: {
    color: theme.TEXT_COLOR_INVERT,
    fontSize: 14,
    fontWeight: '300',
  },
  signInTextFieldContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 100,
    elevation: 15,
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  signInTextField: {
    fontSize: 18,
    paddingVertical: 16,
    fontWeight: '600',
    flex: 1,
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
    marginTop: -HEIGHT / 5 - (Platform.OS === 'ios' ? -2.5 : 9.5),
  },
  topArea: {
    height: HEIGHT / 5,
    zIndex: 10,
    backgroundColor: 'transparent',
  },
});
