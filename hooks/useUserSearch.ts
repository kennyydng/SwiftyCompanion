import { useState, useEffect } from 'react';
import { searchUsers, UserSearchResult } from '../services/api42';

export function useUserSearch(token: string) {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<UserSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery.length < 2) {
        setResults([]);
        setIsSearching(false);
        return;
      }

      setIsSearching(true);
      try {
        const searchResults = await searchUsers(searchQuery, token);
        setResults(searchResults);
      } catch (error) {
        console.error('Erreur de recherche:', error);
        setResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 200); // Délai de 200ms

    return () => clearTimeout(timeoutId); // Nettoie le timeout si l'utilisateur tape à nouveau
  }, [searchQuery, token]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return {
    searchQuery,
    results,
    isSearching,
    handleSearch
  };
} 