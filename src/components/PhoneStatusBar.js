import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { isWebPreview, scale } from '../utils/layout';

export default function PhoneStatusBar() {
  const insets = useSafeAreaInsets();

  if (!isWebPreview) {
    return <View style={{ height: Math.max(insets.top, scale(10)) }} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.time}>9:41</Text>

      <View style={styles.rightCluster}>
        <View style={styles.signal}>
          <View style={[styles.signalBar, styles.barShort]} />
          <View style={[styles.signalBar, styles.barMedium]} />
          <View style={[styles.signalBar, styles.barTall]} />
          <View style={[styles.signalBar, styles.barMax]} />
        </View>

        <Ionicons name="wifi" size={scale(22)} color="#0F1020" />

        <View style={styles.battery}>
          <View style={styles.batteryLevel} />
          <View style={styles.batteryTip} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: scale(18),
    paddingHorizontal: scale(26),
    marginBottom: scale(14),
  },
  time: {
    fontSize: scale(22),
    lineHeight: scale(26),
    fontWeight: '700',
    color: '#11111F',
  },
  rightCluster: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  signal: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginRight: scale(10),
  },
  signalBar: {
    width: scale(6),
    borderRadius: scale(3),
    backgroundColor: '#0F1020',
    marginLeft: scale(3),
  },
  barShort: {
    height: scale(10),
  },
  barMedium: {
    height: scale(14),
  },
  barTall: {
    height: scale(18),
  },
  barMax: {
    height: scale(22),
  },
  battery: {
    width: scale(30),
    height: scale(16),
    borderWidth: 2,
    borderColor: '#0F1020',
    borderRadius: scale(4),
    marginLeft: scale(10),
    justifyContent: 'center',
    paddingHorizontal: scale(2),
  },
  batteryLevel: {
    height: scale(8),
    borderRadius: scale(2),
    backgroundColor: '#0F1020',
  },
  batteryTip: {
    position: 'absolute',
    right: scale(-4),
    width: scale(2),
    height: scale(8),
    borderRadius: 1,
    backgroundColor: '#8C8D92',
  },
});
