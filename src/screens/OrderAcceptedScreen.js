import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { getGraphicSource, nectarTheme } from '../data/nectarData';
import { scale } from '../utils/layout';

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
          Your items have been placed and are{'\n'}on the way to being processed
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
    paddingTop: scale(36),
    paddingBottom: scale(40),
  },
  blurOrb: {
    position: 'absolute',
    borderRadius: 999,
    opacity: 0.18,
  },
  orbLeft: {
    width: scale(220),
    height: scale(220),
    backgroundColor: '#F9D4CA',
    top: 0,
    left: scale(-120),
  },
  orbCenter: {
    width: scale(280),
    height: scale(280),
    backgroundColor: '#DDF6EE',
    top: scale(150),
    left: scale(56),
  },
  orbRight: {
    width: scale(220),
    height: scale(220),
    backgroundColor: '#E8DDFE',
    bottom: scale(120),
    right: scale(-120),
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: scale(24),
  },
  badge: {
    width: scale(276),
    height: scale(276),
    marginBottom: scale(18),
  },
  title: {
    fontSize: scale(30),
    lineHeight: scale(36),
    fontWeight: '700',
    color: nectarTheme.text,
    textAlign: 'center',
  },
  subtitle: {
    marginTop: scale(18),
    fontSize: scale(18),
    lineHeight: scale(26),
    color: '#8D8E95',
    textAlign: 'center',
  },
  footer: {
    paddingHorizontal: scale(24),
  },
  trackButton: {
    height: scale(64),
    borderRadius: scale(22),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: nectarTheme.green,
  },
  trackButtonText: {
    fontSize: scale(19),
    lineHeight: scale(24),
    fontWeight: '700',
    color: '#FFFFFF',
  },
  backButton: {
    marginTop: scale(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    fontSize: scale(18),
    lineHeight: scale(24),
    fontWeight: '700',
    color: nectarTheme.text,
  },
});
