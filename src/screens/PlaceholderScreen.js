import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import PhoneStatusBar from '../components/PhoneStatusBar';
import { getImageSource, nectarTheme } from '../data/nectarData';

const ACCENT_MAP = {
  green: {
    backgroundColor: '#EEF8F2',
    dotColor: '#53B175',
  },
  peach: {
    backgroundColor: '#FFF3E8',
    dotColor: '#F8A44C',
  },
};

export default function PlaceholderScreen({ eyebrow, title, subtitle, accent = 'green' }) {
  const accentStyles = ACCENT_MAP[accent] ?? ACCENT_MAP.green;

  return (
    <View style={styles.screen}>
      <PhoneStatusBar />

      <View style={[styles.heroCard, { backgroundColor: accentStyles.backgroundColor }]}>
        <View style={styles.copyColumn}>
          <Text style={styles.eyebrow}>{eyebrow}</Text>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>

          <View style={styles.dotRow}>
            <View style={[styles.dot, { backgroundColor: accentStyles.dotColor }]} />
            <View style={[styles.dot, styles.dotMuted]} />
            <View style={[styles.dot, styles.dotMuted]} />
          </View>
        </View>

        <Image source={getImageSource('vegetablesHero')} style={styles.heroImage} resizeMode="contain" />
      </View>

      <View style={styles.noteCard}>
        <Text style={styles.noteTitle}>Requested screens are ready</Text>
        <Text style={styles.noteText}>
          Open the Cart, Favourite, and Account tabs. The `Checkout`, `Order accepted`, and `Error`
          states can also be loaded directly on web via `?screen=...`.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
  },
  heroCard: {
    borderRadius: 28,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
  },
  copyColumn: {
    flex: 1,
    paddingRight: 16,
  },
  eyebrow: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '700',
    color: '#6B7280',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  title: {
    marginTop: 10,
    fontSize: 30,
    lineHeight: 36,
    fontWeight: '700',
    color: nectarTheme.text,
  },
  subtitle: {
    marginTop: 12,
    fontSize: 17,
    lineHeight: 25,
    color: '#6B7280',
  },
  heroImage: {
    width: 112,
    height: 112,
  },
  dotRow: {
    flexDirection: 'row',
    marginTop: 22,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  dotMuted: {
    backgroundColor: '#D1D5DB',
  },
  noteCard: {
    marginTop: 22,
    borderRadius: 24,
    padding: 22,
    backgroundColor: '#F8F8F8',
  },
  noteTitle: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '700',
    color: nectarTheme.text,
  },
  noteText: {
    marginTop: 10,
    fontSize: 16,
    lineHeight: 24,
    color: '#6B7280',
  },
});
