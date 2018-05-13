// @flow
import React, { PureComponent } from 'react';
import {
  View,
  Animated,
  StyleSheet,
  InteractionManager,
  ViewPropTypes,
  StatusBar,
} from 'react-native';
import PropTypes from 'prop-types';

import { globalStyles, theme } from '../styles';

class ViewWrapper extends PureComponent {
  static defaultProps = {
    fromBackgroundStyle: {},
    toBackgroundStyle: {},
    withMove: true,
    withFade: true,
    statusBarColor: theme.PRIMARY_STATUS_BAR_COLOR,
  };

  static propTypes = {
    fromBackgroundStyle: ViewPropTypes.style,
    toBackgroundStyle: ViewPropTypes.style,
    children: PropTypes.any.isRequired,
    withMove: PropTypes.bool,
    withFade: PropTypes.bool,
    statusBarColor: PropTypes.string,
  };

  constructor() {
    super();
    this.state = {
      isTransitionOver: false,
      fadeAnimation: new Animated.Value(0),
    };
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({
        isTransitionOver: true,
      });

      this.startAnimation();
    });
  }

  startAnimation() {
    Animated.timing(
      this.state.fadeAnimation,
      {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      },
    ).start();
  }

  render() {
    return (
      <View style={[globalStyles.container, styles.container, this.props.fromBackgroundStyle]}>
        <StatusBar backgroundColor={this.props.statusBarColor} animated={true} />
        {this.state.isTransitionOver ? (
          <Animated.View
            style={[globalStyles.container, this.props.toBackgroundStyle, {
              opacity: this.props.withFade ? this.state.fadeAnimation : 1,
              transform: [
                {
                  translateY: this.props.withMove ? this.state.fadeAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-5, 0],
                  }) : 1,
                },
              ],
            }]}
          >
            {this.props.children}
          </Animated.View>
        ) : (
            null
          )}
      </View>
    );
  }
}

export default ViewWrapper;

const styles = StyleSheet.create({
  container: {
    marginBottom: -5,
    backgroundColor: '#FFF',
  },
});
