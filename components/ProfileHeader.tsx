import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import LevelBar from './LevelBar';
import SvgImage from './SvgImage';
import { ProfileData } from '../types/api42.types';

interface ProfileHeaderProps {
  profile: ProfileData;
}

export default function ProfileHeader({ profile }: ProfileHeaderProps) {
  const coalitionColor = profile.coalition?.color || '#00BABC';
  const coalitionImage = profile.coalition?.image_url || '';
  const avatar = profile.image.link || 'https://cdn.intra.42.fr/users/849659cfad506ac81c73c6b3228401e8/default.jpg';

  return (
    <View style={styles.header}>
      <Image source={{ uri: avatar }} style={[styles.avatar, { borderColor: coalitionColor }]} />

      <View style={styles.headerInfo}>
        <Text style={styles.displayName}>{profile.usual_full_name || profile.displayname}</Text>
        <Text style={styles.login}>@{profile.login}</Text>
        <LevelBar level={profile.cursus_users[profile.cursus_users.length - 1].level} color={coalitionColor} />

        {coalitionImage && (
          <View style={[styles.coalitionAvatarContainer, { backgroundColor: coalitionColor }]}>
            <SvgImage uri={coalitionImage} fill="white" />
          </View>
        )}

        <View style={styles.stats}>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{profile.rank || '-'}</Text>
            <Text style={styles.statLabel}>Rank</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{profile.correction_point}</Text>
            <Text style={styles.statLabel}>Eval.Pt</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{profile.wallet}</Text>
            <Text style={styles.statLabel}>Wallet</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingBottom: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#dedfe0',
    position: 'relative',
  },
  headerInfo: {
    marginLeft: 15,
    flex: 1,
    gap: 2,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 80,
    borderWidth: 3,
  },
  displayName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  login: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 8,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stat: {
    flex: 1,
    alignItems: 'center',
    marginTop: 5,
  },
  statLabel: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
  },
  statValue: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  coalitionAvatarContainer: {
    width: 50,
    height: 50,
    position: 'absolute',
    right: 0,
    top: 0,
    borderRadius: 10,
    padding: 5,
  },
}); 