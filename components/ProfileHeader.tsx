import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import LevelBar from './LevelBar';
import SvgImage from './SvgImage';
import { ProfileData } from '../types/api42.types';
import { Ionicons } from '@expo/vector-icons';

interface ProfileHeaderProps {
  profile: ProfileData;
  selectedCursusId: string;
  onCursusChange: (cursusId: string) => void;
  isDropdownOpen: boolean;
  setIsDropdownOpen: (isOpen: boolean) => void;
}

export default function ProfileHeader({
  profile,
  selectedCursusId,
  onCursusChange,
  isDropdownOpen,
  setIsDropdownOpen,
}: ProfileHeaderProps) {
  const coalitionColor = profile.coalition?.color || '#00BABC';
  const coalitionImage = profile.coalition?.image_url || '';
  const avatar = profile.image.link || 'https://cdn.intra.42.fr/users/849659cfad506ac81c73c6b3228401e8/default.jpg';

  const cursusOptions = profile.cursus_users.map(cursus => ({
    id: cursus.cursus_id.toString(),
    name: cursus.cursus.name
  }));

  const currentCursus = cursusOptions.find(cursus => cursus.id === selectedCursusId);
  const currentCursusUser = profile.cursus_users.find(
    cursus => cursus.cursus_id.toString() === selectedCursusId
  );

  return (
    <View style={styles.header}>
      <Image source={{ uri: avatar }} style={[styles.avatar, { borderColor: coalitionColor }]} />

      {coalitionImage && (
        <View style={[styles.coalitionAvatarContainer, { backgroundColor: coalitionColor }]}>
          <SvgImage uri={coalitionImage} fill="white" />
        </View>
      )}

      <View style={styles.headerInfo}>
        <Text style={styles.displayName}>{profile.usual_full_name || profile.displayname}</Text>
        <Text style={styles.login}>@{profile.login}</Text>

        <View style={styles.dropdownContainer}>
          <TouchableOpacity
            style={[
              styles.dropdownButton,
              isDropdownOpen && styles.dropdownButtonOpen,
              { borderColor: coalitionColor }
            ]}
            onPress={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <Text style={styles.dropdownButtonText}>{currentCursus?.name || 'Sélectionner un cursus'}</Text>
            <Ionicons
              name={isDropdownOpen ? "chevron-up" : "chevron-down"}
              size={16}
              color="#fff"
            />
          </TouchableOpacity>

          {isDropdownOpen && (
            <View style={styles.dropdownList}>
              <ScrollView style={styles.optionsList} bounces={false}>
                {cursusOptions.map((cursus) => (
                  <TouchableOpacity
                    key={cursus.id}
                    style={[
                      styles.optionItem,
                      cursus.id === selectedCursusId && { backgroundColor: coalitionColor }
                    ]}
                    onPress={() => {
                      onCursusChange(cursus.id);
                      setIsDropdownOpen(false);
                    }}
                  >
                    <Text style={styles.optionText}>{cursus.name}</Text>
                    {cursus.id === selectedCursusId && (
                      <Ionicons name="checkmark" size={20} color="#fff" />
                    )}
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
        </View>

        <LevelBar level={currentCursusUser?.level || 0} color={coalitionColor} />

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
  },
  headerInfo: {
    marginLeft: 15,
    flex: 1,
    gap: 2,
  },
  avatar: {
    width: 150,
    height: 150,
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
    marginBottom: 4,
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
    left: 120,
    bottom: 15,
    borderRadius: 30,
    padding: 5,
  },
  dropdownContainer: {
    position: 'relative',
    zIndex: 1,
    marginBottom: 8,
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 6,
    borderWidth: 1,
  },
  dropdownButtonOpen: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  dropdownButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  dropdownList: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    maxHeight: 150,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  optionsList: {
    padding: 4,
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    borderRadius: 6,
    marginVertical: 1,
  },
  optionText: {
    color: '#fff',
    fontSize: 14,
  },
}); 