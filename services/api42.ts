import { ProfileData, UserSearchResult, CoalitionData, CoalitionInfo } from '../types/api42.types';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthProvider';

const API_URL = 'https://api.intra.42.fr/v2';

const api42 = axios.create({
  baseURL: API_URL,
});

export const createAPI42Service = (getToken: () => string) => {
  api42.interceptors.request.use(async (config) => {
    config.headers.Authorization = `Bearer ${getToken()}`;
    return config;
  });

  return api42;
};

export default api42;

export async function getUser(userLogin: string, token: string): Promise<ProfileData> {
  const response = await fetch(`${API_URL}/users/${userLogin}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch profile');
  }

  const userData = await response.json();

  try {
    const coalitionData = await getCoalition(userData.id.toString(), token);
    return {
      ...userData,
      coalition: coalitionData.coalition,
      rank: coalitionData.rank,
    };
  } catch (error) {
    // Si on ne peut pas récupérer les données de coalition, on retourne quand même le profil
    return userData;
  }
}

export async function searchUsers(query: string, token: string): Promise<UserSearchResult[]> {
  if (query.length < 2)
    return [];

  const queryRange = `${query.toLowerCase()},${query.toLowerCase()}z`;
  const response = await fetch(`${API_URL}/users?range[login]=${queryRange}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok)
    return [];

  const data = await response.json();
  return data.map((user: any) => ({
    id: user.id.toString(),
    login: user.login,
    displayName: user.usual_full_name || user.displayname,
    avatar: user.image.link,
  }));
}

export async function getCoalition(userId: string, token: string): Promise<{ coalition: CoalitionInfo, rank: number }> {
  const response = await fetch(`${API_URL}/users/${userId}/coalitions_users`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok)
    throw new Error('Failed to fetch coalition data');

  const coalitionsData: CoalitionData[] = await response.json();

  if (coalitionsData.length === 0)
    throw new Error('No coalition found');

  // Récupérer les informations de la première coalition
  const primaryCoalition = coalitionsData[0];
  const coalitionResponse = await fetch(`${API_URL}/coalitions/${primaryCoalition.coalition_id}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!coalitionResponse.ok)
    throw new Error('Failed to fetch coalition info');

  const coalitionInfo: CoalitionInfo = await coalitionResponse.json();

  return {
    coalition: coalitionInfo,
    rank: primaryCoalition.rank,
  };
} 