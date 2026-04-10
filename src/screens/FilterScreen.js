import React, { useEffect, useMemo, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

import { filterBrandOptions, filterCategoryOptions } from '../data/data';
import { nectarTheme } from '../data/nectarData';
import { scale } from '../utils/layout';

function normalizeFilters(filters) {
  return {
    categories: Array.isArray(filters?.categories) ? filters.categories : [],
    brands: Array.isArray(filters?.brands) ? filters.brands : [],
  };
}

function FilterOption({ label, selected, onPress }) {
  return (
    <TouchableOpacity activeOpacity={0.88} style={styles.optionRow} onPress={onPress}>
      <View style={[styles.checkbox, selected ? styles.checkboxSelected : null]}>
        {selected ? <Ionicons name="checkmark" size={scale(13)} color="#FFFFFF" /> : null}
      </View>
      <Text style={[styles.optionLabel, selected ? styles.optionLabelSelected : null]}>{label}</Text>
    </TouchableOpacity>
  );
}

export default function FilterScreen({ appliedFilters, onClose, onApplyFilters }) {
  const [selectedFilters, setSelectedFilters] = useState(() => normalizeFilters(appliedFilters));

  useEffect(() => {
    setSelectedFilters(normalizeFilters(appliedFilters));
  }, [appliedFilters]);

  const selectedCount = useMemo(
    () => selectedFilters.categories.length + selectedFilters.brands.length,
    [selectedFilters]
  );

  const toggleGroupValue = (group, value) => {
    setSelectedFilters((current) => {
      const currentValues = current[group];
      const nextValues = currentValues.includes(value)
        ? currentValues.filter((item) => item !== value)
        : [...currentValues, value];

      return {
        ...current,
        [group]: nextValues,
      };
    });
  };

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar style="dark" />

      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.85} onPress={onClose}>
          <Ionicons name="close" size={scale(24)} color={nectarTheme.text} />
        </TouchableOpacity>

        <Text style={styles.title}>Filters</Text>

        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.sheet}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.sheetContent}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Categories</Text>

            {filterCategoryOptions.map((option) => (
              <FilterOption
                key={option}
                label={option}
                selected={selectedFilters.categories.includes(option)}
                onPress={() => toggleGroupValue('categories', option)}
              />
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Brand</Text>

            {filterBrandOptions.map((option) => (
              <FilterOption
                key={option}
                label={option}
                selected={selectedFilters.brands.includes(option)}
                onPress={() => toggleGroupValue('brands', option)}
              />
            ))}
          </View>
        </ScrollView>

        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.applyButton}
          onPress={() => onApplyFilters(selectedFilters)}
        >
          <Text style={styles.applyText}>
            Apply Filter{selectedCount > 0 ? ` (${selectedCount})` : ''}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: nectarTheme.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(24),
    paddingTop: scale(10),
    paddingBottom: scale(16),
  },
  headerSpacer: {
    width: scale(24),
  },
  title: {
    fontSize: scale(20),
    lineHeight: scale(24),
    fontWeight: '600',
    color: nectarTheme.text,
  },
  sheet: {
    flex: 1,
    backgroundColor: '#F2F3F2',
    borderTopLeftRadius: scale(30),
    borderTopRightRadius: scale(30),
    paddingHorizontal: scale(24),
    paddingTop: scale(26),
    paddingBottom: scale(24),
  },
  sheetContent: {
    paddingBottom: scale(24),
  },
  section: {
    marginBottom: scale(28),
  },
  sectionTitle: {
    fontSize: scale(24),
    lineHeight: scale(29),
    fontWeight: '600',
    color: nectarTheme.text,
    marginBottom: scale(18),
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(18),
  },
  checkbox: {
    width: scale(20),
    height: scale(20),
    borderRadius: scale(6),
    borderWidth: 1,
    borderColor: '#B1B1B1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    backgroundColor: nectarTheme.green,
    borderColor: nectarTheme.green,
  },
  optionLabel: {
    marginLeft: scale(12),
    fontSize: scale(16),
    lineHeight: scale(20),
    color: nectarTheme.text,
  },
  optionLabelSelected: {
    color: nectarTheme.green,
  },
  applyButton: {
    height: scale(64),
    borderRadius: scale(20),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: nectarTheme.green,
  },
  applyText: {
    fontSize: scale(18),
    lineHeight: scale(22),
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
