// @flow
import React from 'react';
import {
  View,
  ActivityIndicator,
  Dimensions,
  StyleSheet,
} from 'react-native';
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
  color, isVisible, position, marginTop,
}) => (
    <View
      pointerEvents={'none'} style={[
        styles.loaderContainer,
        { top: calculateTop(position, marginTop) },
      ]}>
      <ActivityIndicator
        animating={true}
        color={color}
        size='large'
        style={{ opacity: isVisible ? 1 : 0 }}
      />
    </View>
);

LoadingIndicator.propTypes = {
  color: PropTypes.string,
  isVisible: PropTypes.bool.isRequired,
  position: PropTypes.string,
  marginTop: PropTypes.number,
};

LoadingIndicator.defaultProps = {
  color: '#FFF',
  isVisible: false,
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
