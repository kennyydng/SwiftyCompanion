import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthProvider';
import { getUser, ProfileData } from '../services/api42';

export function useProfile(userLogin: string) {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    async function getProfile() {
      try {
        if (!token) {
          throw new Error('Non authentifié');
        }
        const data = await getUser(userLogin, token);
        setProfile(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      } finally {
        setLoading(false);
      }
    }

    getProfile();
  }, [userLogin, token]);

  return { profile, loading, error };
} 