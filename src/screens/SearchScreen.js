import React, { useMemo } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

import ProductCard from '../components/ProductCard';
import { searchProducts } from '../data/data';
import { nectarTheme } from '../data/nectarData';
import { scale } from '../utils/layout';

function SearchBar({ query, onChangeQuery, activeFilterCount, onOpenFilters }) {
  return (
    <View style={styles.searchRow}>
      <View style={styles.searchBar}>
        <Ionicons name="search-outline" size={scale(20)} color="#7C7C7C" />
        <TextInput
          value={query}
          onChangeText={onChangeQuery}
          placeholder="Search Store"
          placeholderTextColor="#7C7C7C"
          style={styles.searchInput}
        />
      </View>

      <TouchableOpacity activeOpacity={0.88} style={styles.filterButton} onPress={onOpenFilters}>
        <Ionicons name="options-outline" size={scale(18)} color={nectarTheme.text} />

        {activeFilterCount > 0 ? (
          <View style={styles.filterBadge}>
            <Text style={styles.filterBadgeText}>{activeFilterCount}</Text>
          </View>
        ) : null}
      </TouchableOpacity>
    </View>
  );
}

export default function SearchScreen({
  query,
  selectedFilters,
  onChangeQuery,
  onOpenFilters,
  onOpenProductDetail,
  onAddProduct,
}) {
  const products = useMemo(
    () => searchProducts(query, selectedFilters),
    [query, selectedFilters]
  );
  const activeFilterCount =
    selectedFilters.categories.length + selectedFilters.brands.length;

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar style="dark" />

      <FlatList
        data={products}
        numColumns={2}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.column}
        contentContainerStyle={styles.contentContainer}
        ListHeaderComponent={
          <View>
            <SearchBar
              query={query}
              onChangeQuery={onChangeQuery}
              activeFilterCount={activeFilterCount}
              onOpenFilters={onOpenFilters}
            />

            {activeFilterCount > 0 ? (
              <Text style={styles.filterSummary}>
                {selectedFilters.categories.concat(selectedFilters.brands).join(' • ')}
              </Text>
            ) : null}
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No matching products</Text>
            <Text style={styles.emptyText}>Try a different search term or update your filters.</Text>
          </View>
        }
        renderItem={({ item }) => (
          <ProductCard
            item={item}
            width={scale(172)}
            imageHeight={scale(76)}
            cardStyle={styles.card}
            onAdd={() => onAddProduct(item.id)}
            onPress={() => onOpenProductDetail(item.id)}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: nectarTheme.background,
  },
  contentContainer: {
    paddingHorizontal: scale(20),
    paddingTop: scale(10),
    paddingBottom: scale(120),
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(18),
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: scale(52),
    borderRadius: scale(16),
    backgroundColor: nectarTheme.input,
    paddingHorizontal: scale(16),
  },
  searchInput: {
    flex: 1,
    marginLeft: scale(10),
    fontSize: scale(15),
    color: nectarTheme.text,
  },
  filterButton: {
    width: scale(52),
    height: scale(52),
    borderRadius: scale(16),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F6F7F6',
    marginLeft: scale(12),
  },
  filterBadge: {
    position: 'absolute',
    top: scale(8),
    right: scale(8),
    minWidth: scale(18),
    height: scale(18),
    borderRadius: scale(9),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: nectarTheme.green,
    paddingHorizontal: scale(4),
  },
  filterBadgeText: {
    fontSize: scale(10),
    lineHeight: scale(12),
    fontWeight: '700',
    color: '#FFFFFF',
  },
  filterSummary: {
    fontSize: scale(13),
    lineHeight: scale(18),
    color: nectarTheme.green,
    marginBottom: scale(16),
  },
  column: {
    justifyContent: 'space-between',
  },
  card: {
    marginBottom: scale(16),
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: scale(42),
  },
  emptyTitle: {
    fontSize: scale(18),
    lineHeight: scale(22),
    fontWeight: '600',
    color: nectarTheme.text,
  },
  emptyText: {
    marginTop: scale(8),
    fontSize: scale(14),
    lineHeight: scale(20),
    color: nectarTheme.mutedText,
    textAlign: 'center',
    maxWidth: scale(240),
  },
});
