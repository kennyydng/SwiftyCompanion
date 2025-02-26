import { StyleSheet, View, ScrollView, Image, RefreshControl, Text } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';

// Données de test temporaires
const mockUserData = {
  login: "jdoe",
  email: "john.doe@example.com",
  phone: "+33 6 12 34 56 78",
  level: 12,
  location: "Paris, France",
  wallet: 1000,
  skills: [
    { name: "C", level: 10, percentage: 80 },
    { name: "Python", level: 8, percentage: 65 },
    { name: "React", level: 6, percentage: 45 }
  ],
  projects: [
    { name: "ft_printf", status: "completed", finalMark: 100 },
    { name: "push_swap", status: "completed", finalMark: 85 },
    { name: "minishell", status: "failed", finalMark: 40 }
  ]
};

export default function ProfileScreen() {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simuler un rafraîchissement
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.login}>{mockUserData.login}</Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>User Information</Text>
          <Text>Email: {mockUserData.email}</Text>
          <Text>Phone: {mockUserData.phone}</Text>
          <Text>Level: {mockUserData.level}</Text>
          <Text>Location: {mockUserData.location}</Text>
          <Text>Wallet: {mockUserData.wallet}</Text>
        </View>

        <View style={styles.skillsSection}>
          <Text style={styles.sectionTitle}>Skills</Text>
          {mockUserData.skills.map((skill, index) => (
            <View key={index} style={styles.skillItem}>
              <Text>{skill.name}</Text>
              <View style={styles.progressBar}>
                <View style={[styles.progress, { width: `${skill.percentage}%` }]} />
              </View>
              <Text>Level {skill.level}</Text>
            </View>
          ))}
        </View>

        <View style={styles.projectsSection}>
          <Text style={styles.sectionTitle}>Projects</Text>
          {mockUserData.projects.map((project, index) => (
            <View key={index} style={styles.projectItem}>
              <Text>{project.name}</Text>
              <Text style={[
                styles.projectStatus,
                { color: project.status === 'completed' ? 'green' : 'red' }
              ]}>
                {project.status.toUpperCase()}
              </Text>
              <Text>Final Mark: {project.finalMark}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    padding: 20,
  },
  login: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  infoSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  skillsSection: {
    padding: 20,
  },
  skillItem: {
    marginBottom: 10,
  },
  progressBar: {
    height: 10,
    backgroundColor: '#eee',
    borderRadius: 5,
    marginVertical: 5,
  },
  progress: {
    height: '100%',
    backgroundColor: Colors.light.tint,
    borderRadius: 5,
  },
  projectsSection: {
    padding: 20,
  },
  projectItem: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
  },
  projectStatus: {
    fontWeight: 'bold',
  },
}); 