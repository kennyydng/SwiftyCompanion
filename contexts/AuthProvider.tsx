import { useState, createContext, useEffect } from "react";
import axios from "axios";
import { makeRedirectUri, useAuthRequest, AuthSessionResult } from 'expo-auth-session';
import { useRouter } from 'expo-router';

export const AuthContext = createContext({
  token: "",
  login: async () => { },
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState("");
  const [expirationTime, setExpirationTime] = useState(0);
  const router = useRouter();
  const redirectUri = makeRedirectUri({ scheme: "SwiftyCompanion" });
  const discovery = { authorizationEndpoint: "https://api.intra.42.fr/oauth/authorize" }
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: process.env.EXPO_PUBLIC_CLIENT_ID as string,
      redirectUri: redirectUri,
    },
    discovery
  );

  const getToken = async () => {
    try {
      if (response?.type !== 'success' || !('params' in response))
        throw new Error("Invalid response type");

      const res = await axios.post("https://api.intra.42.fr/oauth/token/", {
        client_id: process.env.EXPO_PUBLIC_CLIENT_ID,
        client_secret: process.env.EXPO_PUBLIC_CLIENT_SECRET,
        grant_type: "authorization_code",
        redirect_uri: redirectUri,
        code: response.params.code
      });

      if (res.data) {
        setToken(res.data.access_token);
        const tokenInfo = await axios.get("https://api.intra.42.fr/oauth/token/info", {
          headers: {Authorization: `Bearer ${res.data.access_token}`}
        });
        setExpirationTime(tokenInfo.data.expires_in_seconds);
        console.log(`Nouveau token obtenu: ${res.data.access_token} expire dans ${tokenInfo.data.expires_in_seconds} secondes`);
      }
    } catch (error) {
      console.log("Token Error", error);
      return null;
    }
  };

  const login = async () => {
    try {
      if (!request)
        return;
      await promptAsync();
      console.log("response", response);
    } catch (error) {
      console.error("Erreur lors de l'authentification:", error);
    }
  };

  const refreshToken = async () => {
    try {
      const res = await axios.post("https://api.intra.42.fr/oauth/token/", {
        client_id: process.env.EXPO_PUBLIC_CLIENT_ID,
        client_secret: process.env.EXPO_PUBLIC_CLIENT_SECRET,
        grant_type: "refresh_token",
        refresh_token: token
      });

      if (res.data) {
        setToken(res.data.access_token);
        setExpirationTime(res.data.expires_in_seconds);
      }
    } catch (error) {
      console.log("Token Error", error);
      return null;
    }
  };
  
  useEffect(() => {
    if (response?.type === 'success') {
      router.replace('/search');
      console.log("L'authentification a été réussie");
      getToken();
    }
    else if (response?.type === 'cancel')
      console.log("L'authentification a été annulée par l'utilisateur ou a échoué");
    else if (response)
      console.log("Échec de l'authentification:", response);
  }, [response]);

  // Surveiller l'expiration du token
  useEffect(() => {
    if (!expirationTime) return;

    const timer = setTimeout(() => {
      console.log("Token expiré, renouvellement...");
      refreshToken();
    }, expirationTime * 1000);

    return () => clearTimeout(timer);
  }, [expirationTime]);

  return (
    <AuthContext.Provider value={{ token, login }}>
      {children}
    </AuthContext.Provider>
  );
}