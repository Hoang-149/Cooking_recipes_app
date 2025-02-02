import React from 'react';
import {StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import {theme} from '../core/theme';

export default function Paragraph(props) {
  return <Text style={styles.text} {...props} />;
}

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    color: theme.colors.primary,
    lineHeight: 21,
    textAlign: 'center',
    // marginTop: 200,
    marginBottom: 12,
  },
});
