// @flow
import React from 'react';
import {
  View,
  Dimensions,
  ViewPropTypes,
  StyleSheet,
} from 'react-native';
import Spinner from 'react-native-spinkit';
import PropTypes from 'prop-types';

const HEIGHT: number = Dimensions.get('window').height;

const TOP_NORMAL = (HEIGHT / 2) - 10;
const TOP_WITH_NAV = (HEIGHT / 2) - 65;
const TOP_WITH_NAV_AND_TAB = (HEIGHT / 3);

const calculateTop = (position, marginTop) => {
  switch (position) {
    case 'nav':
      return TOP_WITH_NAV;
    case 'nav_tabs':
      return TOP_WITH_NAV_AND_TAB;
    case 'custom':
      return marginTop;
    default:
      return TOP_NORMAL;
  }
};

const LoadingIndicator = ({
  color, isVisible, position, marginTop, size, type, style,
}) => (
    <View
      pointerEvents={'none'} style={[
        styles.loaderContainer,
        { top: calculateTop(position, marginTop) },
      ]}>
      <Spinner
        style={style}
        isVisible={isVisible}
        size={size}
        type={type}
        color={color} />
    </View>
);

LoadingIndicator.propTypes = {
  color: PropTypes.string,
  isVisible: PropTypes.bool.isRequired,
  position: PropTypes.string,
  marginTop: PropTypes.number,
  style: ViewPropTypes.style,
  type: PropTypes.string,
  size: PropTypes.number,
};

LoadingIndicator.defaultProps = {
  color: '#FFF',
  isVisible: false,
  size: 60,
  type: 'Bounce',
  style: {},
  position: '',
  marginTop: 0,
};

export default LoadingIndicator;

const styles = StyleSheet.create({
  loaderContainer: {
    position: 'absolute',
    alignSelf: 'center',
  },
});
