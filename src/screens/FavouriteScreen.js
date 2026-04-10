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
        <Ionicons name="chevron-forward" size={24} color={nectarTheme.text} />
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
    paddingTop: 8,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EDEDED',
  },
  title: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '700',
    color: nectarTheme.text,
    textAlign: 'center',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 170,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 114,
  },
  divider: {
    height: 1,
    backgroundColor: '#EDEDED',
  },
  image: {
    width: 64,
    height: 82,
    marginRight: 18,
  },
  meta: {
    flex: 1,
  },
  name: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '700',
    color: nectarTheme.text,
  },
  subtitle: {
    marginTop: 6,
    fontSize: 18,
    lineHeight: 24,
    color: '#7B7B82',
  },
  trailing: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    marginRight: 8,
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '700',
    color: nectarTheme.text,
  },
  footer: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 104,
  },
  addButton: {
    height: 68,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: nectarTheme.green,
  },
  addButtonLabel: {
    fontSize: 20,
    lineHeight: 26,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
