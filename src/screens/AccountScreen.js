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
import { scale } from '../utils/layout';

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
          <Ionicons name={icon} size={scale(26)} color={nectarTheme.text} />
          <Text style={styles.rowLabel}>{label}</Text>
        </View>

        <Ionicons name="chevron-forward" size={scale(24)} color={nectarTheme.text} />
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
              <Ionicons name="pencil" size={scale(18)} color={nectarTheme.green} />
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
          <Ionicons name="log-out-outline" size={scale(28)} color={nectarTheme.green} />
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
    paddingBottom: scale(120),
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(24),
    paddingTop: scale(18),
    paddingBottom: scale(22),
  },
  avatar: {
    width: scale(64),
    height: scale(64),
    borderRadius: scale(32),
  },
  profileMeta: {
    marginLeft: scale(16),
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: scale(27),
    lineHeight: scale(32),
    fontWeight: '700',
    color: nectarTheme.text,
    marginRight: scale(10),
  },
  email: {
    marginTop: scale(4),
    fontSize: scale(17),
    lineHeight: scale(22),
    color: '#8A8A8F',
  },
  sectionDivider: {
    height: 1,
    backgroundColor: '#E9E9E9',
  },
  rowWrap: {
    paddingHorizontal: scale(24),
  },
  row: {
    minHeight: scale(76),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowLeading: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowLabel: {
    marginLeft: scale(18),
    fontSize: scale(23),
    lineHeight: scale(28),
    fontWeight: '600',
    color: nectarTheme.text,
  },
  rowDivider: {
    height: 1,
    backgroundColor: '#EAEAEA',
  },
  logoutButton: {
    marginTop: scale(18),
    marginHorizontal: scale(24),
    height: scale(66),
    borderRadius: scale(22),
    backgroundColor: '#F4F4F4',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(24),
    justifyContent: 'center',
  },
  logoutText: {
    flex: 1,
    textAlign: 'center',
    fontSize: scale(22),
    lineHeight: scale(28),
    fontWeight: '600',
    color: nectarTheme.green,
    marginRight: scale(22),
  },
});
