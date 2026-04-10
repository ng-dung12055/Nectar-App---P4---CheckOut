import React from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import PhoneStatusBar from '../components/PhoneStatusBar';
import { getImageSource, nectarTheme } from '../data/nectarData';
import { scale } from '../utils/layout';

function FavouriteRow({ item }) {
  return (
    <View style={styles.row}>
      <Image source={getImageSource(item.thumbnailKey)} style={styles.image} resizeMode="contain" />

      <View style={styles.meta}>
        <Text style={styles.name}>{item.cartName}</Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>
      </View>

      <View style={styles.trailing}>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        <Ionicons name="chevron-forward" size={scale(22)} color={nectarTheme.text} />
      </View>
    </View>
  );
}

export default function FavouriteScreen({ items, onAddAllToCart }) {
  return (
    <View style={styles.screen}>
      <PhoneStatusBar />

      <View style={styles.titleWrap}>
        <Text style={styles.title}>Favourite</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {items.map((item) => (
          <View key={item.id}>
            <FavouriteRow item={item} />
            <View style={styles.divider} />
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <Pressable style={styles.addButton} onPress={onAddAllToCart}>
          <Text style={styles.addButtonLabel}>Add All To Cart</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  titleWrap: {
    paddingTop: scale(8),
    paddingBottom: scale(14),
    borderBottomWidth: 1,
    borderBottomColor: '#EDEDED',
  },
  title: {
    fontSize: scale(24),
    lineHeight: scale(30),
    fontWeight: '700',
    color: nectarTheme.text,
    textAlign: 'center',
  },
  scrollContent: {
    paddingHorizontal: scale(24),
    paddingBottom: scale(156),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: scale(96),
  },
  divider: {
    height: 1,
    backgroundColor: '#EDEDED',
  },
  image: {
    width: scale(54),
    height: scale(72),
    marginRight: scale(16),
  },
  meta: {
    flex: 1,
  },
  name: {
    fontSize: scale(21),
    lineHeight: scale(26),
    fontWeight: '700',
    color: nectarTheme.text,
  },
  subtitle: {
    marginTop: scale(4),
    fontSize: scale(16),
    lineHeight: scale(22),
    color: '#7B7B82',
  },
  trailing: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    marginRight: scale(8),
    fontSize: scale(21),
    lineHeight: scale(26),
    fontWeight: '700',
    color: nectarTheme.text,
  },
  footer: {
    position: 'absolute',
    left: scale(24),
    right: scale(24),
    bottom: scale(88),
  },
  addButton: {
    height: scale(60),
    borderRadius: scale(20),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: nectarTheme.green,
  },
  addButtonLabel: {
    fontSize: scale(18),
    lineHeight: scale(24),
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
