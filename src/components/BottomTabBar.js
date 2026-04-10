import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { nectarTheme } from '../data/nectarData';

const TAB_ITEMS = [
  { key: 'shop', label: 'Shop', icon: 'storefront-outline', activeIcon: 'storefront' },
  { key: 'explore', label: 'Explore', icon: 'search-outline', activeIcon: 'search' },
  { key: 'cart', label: 'Cart', icon: 'cart-outline', activeIcon: 'cart' },
  { key: 'favourite', label: 'Favourite', icon: 'heart-outline', activeIcon: 'heart' },
  { key: 'account', label: 'Account', icon: 'person-outline', activeIcon: 'person' },
];

export default function BottomTabBar({ activeTab, onSelect }) {
  return (
    <View style={styles.wrap}>
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
                size={28}
                color={isActive ? nectarTheme.green : nectarTheme.text}
              />
              <Text style={[styles.label, isActive ? styles.activeLabel : null]}>{tabItem.label}</Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.homeIndicator} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingTop: 12,
    paddingBottom: 10,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 34,
    borderTopRightRadius: 34,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.06,
    shadowRadius: 22,
    elevation: 14,
  },
  bar: {
    flexDirection: 'row',
    paddingHorizontal: 6,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    marginTop: 8,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
    color: nectarTheme.text,
  },
  activeLabel: {
    color: nectarTheme.green,
  },
  homeIndicator: {
    alignSelf: 'center',
    width: 118,
    height: 5,
    borderRadius: 999,
    backgroundColor: '#E1E1E1',
    marginTop: 16,
  },
});
