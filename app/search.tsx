import { StyleSheet, View, TextInput, FlatList, Text, Image, ImageBackground, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthProvider';
import { UserSearchResult } from '../types/api42.types';
import { useUserSearch } from '../hooks/useUserSearch';

export default function SearchScreen() {
  const router = useRouter();
  const { token } = useContext(AuthContext);
  const { searchQuery, results, isSearching, handleSearch } = useUserSearch(token);

  const handleUserPress = (user: UserSearchResult) => {
    router.push(`/profile?login=${user.login}`);
  };

  const renderUserItem = ({ item }: { item: UserSearchResult }) => (
    <Pressable style={styles.userCard} onPress={() => handleUserPress(item)} >
      <Image
        source={{ uri: item.avatar || 'https://cdn.intra.42.fr/users/849659cfad506ac81c73c6b3228401e8/default.jpg' }}
        style={styles.avatar}
      />
      <View style={styles.userInfo}>
        <Text style={styles.loginText}>{item.login}</Text>
        <Text style={styles.displayName}>{item.displayName}</Text>
      </View>
    </Pressable>
  );

  return (
    <ImageBackground
      source={require('../assets/images/background.jpg')}
      style={styles.container}
    >
      <View style={styles.overlay}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher un utilisateur..."
            placeholderTextColor="#rgba(255, 255, 255, 0.7)"
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>

        <FlatList
          data={results}
          renderItem={renderUserItem}
          keyExtractor={(item) => item.id}
          style={styles.resultsList}
          contentContainerStyle={styles.resultsContent}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>
                {isSearching ? 'Recherche en cours...' : 'Aucun résultat'}
              </Text>
            </View>
          }
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  searchContainer: {
    marginTop: 50,
    marginBottom: 5,
  },
  searchInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    padding: 15,
    color: '#fff',
    fontSize: 16,
  },
  resultsList: {
    flex: 1,
  },
  resultsContent: {
    paddingVertical: 10,
  },
  userCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  userInfo: {
    flex: 1,
  },
  loginText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  displayName: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  emptyStateText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 16,
  },
});
