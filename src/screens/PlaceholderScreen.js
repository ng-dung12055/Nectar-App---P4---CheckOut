import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import PhoneStatusBar from '../components/PhoneStatusBar';
import { getImageSource, nectarTheme } from '../data/nectarData';
import { scale } from '../utils/layout';

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
    paddingHorizontal: scale(24),
  },
  heroCard: {
    borderRadius: scale(24),
    padding: scale(22),
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scale(20),
  },
  copyColumn: {
    flex: 1,
    paddingRight: scale(14),
  },
  eyebrow: {
    fontSize: scale(13),
    lineHeight: scale(18),
    fontWeight: '700',
    color: '#6B7280',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  title: {
    marginTop: scale(10),
    fontSize: scale(26),
    lineHeight: scale(32),
    fontWeight: '700',
    color: nectarTheme.text,
  },
  subtitle: {
    marginTop: scale(10),
    fontSize: scale(15),
    lineHeight: scale(22),
    color: '#6B7280',
  },
  heroImage: {
    width: scale(96),
    height: scale(96),
  },
  dotRow: {
    flexDirection: 'row',
    marginTop: scale(18),
  },
  dot: {
    width: scale(10),
    height: scale(10),
    borderRadius: scale(5),
    marginRight: scale(8),
  },
  dotMuted: {
    backgroundColor: '#D1D5DB',
  },
  noteCard: {
    marginTop: scale(20),
    borderRadius: scale(22),
    padding: scale(20),
    backgroundColor: '#F8F8F8',
  },
  noteTitle: {
    fontSize: scale(20),
    lineHeight: scale(26),
    fontWeight: '700',
    color: nectarTheme.text,
  },
  noteText: {
    marginTop: scale(10),
    fontSize: scale(15),
    lineHeight: scale(22),
    color: '#6B7280',
  },
});
