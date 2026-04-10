import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { nectarTheme } from '../data/nectarData';
import { isWebPreview, scale } from '../utils/layout';

const TAB_ITEMS = [
  { key: 'shop', label: 'Shop', icon: 'storefront-outline', activeIcon: 'storefront' },
  { key: 'explore', label: 'Explore', icon: 'search-outline', activeIcon: 'search' },
  { key: 'cart', label: 'Cart', icon: 'cart-outline', activeIcon: 'cart' },
  { key: 'favourite', label: 'Favourite', icon: 'heart-outline', activeIcon: 'heart' },
  { key: 'account', label: 'Account', icon: 'person-outline', activeIcon: 'person' },
];

export default function BottomTabBar({ activeTab, onSelect }) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.wrap,
        {
          paddingBottom: isWebPreview ? scale(10) : Math.max(insets.bottom, scale(12)),
        },
      ]}
    >
      <View style={styles.bar}>
        {TAB_ITEMS.map((tabItem) => {
          const isActive = tabItem.key === activeTab;

          return (
            <Pressable
              key={tabItem.key}
              style={styles.tab}
              onPress={() => onSelect(tabItem.key)}
            >
              <Ionicons
                name={isActive ? tabItem.activeIcon : tabItem.icon}
                size={scale(24)}
                color={isActive ? nectarTheme.green : nectarTheme.text}
              />
              <Text style={[styles.label, isActive ? styles.activeLabel : null]}>{tabItem.label}</Text>
            </Pressable>
          );
        })}
      </View>

      {isWebPreview ? <View style={styles.homeIndicator} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingTop: scale(10),
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: isWebPreview ? scale(34) : scale(24),
    borderTopRightRadius: isWebPreview ? scale(34) : scale(24),
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: scale(-8) },
    shadowOpacity: 0.06,
    shadowRadius: scale(22),
    elevation: isWebPreview ? 14 : 10,
  },
  bar: {
    flexDirection: 'row',
    paddingHorizontal: scale(6),
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    marginTop: scale(6),
    fontSize: scale(12),
    lineHeight: scale(16),
    fontWeight: '600',
    color: nectarTheme.text,
  },
  activeLabel: {
    color: nectarTheme.green,
  },
  homeIndicator: {
    alignSelf: 'center',
    width: scale(118),
    height: scale(5),
    borderRadius: 999,
    backgroundColor: '#E1E1E1',
    marginTop: scale(16),
  },
});
