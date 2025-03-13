import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, ImageBackground, ActivityIndicator, SafeAreaView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useProfile } from '../hooks/useProfile';
import { ProjectUser, Skill, CursusUser } from '../types/api42.types';
import ProfileHeader from '../components/ProfileHeader';
import TabContainer from '../components/TabContainer';
import ProjectList from '../components/ProjectList';
import SkillList from '../components/SkillList';

type TabType = 'projects' | 'skills';

export default function ProfileScreen() {
  const params = useLocalSearchParams();
  const userLogin = params.login as string;
  const { profile, loading, error } = useProfile(userLogin);
  const [activeTab, setActiveTab] = useState<TabType>('projects');

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (error || !profile) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error || 'Profil non trouvé'}</Text>
      </View>
    );
  }

  const backgroundImage = profile.coalition?.cover_url
    ? { uri: profile.coalition.cover_url }
    : require('../assets/images/background.jpg');

  const coalitionColor = profile.coalition?.color || '#00BABC';
  const cursusId = profile.cursus_users[profile.cursus_users.length - 1].cursus_id;

  const projectsData = profile.projects_users
    .filter((item: ProjectUser) => item.cursus_ids.includes(cursusId));

  const skillsData = profile.cursus_users.find(
    (cursus: CursusUser) => cursus.cursus_id === cursusId)?.skills
    .map((item: Skill) => ({
      name: item.name,
      value: item.level
    }));

  return (
    <ImageBackground source={backgroundImage} style={styles.container} >
      <SafeAreaView style={styles.safeArea}>
        <ProfileHeader profile={profile} />

        <TabContainer
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          coalitionColor={coalitionColor}
        />

        <View style={styles.content}>
          {activeTab === 'projects' && (
            <ProjectList data={projectsData} />
          )}
          {activeTab === 'skills' && (
            <SkillList data={skillsData} color={coalitionColor} />
          )}
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  errorText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 20,
  },
  content: {
    flex: 1,
    paddingHorizontal: 14,
  },
}); 