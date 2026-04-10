import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PhoneStatusBar() {
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

        <Ionicons name="wifi" size={22} color="#0F1020" />

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
    paddingTop: 18,
    paddingHorizontal: 26,
    marginBottom: 14,
  },
  time: {
    fontSize: 22,
    lineHeight: 26,
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
    marginRight: 10,
  },
  signalBar: {
    width: 6,
    borderRadius: 3,
    backgroundColor: '#0F1020',
    marginLeft: 3,
  },
  barShort: {
    height: 10,
  },
  barMedium: {
    height: 14,
  },
  barTall: {
    height: 18,
  },
  barMax: {
    height: 22,
  },
  battery: {
    width: 30,
    height: 16,
    borderWidth: 2,
    borderColor: '#0F1020',
    borderRadius: 4,
    marginLeft: 10,
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  batteryLevel: {
    height: 8,
    borderRadius: 2,
    backgroundColor: '#0F1020',
  },
  batteryTip: {
    position: 'absolute',
    right: -4,
    width: 2,
    height: 8,
    borderRadius: 1,
    backgroundColor: '#8C8D92',
  },
});
