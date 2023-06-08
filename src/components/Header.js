import React from 'react';
import {StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import {theme} from '../core/theme';
import {COLORS} from '../constants';

export default function Header(props) {
  return <Text style={styles.header} {...props} />;
}

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    color: COLORS.primary,
    fontWeight: 'bold',
    paddingVertical: 12,
  },
});
