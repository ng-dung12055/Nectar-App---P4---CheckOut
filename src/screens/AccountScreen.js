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
import { getGraphicSource, nectarTheme } from '../data/nectarData';

const ACCOUNT_ITEMS = [
  { icon: 'bag-handle-outline', label: 'Orders' },
  { icon: 'card-outline', label: 'My Details' },
  { icon: 'location-outline', label: 'Delivery Address' },
  { icon: 'wallet-outline', label: 'Payment Methods' },
  { icon: 'ticket-outline', label: 'Promo Cord' },
  { icon: 'notifications-outline', label: 'Notifecations' },
  { icon: 'help-circle-outline', label: 'Help' },
  { icon: 'alert-circle-outline', label: 'About' },
];

function AccountRow({ icon, label, showDivider = true }) {
  return (
    <View style={styles.rowWrap}>
      <View style={styles.row}>
        <View style={styles.rowLeading}>
          <Ionicons name={icon} size={30} color={nectarTheme.text} />
          <Text style={styles.rowLabel}>{label}</Text>
        </View>

        <Ionicons name="chevron-forward" size={28} color={nectarTheme.text} />
      </View>

      {showDivider ? <View style={styles.rowDivider} /> : null}
    </View>
  );
}

export default function AccountScreen({ profileName, profileEmail }) {
  return (
    <View style={styles.screen}>
      <PhoneStatusBar />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileHeader}>
          <Image source={getGraphicSource('profileAvatar')} style={styles.avatar} />

          <View style={styles.profileMeta}>
            <View style={styles.nameRow}>
              <Text style={styles.name}>{profileName}</Text>
              <Ionicons name="pencil" size={20} color={nectarTheme.green} />
            </View>
            <Text style={styles.email}>{profileEmail}</Text>
          </View>
        </View>

        <View style={styles.sectionDivider} />

        {ACCOUNT_ITEMS.map((item, index) => (
          <AccountRow
            key={item.label}
            icon={item.icon}
            label={item.label}
            showDivider={index !== ACCOUNT_ITEMS.length - 1}
          />
        ))}

        <Pressable style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={34} color={nectarTheme.green} />
          <Text style={styles.logoutText}>Log Out</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    paddingBottom: 160,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 26,
    paddingBottom: 28,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
  },
  profileMeta: {
    marginLeft: 18,
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: 32,
    lineHeight: 38,
    fontWeight: '700',
    color: nectarTheme.text,
    marginRight: 12,
  },
  email: {
    marginTop: 6,
    fontSize: 22,
    lineHeight: 28,
    color: '#8A8A8F',
  },
  sectionDivider: {
    height: 1,
    backgroundColor: '#E9E9E9',
  },
  rowWrap: {
    paddingHorizontal: 24,
  },
  row: {
    minHeight: 92,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowLeading: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowLabel: {
    marginLeft: 26,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '600',
    color: nectarTheme.text,
  },
  rowDivider: {
    height: 1,
    backgroundColor: '#EAEAEA',
  },
  logoutButton: {
    marginTop: 24,
    marginHorizontal: 24,
    height: 76,
    borderRadius: 24,
    backgroundColor: '#F4F4F4',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  logoutText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '600',
    color: nectarTheme.green,
    marginRight: 30,
  },
});
