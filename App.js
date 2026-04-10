import React, { useMemo, useState } from 'react';
import { Image, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

import BottomTabBar from './src/components/BottomTabBar';
import {
  defaultCartSeed,
  defaultFavoriteIds,
} from './src/data/data';
import {
  buildCartItem,
  getGraphicSource,
  getProductDetail,
  nectarTheme,
} from './src/data/nectarData';
import AccountScreen from './src/screens/AccountScreen';
import CartScreen from './src/screens/CartScreen';
import FavouriteScreen from './src/screens/FavouriteScreen';
import OrderAcceptedScreen from './src/screens/OrderAcceptedScreen';
import PlaceholderScreen from './src/screens/PlaceholderScreen';

const SCREEN_PRESETS = {
  checkout: { tab: 'cart', overlay: 'checkout' },
  'order-accepted': { tab: 'cart', overlay: 'orderAccepted' },
  error: { tab: 'favourite', overlay: 'error' },
  account: { tab: 'account', overlay: null },
};

function getInitialPreset() {
  if (Platform.OS !== 'web' || typeof window === 'undefined') {
    return { tab: 'cart', overlay: null };
  }

  const params = new URLSearchParams(window.location.search);
  const screen = params.get('screen');

  return SCREEN_PRESETS[screen] ?? { tab: 'cart', overlay: null };
}

function PaymentBadge() {
  return (
    <View style={styles.paymentBadge}>
      <View style={styles.paymentCircleRed} />
      <View style={styles.paymentCircleOrange} />
    </View>
  );
}

function CheckoutSheet({ total, onClose, onPlaceOrder }) {
  return (
    <View style={styles.overlayRoot}>
      <Pressable style={styles.overlayBackdrop} onPress={onClose} />

      <View style={styles.checkoutSheet}>
        <View style={styles.sheetHeader}>
          <Text style={styles.sheetTitle}>Checkout</Text>

          <Pressable hitSlop={10} onPress={onClose}>
            <Ionicons name="close" size={36} color={nectarTheme.text} />
          </Pressable>
        </View>

        <View style={styles.checkoutRows}>
          <View style={styles.checkoutRow}>
            <Text style={styles.checkoutLabel}>Delivery</Text>
            <View style={styles.checkoutValueWrap}>
              <Text style={styles.checkoutValue}>Select Method</Text>
              <Ionicons name="chevron-forward" size={28} color={nectarTheme.text} />
            </View>
          </View>

          <View style={styles.checkoutRow}>
            <Text style={styles.checkoutLabel}>Pament</Text>
            <View style={styles.checkoutValueWrap}>
              <PaymentBadge />
              <Ionicons name="chevron-forward" size={28} color={nectarTheme.text} />
            </View>
          </View>

          <View style={styles.checkoutRow}>
            <Text style={styles.checkoutLabel}>Promo Code</Text>
            <View style={styles.checkoutValueWrap}>
              <Text style={styles.checkoutValue}>Pick discount</Text>
              <Ionicons name="chevron-forward" size={28} color={nectarTheme.text} />
            </View>
          </View>

          <View style={styles.checkoutRow}>
            <Text style={styles.checkoutLabel}>Total Cost</Text>
            <View style={styles.checkoutValueWrap}>
              <Text style={styles.checkoutCost}>${total.toFixed(2)}</Text>
              <Ionicons name="chevron-forward" size={28} color={nectarTheme.text} />
            </View>
          </View>
        </View>

        <Text style={styles.termsText}>
          By placing an order you agree to our{'\n'}
          <Text style={styles.termsStrong}>Terms </Text>
          <Text style={styles.termsStrong}>And </Text>
          <Text style={styles.termsStrong}>Conditions</Text>
        </Text>

        <Pressable style={styles.primaryButton} onPress={onPlaceOrder}>
          <Text style={styles.primaryButtonText}>Place Order</Text>
        </Pressable>
      </View>
    </View>
  );
}

function ErrorModal({ onClose, onRetry, onBackHome }) {
  return (
    <View style={styles.overlayRoot}>
      <View style={styles.overlayBackdrop} />

      <View style={styles.errorCard}>
        <Pressable hitSlop={10} style={styles.errorClose} onPress={onClose}>
          <Ionicons name="close" size={34} color={nectarTheme.text} />
        </Pressable>

        <Image source={getGraphicSource('errorBag')} style={styles.errorArtwork} resizeMode="contain" />

        <Text style={styles.errorTitle}>Oops! Order Failed</Text>
        <Text style={styles.errorText}>Something went tembly wrong.</Text>

        <Pressable style={styles.primaryButton} onPress={onRetry}>
          <Text style={styles.primaryButtonText}>Please Try Again</Text>
        </Pressable>

        <Pressable style={styles.secondaryTextButton} onPress={onBackHome}>
          <Text style={styles.secondaryTextButtonLabel}>Back to home</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default function App() {
  const preset = useMemo(() => getInitialPreset(), []);
  const [activeTab, setActiveTab] = useState(preset.tab);
  const [overlay, setOverlay] = useState(preset.overlay);
  const [cartItems, setCartItems] = useState(() =>
    defaultCartSeed.map((entry) => ({
      ...buildCartItem(entry.productId),
      quantity: entry.quantity,
    }))
  );
  const [favoriteItems] = useState(() => defaultFavoriteIds.map((productId) => getProductDetail(productId)));

  const total = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems]
  );

  const changeCartItemQuantity = (id, delta) => {
    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: Math.max(item.quantity + delta, 0),
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleTabChange = (nextTab) => {
    setOverlay(null);
    setActiveTab(nextTab);
  };

  const handlePlaceOrder = () => {
    setOverlay('orderAccepted');
  };

  const handleBackHome = () => {
    setOverlay(null);
    setActiveTab('shop');
  };

  const renderTabScreen = () => {
    if (activeTab === 'shop') {
      return (
        <PlaceholderScreen
          eyebrow="Nectar Grocery"
          title="Shop Screen"
          subtitle="A clean PC preview so the requested checkout and account flows can be reviewed quickly."
          accent="green"
        />
      );
    }

    if (activeTab === 'explore') {
      return (
        <PlaceholderScreen
          eyebrow="Product Discovery"
          title="Explore Screen"
          subtitle="Use the bottom tabs to jump into Cart, Favourite, and Account states."
          accent="peach"
        />
      );
    }

    if (activeTab === 'cart') {
      return (
        <CartScreen
          items={cartItems}
          total={total}
          onDecrease={(id) => changeCartItemQuantity(id, -1)}
          onIncrease={(id) => changeCartItemQuantity(id, 1)}
          onRemove={(id) =>
            setCartItems((currentItems) => currentItems.filter((item) => item.id !== id))
          }
          onCheckout={() => setOverlay('checkout')}
        />
      );
    }

    if (activeTab === 'favourite') {
      return (
        <FavouriteScreen
          items={favoriteItems}
          onAddAllToCart={() => setOverlay('error')}
        />
      );
    }

    return (
      <AccountScreen
        profileName="Afsar Hossen"
        profileEmail="lmshuvo97@gmail.com"
      />
    );
  };

  const showOrderAccepted = overlay === 'orderAccepted';

  return (
    <View style={styles.shell}>
      <StatusBar style="dark" />

      <View style={styles.phoneFrame}>
        {showOrderAccepted ? (
          <OrderAcceptedScreen
            onTrackOrder={() => {
              setOverlay(null);
              setActiveTab('cart');
            }}
            onBackHome={handleBackHome}
          />
        ) : (
          <>
            {renderTabScreen()}

            <BottomTabBar activeTab={activeTab} onSelect={handleTabChange} />

            {overlay === 'checkout' ? (
              <CheckoutSheet
                total={total}
                onClose={() => setOverlay(null)}
                onPlaceOrder={handlePlaceOrder}
              />
            ) : null}

            {overlay === 'error' ? (
              <ErrorModal
                onClose={() => setOverlay(null)}
                onRetry={() => setOverlay(null)}
                onBackHome={handleBackHome}
              />
            ) : null}
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  shell: {
    flex: 1,
    backgroundColor: '#EEF1ED',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Platform.OS === 'web' ? 24 : 0,
  },
  phoneFrame: {
    flex: 1,
    width: '100%',
    maxWidth: 430,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    borderRadius: Platform.OS === 'web' ? 34 : 0,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 18 },
    shadowOpacity: 0.1,
    shadowRadius: 28,
    elevation: 12,
  },
  overlayRoot: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
  },
  overlayBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(24, 23, 37, 0.35)',
  },
  checkoutSheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 26,
    paddingTop: 30,
    paddingBottom: 44,
  },
  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  sheetTitle: {
    fontSize: 36,
    lineHeight: 42,
    fontWeight: '700',
    color: nectarTheme.text,
  },
  checkoutRows: {
    borderTopWidth: 1,
    borderTopColor: '#EAEAEA',
  },
  checkoutRow: {
    paddingVertical: 22,
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  checkoutLabel: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '500',
    color: '#8D8E95',
  },
  checkoutValueWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkoutValue: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '600',
    color: nectarTheme.text,
    marginRight: 10,
  },
  checkoutCost: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '700',
    color: nectarTheme.text,
    marginRight: 10,
  },
  paymentBadge: {
    width: 42,
    height: 26,
    borderRadius: 4,
    backgroundColor: '#456AF6',
    justifyContent: 'center',
    marginRight: 12,
  },
  paymentCircleRed: {
    position: 'absolute',
    left: 10,
    width: 15,
    height: 15,
    borderRadius: 8,
    backgroundColor: '#ED1C2E',
  },
  paymentCircleOrange: {
    position: 'absolute',
    left: 22,
    width: 15,
    height: 15,
    borderRadius: 8,
    backgroundColor: '#F9B445',
  },
  termsText: {
    marginTop: 22,
    marginBottom: 28,
    fontSize: 20,
    lineHeight: 30,
    color: '#8D8E95',
  },
  termsStrong: {
    color: nectarTheme.text,
    fontWeight: '700',
  },
  primaryButton: {
    height: 74,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: nectarTheme.green,
  },
  primaryButtonText: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  errorCard: {
    marginHorizontal: 26,
    marginBottom: 84,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 26,
    alignItems: 'center',
  },
  errorClose: {
    alignSelf: 'flex-start',
  },
  errorArtwork: {
    width: 246,
    height: 240,
    marginTop: 24,
    marginBottom: 26,
  },
  errorTitle: {
    fontSize: 36,
    lineHeight: 42,
    fontWeight: '700',
    color: nectarTheme.text,
    textAlign: 'center',
  },
  errorText: {
    marginTop: 18,
    marginBottom: 34,
    fontSize: 24,
    lineHeight: 30,
    color: '#8D8E95',
    textAlign: 'center',
  },
  secondaryTextButton: {
    marginTop: 26,
    paddingVertical: 4,
  },
  secondaryTextButtonLabel: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '700',
    color: nectarTheme.text,
  },
});
