import React from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

import ProductCard from '../components/ProductCard';
import { beverages, nectarTheme } from '../data/nectarData';
import { scale } from '../utils/layout';

export default function BeveragesScreen({
  onBack,
  onOpenProductDetail,
  onAddProduct,
  onOpenSearch,
}) {
  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar style="dark" />

      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity activeOpacity={0.85} onPress={onBack}>
            <Ionicons name="chevron-back" size={scale(28)} color={nectarTheme.text} />
          </TouchableOpacity>

          <Text style={styles.title}>Beverages</Text>

          <TouchableOpacity activeOpacity={0.85} onPress={onOpenSearch}>
            <Ionicons name="options-outline" size={scale(24)} color={nectarTheme.text} />
          </TouchableOpacity>
        </View>

        <FlatList
          data={beverages}
          numColumns={2}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={styles.column}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <ProductCard
              item={item}
              width={scale(172)}
              imageHeight={scale(104)}
              cardStyle={styles.card}
              onAdd={() => onAddProduct(item.id)}
              onPress={() => onOpenProductDetail(item.id)}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: nectarTheme.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: scale(20),
    paddingTop: scale(8),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: scale(16),
  },
  title: {
    fontSize: scale(26),
    lineHeight: scale(32),
    fontWeight: '600',
    color: nectarTheme.text,
  },
  column: {
    justifyContent: 'space-between',
  },
  listContent: {
    paddingBottom: scale(120),
  },
  card: {
    marginBottom: scale(16),
  },
});
