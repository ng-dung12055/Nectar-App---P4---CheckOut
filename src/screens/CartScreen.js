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

function QuantityControl({ quantity, onDecrease, onIncrease }) {
  return (
    <View style={styles.quantityControl}>
      <Pressable style={styles.quantityButton} onPress={onDecrease}>
        <Ionicons name="remove" size={22} color="#8C8C8C" />
      </Pressable>

      <Text style={styles.quantityText}>{quantity}</Text>

      <Pressable style={styles.quantityButton} onPress={onIncrease}>
        <Ionicons name="add" size={22} color={nectarTheme.green} />
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
            <Ionicons name="close" size={24} color="#8C8C8C" />
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
    paddingVertical: 22,
  },
  divider: {
    height: 1,
    backgroundColor: '#EDEDED',
  },
  productImage: {
    width: 92,
    height: 92,
    marginRight: 18,
  },
  meta: {
    flex: 1,
  },
  head: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  name: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '700',
    color: nectarTheme.text,
    maxWidth: 210,
  },
  subtitle: {
    marginTop: 6,
    fontSize: 18,
    lineHeight: 24,
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
    width: 52,
    height: 52,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E2E2E2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityText: {
    marginHorizontal: 20,
    minWidth: 24,
    fontSize: 26,
    lineHeight: 30,
    fontWeight: '600',
    color: nectarTheme.text,
    textAlign: 'center',
  },
  price: {
    fontSize: 26,
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
  checkoutButton: {
    height: 68,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: nectarTheme.green,
  },
  checkoutLabel: {
    fontSize: 20,
    lineHeight: 26,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  checkoutTotalBadge: {
    position: 'absolute',
    right: 14,
    minWidth: 52,
    paddingHorizontal: 10,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(72, 158, 105, 0.94)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkoutTotalText: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
