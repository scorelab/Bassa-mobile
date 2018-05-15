// @flow
import React from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Button from 'react-native-button';

import { theme } from '../styles';

const RoundedButton = ({
  text, onPress, width, color, borderWidth, fontSize, isDisabled,
}) => (
    <Button
      style={[styles.buttonTitle, { color, fontSize }]}
      disabled={isDisabled}
      containerStyle={[styles.buttonContainer, { width, borderColor: color, borderWidth }]}
      onPress={onPress}
    >
      {text}
    </Button>
);

RoundedButton.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  width: PropTypes.number,
  isDisabled: PropTypes.bool,
  fontSize: PropTypes.number,
  color: PropTypes.string,
  borderWidth: PropTypes.number,
};

RoundedButton.defaultProps = {
  text: '...',
  onPress: () => { },
  isDisabled: false,
  width: 100,
  fontSize: 15,
  color: theme.PRIMARY_COLOR,
  borderWidth: 1,
};

export default RoundedButton;

const styles = StyleSheet.create({
  buttonContainer: {
    height: 35,
    borderRadius: 100,
    padding: 5,
    alignSelf: 'center',
    marginTop: 20,
  },
  buttonTitle: {
    fontWeight: '400',
  },
});
