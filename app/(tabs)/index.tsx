import { StyleSheet, TextInput, View, FlatList, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';

// Données de test pour la recherche
const mockUsers = [
  { login: "jdoe", level: 12 },
  { login: "alice42", level: 8 },
  { login: "bob21", level: 15 },
  { login: "charlie99", level: 10 },
  { login: "david77", level: 6 }
];

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(mockUsers);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    const filtered = mockUsers.filter(user =>
      user.login.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const renderUserItem = ({ item }: { item: { login: string; level: number } }) => (
    <TouchableOpacity style={styles.userItem}>
      <Text style={styles.userLogin}>{item.login}</Text>
      <Text style={styles.userLevel}>Level {item.level}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search users..."
          value={searchQuery}
          onChangeText={handleSearch}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      <FlatList
        data={filteredUsers}
        renderItem={renderUserItem}
        keyExtractor={item => item.login}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No users found</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  searchInput: {
    height: 40,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  listContainer: {
    padding: 16,
  },
  userItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    marginBottom: 8,
  },
  userLogin: {
    fontSize: 16,
    fontWeight: '600',
  },
  userLevel: {
    fontSize: 14,
    color: Colors.light.tint,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 32,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
});
