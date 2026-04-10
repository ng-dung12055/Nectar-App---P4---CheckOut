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

function QuantityControl({ quantity, onDecrease, onIncrease }) {
  return (
    <View style={styles.quantityControl}>
      <Pressable style={styles.quantityButton} onPress={onDecrease}>
        <Ionicons name="remove" size={scale(20)} color="#8C8C8C" />
      </Pressable>

      <Text style={styles.quantityText}>{quantity}</Text>

      <Pressable style={styles.quantityButton} onPress={onIncrease}>
        <Ionicons name="add" size={scale(20)} color={nectarTheme.green} />
      </Pressable>
    </View>
  );
}

function CartRow({ item, onDecrease, onIncrease, onRemove }) {
  return (
    <View style={styles.row}>
      <Image source={getImageSource(item.imageKey)} style={styles.productImage} resizeMode="contain" />

      <View style={styles.meta}>
        <View style={styles.head}>
          <View>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.subtitle}>{item.subtitle}</Text>
          </View>

          <Pressable hitSlop={10} onPress={onRemove}>
            <Ionicons name="close" size={scale(22)} color="#8C8C8C" />
          </Pressable>
        </View>

        <View style={styles.foot}>
          <QuantityControl quantity={item.quantity} onDecrease={onDecrease} onIncrease={onIncrease} />
          <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        </View>
      </View>
    </View>
  );
}

export default function CartScreen({
  items,
  total,
  onDecrease,
  onIncrease,
  onRemove,
  onCheckout,
}) {
  return (
    <View style={styles.screen}>
      <PhoneStatusBar />

      <View style={styles.titleWrap}>
        <Text style={styles.title}>My Cart</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {items.map((item) => (
          <View key={item.id}>
            <CartRow
              item={item}
              onDecrease={() => onDecrease(item.id)}
              onIncrease={() => onIncrease(item.id)}
              onRemove={() => onRemove(item.id)}
            />
            <View style={styles.divider} />
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <Pressable style={styles.checkoutButton} onPress={onCheckout}>
          <Text style={styles.checkoutLabel}>Go to Checkout</Text>
          <View style={styles.checkoutTotalBadge}>
            <Text style={styles.checkoutTotalText}>${total.toFixed(2)}</Text>
          </View>
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
    paddingVertical: scale(20),
  },
  divider: {
    height: 1,
    backgroundColor: '#EDEDED',
  },
  productImage: {
    width: scale(78),
    height: scale(78),
    marginRight: scale(16),
  },
  meta: {
    flex: 1,
  },
  head: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: scale(16),
  },
  name: {
    fontSize: scale(21),
    lineHeight: scale(26),
    fontWeight: '700',
    color: nectarTheme.text,
    maxWidth: scale(190),
  },
  subtitle: {
    marginTop: scale(4),
    fontSize: scale(16),
    lineHeight: scale(22),
    color: '#7B7B82',
  },
  foot: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: scale(46),
    height: scale(46),
    borderRadius: scale(16),
    borderWidth: 1,
    borderColor: '#E2E2E2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityText: {
    marginHorizontal: scale(16),
    minWidth: scale(22),
    fontSize: scale(22),
    lineHeight: scale(26),
    fontWeight: '600',
    color: nectarTheme.text,
    textAlign: 'center',
  },
  price: {
    fontSize: scale(22),
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
  checkoutButton: {
    height: scale(60),
    borderRadius: scale(20),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: nectarTheme.green,
  },
  checkoutLabel: {
    fontSize: scale(18),
    lineHeight: scale(24),
    fontWeight: '700',
    color: '#FFFFFF',
  },
  checkoutTotalBadge: {
    position: 'absolute',
    right: scale(14),
    minWidth: scale(48),
    paddingHorizontal: scale(8),
    height: scale(24),
    borderRadius: scale(12),
    backgroundColor: 'rgba(72, 158, 105, 0.94)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkoutTotalText: {
    fontSize: scale(11),
    lineHeight: scale(14),
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
