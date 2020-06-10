import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';

import Scanner from './src/components/Scanner';

import {COLORS} from './src/constants/colors';

export default function App() {
  return (
      <SafeAreaView style={styles.container}>
        <Scanner/>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    backgroundColor: COLORS.White,
    paddingTop: 100,
    paddingHorizontal: 10,
  },
});
