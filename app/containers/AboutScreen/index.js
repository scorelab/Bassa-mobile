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
  Text,
  BackHandler,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import VersionNumber from 'react-native-version-number'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { signIn } from '../../actions/userActions';
import { theme } from '../../styles';
import ViewWrapper from '../../components/ViewWrapper';
import LoadingIndicator from '../../components/LoadingIndicator';

const HEIGHT: number = Dimensions.get('window').height;

class AboutScreen extends Component {
  static navigationOptions = {
    title: 'About Bassa',
  };

  static propTypes = {
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
    };
  }

  componentDidMount() {
    setTimeout(() => this.startComponentAnimation(), 1000);
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  startComponentAnimation() {
    Animated.timing(
      this.state.moveAnimation,
      {
        toValue: 1,
        duration: 900,
        easing: Easing.inOut(Easing.quad),
        useNativeDriver: true
      }
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

  handleBackPress = () => {
    this.props.navigation.goBack();
    return true;
  }

  renderAboutContainer() {
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
          style={styles.aboutScreenContainer}>
          <ScrollView>
            <Text
              style={styles.aboutScreenHeader}
            >
              Bassa Mobile {VersionNumber.appVersion}
            </Text>
            <Text style={styles.aboutScreenDescription}>Bassa solves the problem of wasting internet bandwidth by queuing a download if it is larger than a given threshold value in high traffic and when the traffic is low, it completes the download of the files. After the files are downloaded, the users can get their files from the local servers which do not require external internet bandwidth.</Text>
            <Text
              style={styles.aboutScreenDescription}
            >
              The Sustainable Computing Research Group (SCoRe) has conducted research covering various aspects of sensor networks, embeded systems, digital forensic, information security, mobile applications, cloud, blockchain and software tools. The goal of our research is to generate computing solutions through identifying low cost methodologies and strategies that lead to sustainability.
            </Text>
          </ScrollView>
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
        <StatusBar
          backgroundColor={theme.PRIMARY_STATUS_BAR_COLOR} />
        <ScrollView
          keyboardDismissMode={'on-drag'}
          style={styles.container}>
          <View
            style={styles.topArea} />
          <View
            style={styles.mainContainer}>
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
              <Image
                source={require('../../images/bassa.png')} />
            </Animated.View>
            {this.renderAboutContainer()}
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
});

const mapDispatchToProps = dispatch => ({
  signIn: (username, password) => dispatch(signIn(username, password)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AboutScreen);

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
  controlsContainer: {
    height: HEIGHT,
    paddingHorizontal: 10,
  },
  aboutScreenContainer: {
    marginTop: HEIGHT * 0.33,
    marginBottom: 10,
    backgroundColor: '#efefef',
    borderRadius: 10,
    paddingHorizontal: 25,
    paddingVertical: 20,
    elevation: 5,
  },
  aboutScreenHeader: {
    fontSize: 25,
    fontWeight: '600',
    color: "#000",
  },
  aboutScreenDescription: {
    fontSize: 18,
    fontWeight: '400',
    color: "#000",
    marginBottom: 10
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    marginTop: -HEIGHT / 5 - (Platform.OS === 'ios' ? -2.5 : 9.5),
  },
  topArea: {
    height: HEIGHT / 7,
    zIndex: 10,
    backgroundColor: 'transparent',
  },
});
