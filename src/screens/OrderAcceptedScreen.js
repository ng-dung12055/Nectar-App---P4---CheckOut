import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { getGraphicSource, nectarTheme } from '../data/nectarData';

export default function OrderAcceptedScreen({ onTrackOrder, onBackHome }) {
  return (
    <View style={styles.screen}>
      <View style={[styles.blurOrb, styles.orbLeft]} />
      <View style={[styles.blurOrb, styles.orbCenter]} />
      <View style={[styles.blurOrb, styles.orbRight]} />

      <View style={styles.content}>
        <Image source={getGraphicSource('orderBadge')} style={styles.badge} resizeMode="contain" />

        <Text style={styles.title}>Your Order has been{'\n'}accepted</Text>
        <Text style={styles.subtitle}>
          Your items has been placcd and is on{'\n'}it’s way to being processed
        </Text>
      </View>

      <View style={styles.footer}>
        <Pressable style={styles.trackButton} onPress={onTrackOrder}>
          <Text style={styles.trackButtonText}>Track Order</Text>
        </Pressable>

        <Pressable style={styles.backButton} onPress={onBackHome}>
          <Text style={styles.backButtonText}>Back to home</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
    paddingTop: 56,
    paddingBottom: 58,
  },
  blurOrb: {
    position: 'absolute',
    borderRadius: 999,
    opacity: 0.18,
  },
  orbLeft: {
    width: 260,
    height: 260,
    backgroundColor: '#F9D4CA',
    top: 0,
    left: -120,
  },
  orbCenter: {
    width: 320,
    height: 320,
    backgroundColor: '#DDF6EE',
    top: 180,
    left: 60,
  },
  orbRight: {
    width: 260,
    height: 260,
    backgroundColor: '#E8DDFE',
    bottom: 140,
    right: -120,
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  badge: {
    width: 324,
    height: 324,
    marginBottom: 24,
  },
  title: {
    fontSize: 34,
    lineHeight: 42,
    fontWeight: '700',
    color: nectarTheme.text,
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 24,
    fontSize: 21,
    lineHeight: 31,
    color: '#8D8E95',
    textAlign: 'center',
  },
  footer: {
    paddingHorizontal: 24,
  },
  trackButton: {
    height: 74,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: nectarTheme.green,
  },
  trackButtonText: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  backButton: {
    marginTop: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '700',
    color: nectarTheme.text,
  },
});
