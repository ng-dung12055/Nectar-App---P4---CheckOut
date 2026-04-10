import React, { useMemo, useState } from 'react';
import { Image, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

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
import BeveragesScreen from './src/screens/BeveragesScreen';
import CartScreen from './src/screens/CartScreen';
import ExploreScreen from './src/screens/ExploreScreen';
import FavouriteScreen from './src/screens/FavouriteScreen';
import FilterScreen from './src/screens/FilterScreen';
import HomeScreen from './src/screens/HomeScreen';
import OrderAcceptedScreen from './src/screens/OrderAcceptedScreen';
import ProductDetailScreen from './src/screens/ProductDetailScreen';
import SearchScreen from './src/screens/SearchScreen';
import { isWebPreview, scale } from './src/utils/layout';

function createHomeRoute() {
  return { name: 'Home' };
}

function createExploreRoute() {
  return { name: 'Explore' };
}

function createEmptyFilters() {
  return {
    categories: [],
    brands: [],
  };
}

function cloneFilters(filters) {
  return {
    categories: Array.isArray(filters?.categories) ? [...filters.categories] : [],
    brands: Array.isArray(filters?.brands) ? [...filters.brands] : [],
  };
}

function buildPreset(overrides = {}) {
  return {
    tab: 'shop',
    overlay: null,
    shopStack: [createHomeRoute()],
    exploreStack: [createExploreRoute()],
    searchQuery: 'egg',
    selectedFilters: createEmptyFilters(),
    ...overrides,
  };
}

const SCREEN_PRESETS = {
  home: buildPreset(),
  'product-detail': buildPreset({
    shopStack: [createHomeRoute(), { name: 'ProductDetail', productId: 'apple' }],
  }),
  explore: buildPreset({
    tab: 'explore',
  }),
  beverages: buildPreset({
    tab: 'explore',
    exploreStack: [createExploreRoute(), { name: 'Beverages' }],
  }),
  search: buildPreset({
    tab: 'explore',
    exploreStack: [createExploreRoute(), { name: 'Search' }],
  }),
  filter: buildPreset({
    tab: 'explore',
    exploreStack: [createExploreRoute(), { name: 'Search' }, { name: 'Filter' }],
  }),
  cart: buildPreset({
    tab: 'cart',
  }),
  checkout: buildPreset({
    tab: 'cart',
    overlay: 'checkout',
  }),
  'order-accepted': buildPreset({
    tab: 'cart',
    overlay: 'orderAccepted',
  }),
  favourite: buildPreset({
    tab: 'favourite',
  }),
  error: buildPreset({
    tab: 'favourite',
    overlay: 'error',
  }),
  account: buildPreset({
    tab: 'account',
  }),
};

function getInitialPreset() {
  if (Platform.OS !== 'web' || typeof window === 'undefined') {
    return buildPreset();
  }

  const params = new URLSearchParams(window.location.search);
  const screen = params.get('screen');
  const preset = SCREEN_PRESETS[screen] ?? buildPreset();

  return {
    ...preset,
    shopStack: preset.shopStack.map((route) => ({ ...route })),
    exploreStack: preset.exploreStack.map((route) => ({ ...route })),
    selectedFilters: cloneFilters(preset.selectedFilters),
  };
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
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.overlayRoot}>
      <Pressable style={styles.overlayBackdrop} onPress={onClose} />

      <View
        style={[
          styles.checkoutSheet,
          {
            paddingBottom: scale(26) + Math.max(insets.bottom, scale(10)),
          },
        ]}
      >
        <View style={styles.sheetHeader}>
          <Text style={styles.sheetTitle}>Checkout</Text>

          <Pressable hitSlop={10} onPress={onClose}>
            <Ionicons name="close" size={scale(30)} color={nectarTheme.text} />
          </Pressable>
        </View>

        <View style={styles.checkoutRows}>
          <View style={styles.checkoutRow}>
            <Text style={styles.checkoutLabel}>Delivery</Text>
            <View style={styles.checkoutValueWrap}>
              <Text style={styles.checkoutValue}>Select Method</Text>
              <Ionicons name="chevron-forward" size={scale(24)} color={nectarTheme.text} />
            </View>
          </View>

          <View style={styles.checkoutRow}>
            <Text style={styles.checkoutLabel}>Pament</Text>
            <View style={styles.checkoutValueWrap}>
              <PaymentBadge />
              <Ionicons name="chevron-forward" size={scale(24)} color={nectarTheme.text} />
            </View>
          </View>

          <View style={styles.checkoutRow}>
            <Text style={styles.checkoutLabel}>Promo Code</Text>
            <View style={styles.checkoutValueWrap}>
              <Text style={styles.checkoutValue}>Pick discount</Text>
              <Ionicons name="chevron-forward" size={scale(24)} color={nectarTheme.text} />
            </View>
          </View>

          <View style={styles.checkoutRow}>
            <Text style={styles.checkoutLabel}>Total Cost</Text>
            <View style={styles.checkoutValueWrap}>
              <Text style={styles.checkoutCost}>${total.toFixed(2)}</Text>
              <Ionicons name="chevron-forward" size={scale(24)} color={nectarTheme.text} />
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
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.overlayRoot}>
      <View style={styles.overlayBackdrop} />

      <View
        style={[
          styles.errorCard,
          {
            marginBottom: scale(16) + Math.max(insets.bottom, scale(12)),
          },
        ]}
      >
        <Pressable hitSlop={10} style={styles.errorClose} onPress={onClose}>
          <Ionicons name="close" size={scale(28)} color={nectarTheme.text} />
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
  return (
    <SafeAreaProvider>
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const preset = useMemo(() => getInitialPreset(), []);
  const [activeTab, setActiveTab] = useState(preset.tab);
  const [overlay, setOverlay] = useState(preset.overlay);
  const [shopStack, setShopStack] = useState(preset.shopStack);
  const [exploreStack, setExploreStack] = useState(preset.exploreStack);
  const [searchQuery, setSearchQuery] = useState(preset.searchQuery);
  const [selectedFilters, setSelectedFilters] = useState(preset.selectedFilters);
  const [cartItems, setCartItems] = useState(() =>
    defaultCartSeed.map((entry) => ({
      ...buildCartItem(entry.productId),
      quantity: entry.quantity,
    }))
  );
  const [favoriteIds, setFavoriteIds] = useState(defaultFavoriteIds);

  const shopRoute = shopStack[shopStack.length - 1] ?? createHomeRoute();
  const exploreRoute = exploreStack[exploreStack.length - 1] ?? createExploreRoute();
  const favoriteItems = useMemo(
    () => favoriteIds.map((productId) => getProductDetail(productId)),
    [favoriteIds]
  );
  const total = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems]
  );

  const addProductToCart = (productId, quantity = 1) => {
    setCartItems((currentItems) => {
      const matchedItem = currentItems.find((item) => item.id === productId);

      if (matchedItem) {
        return currentItems.map((item) =>
          item.id === productId
            ? {
                ...item,
                quantity: item.quantity + quantity,
              }
            : item
        );
      }

      return [
        ...currentItems,
        {
          ...buildCartItem(productId),
          quantity,
        },
      ];
    });
  };

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

  const toggleFavorite = (productId) => {
    setFavoriteIds((currentIds) =>
      currentIds.includes(productId)
        ? currentIds.filter((id) => id !== productId)
        : [...currentIds, productId]
    );
  };

  const resetToHome = () => {
    setOverlay(null);
    setActiveTab('shop');
    setShopStack([createHomeRoute()]);
  };

  const openShopProductDetail = (productId) => {
    setOverlay(null);
    setActiveTab('shop');
    setShopStack([createHomeRoute(), { name: 'ProductDetail', productId }]);
  };

  const goBackInShop = () => {
    setShopStack((currentStack) =>
      currentStack.length > 1 ? currentStack.slice(0, -1) : [createHomeRoute()]
    );
  };

  const openExploreRoot = () => {
    setOverlay(null);
    setActiveTab('explore');
    setExploreStack([createExploreRoute()]);
  };

  const openSearch = (nextQuery = searchQuery) => {
    setOverlay(null);
    setActiveTab('explore');
    setSearchQuery(nextQuery);
    setExploreStack([createExploreRoute(), { name: 'Search' }]);
  };

  const openExploreCategory = (category) => {
    if (category.routeName === 'Beverages') {
      setOverlay(null);
      setActiveTab('explore');
      setExploreStack([createExploreRoute(), { name: 'Beverages' }]);
      return;
    }

    const categoryQuery = category.name.replace(/\n/g, ' ');
    setSelectedFilters(createEmptyFilters());
    openSearch(categoryQuery);
  };

  const openFilter = () => {
    setExploreStack((currentStack) => {
      if (currentStack[currentStack.length - 1]?.name === 'Filter') {
        return currentStack;
      }

      return [...currentStack, { name: 'Filter' }];
    });
  };

  const goBackInExplore = () => {
    setExploreStack((currentStack) =>
      currentStack.length > 1 ? currentStack.slice(0, -1) : [createExploreRoute()]
    );
  };

  const applyFilters = (filters) => {
    setSelectedFilters(cloneFilters(filters));
    setExploreStack([createExploreRoute(), { name: 'Search' }]);
  };

  const openExploreProductDetail = (productId) => {
    setExploreStack((currentStack) => {
      const stackWithoutFilter =
        currentStack[currentStack.length - 1]?.name === 'Filter'
          ? currentStack.slice(0, -1)
          : currentStack;

      return [...stackWithoutFilter, { name: 'ProductDetail', productId }];
    });
  };

  const addAllFavoritesToCart = () => {
    setOverlay('error');
  };

  const handleTabChange = (nextTab) => {
    setOverlay(null);
    setActiveTab(nextTab);

    if (nextTab === 'shop') {
      setShopStack([createHomeRoute()]);
    }

    if (nextTab === 'explore') {
      setExploreStack([createExploreRoute()]);
    }
  };

  const handlePlaceOrder = () => {
    setOverlay('orderAccepted');
  };

  const renderShopScreen = () => {
    if (shopRoute.name === 'ProductDetail') {
      return (
        <ProductDetailScreen
          productId={shopRoute.productId}
          onBack={goBackInShop}
          onAddToBasket={addProductToCart}
          onToggleFavorite={toggleFavorite}
          isFavorite={favoriteIds.includes(shopRoute.productId)}
        />
      );
    }

    return (
      <HomeScreen
        onOpenExplore={openExploreRoot}
        onOpenProductDetail={openShopProductDetail}
        onAddProduct={addProductToCart}
      />
    );
  };

  const renderExploreScreen = () => {
    if (exploreRoute.name === 'Beverages') {
      return (
        <BeveragesScreen
          onBack={goBackInExplore}
          onOpenProductDetail={openExploreProductDetail}
          onAddProduct={addProductToCart}
          onOpenSearch={() => openSearch('egg')}
        />
      );
    }

    if (exploreRoute.name === 'Search') {
      return (
        <SearchScreen
          query={searchQuery}
          selectedFilters={selectedFilters}
          onChangeQuery={setSearchQuery}
          onOpenFilters={openFilter}
          onOpenProductDetail={openExploreProductDetail}
          onAddProduct={addProductToCart}
        />
      );
    }

    if (exploreRoute.name === 'Filter') {
      return (
        <FilterScreen
          appliedFilters={selectedFilters}
          onClose={goBackInExplore}
          onApplyFilters={applyFilters}
        />
      );
    }

    if (exploreRoute.name === 'ProductDetail') {
      return (
        <ProductDetailScreen
          productId={exploreRoute.productId}
          onBack={goBackInExplore}
          onAddToBasket={addProductToCart}
          onToggleFavorite={toggleFavorite}
          isFavorite={favoriteIds.includes(exploreRoute.productId)}
        />
      );
    }

    return (
      <ExploreScreen
        onOpenSearch={() => openSearch('egg')}
        onOpenCategory={openExploreCategory}
      />
    );
  };

  const renderTabScreen = () => {
    if (activeTab === 'shop') {
      return renderShopScreen();
    }

    if (activeTab === 'explore') {
      return renderExploreScreen();
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
          onAddAllToCart={addAllFavoritesToCart}
          onOpenItem={openShopProductDetail}
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

  const currentRouteName =
    activeTab === 'shop' ? shopRoute.name : activeTab === 'explore' ? exploreRoute.name : activeTab;
  const showOrderAccepted = overlay === 'orderAccepted';
  const showTabBar = !showOrderAccepted && !['ProductDetail', 'Filter'].includes(currentRouteName);

  return (
    <View style={styles.shell}>
      <StatusBar style="dark" translucent={!isWebPreview} />

      <View style={styles.phoneFrame}>
        {showOrderAccepted ? (
          <OrderAcceptedScreen
            onTrackOrder={() => {
              setOverlay(null);
              setActiveTab('cart');
            }}
            onBackHome={resetToHome}
          />
        ) : (
          <>
            {renderTabScreen()}

            {showTabBar ? <BottomTabBar activeTab={activeTab} onSelect={handleTabChange} /> : null}

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
                onBackHome={resetToHome}
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
    backgroundColor: isWebPreview ? '#EEF1ED' : '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: isWebPreview ? scale(24) : 0,
  },
  phoneFrame: {
    flex: 1,
    width: '100%',
    maxWidth: 430,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    borderRadius: isWebPreview ? scale(34) : 0,
    shadowColor: isWebPreview ? '#000000' : 'transparent',
    shadowOffset: { width: 0, height: scale(18) },
    shadowOpacity: isWebPreview ? 0.1 : 0,
    shadowRadius: scale(28),
    elevation: isWebPreview ? 12 : 0,
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
    borderTopLeftRadius: scale(28),
    borderTopRightRadius: scale(28),
    paddingHorizontal: scale(24),
    paddingTop: scale(24),
  },
  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: scale(16),
  },
  sheetTitle: {
    fontSize: scale(30),
    lineHeight: scale(36),
    fontWeight: '700',
    color: nectarTheme.text,
  },
  checkoutRows: {
    borderTopWidth: 1,
    borderTopColor: '#EAEAEA',
  },
  checkoutRow: {
    paddingVertical: scale(18),
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  checkoutLabel: {
    fontSize: scale(20),
    lineHeight: scale(26),
    fontWeight: '500',
    color: '#8D8E95',
  },
  checkoutValueWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkoutValue: {
    fontSize: scale(18),
    lineHeight: scale(24),
    fontWeight: '600',
    color: nectarTheme.text,
    marginRight: scale(8),
  },
  checkoutCost: {
    fontSize: scale(18),
    lineHeight: scale(24),
    fontWeight: '700',
    color: nectarTheme.text,
    marginRight: scale(8),
  },
  paymentBadge: {
    width: scale(38),
    height: scale(24),
    borderRadius: scale(4),
    backgroundColor: '#456AF6',
    justifyContent: 'center',
    marginRight: scale(10),
  },
  paymentCircleRed: {
    position: 'absolute',
    left: scale(9),
    width: scale(14),
    height: scale(14),
    borderRadius: scale(7),
    backgroundColor: '#ED1C2E',
  },
  paymentCircleOrange: {
    position: 'absolute',
    left: scale(20),
    width: scale(14),
    height: scale(14),
    borderRadius: scale(7),
    backgroundColor: '#F9B445',
  },
  termsText: {
    marginTop: scale(18),
    marginBottom: scale(22),
    fontSize: scale(17),
    lineHeight: scale(26),
    color: '#8D8E95',
  },
  termsStrong: {
    color: nectarTheme.text,
    fontWeight: '700',
  },
  primaryButton: {
    height: scale(62),
    borderRadius: scale(22),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: nectarTheme.green,
  },
  primaryButtonText: {
    fontSize: scale(19),
    lineHeight: scale(24),
    fontWeight: '700',
    color: '#FFFFFF',
  },
  errorCard: {
    marginHorizontal: scale(24),
    borderRadius: scale(28),
    backgroundColor: '#FFFFFF',
    paddingHorizontal: scale(22),
    paddingTop: scale(22),
    paddingBottom: scale(22),
    alignItems: 'center',
  },
  errorClose: {
    alignSelf: 'flex-start',
  },
  errorArtwork: {
    width: scale(206),
    height: scale(200),
    marginTop: scale(18),
    marginBottom: scale(20),
  },
  errorTitle: {
    fontSize: scale(30),
    lineHeight: scale(36),
    fontWeight: '700',
    color: nectarTheme.text,
    textAlign: 'center',
  },
  errorText: {
    marginTop: scale(14),
    marginBottom: scale(24),
    fontSize: scale(19),
    lineHeight: scale(26),
    color: '#8D8E95',
    textAlign: 'center',
  },
  secondaryTextButton: {
    marginTop: scale(18),
    paddingVertical: 4,
  },
  secondaryTextButtonLabel: {
    fontSize: scale(18),
    lineHeight: scale(24),
    fontWeight: '700',
    color: nectarTheme.text,
  },
});
