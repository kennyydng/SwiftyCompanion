import { useState, createContext, useEffect } from "react";
import axios from "axios";
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { useRouter } from 'expo-router';

const checkExpired = (checkDate: number) => {
  const date = new Date().getTime() / 1000;
  return checkDate <= date;
};

export const AuthContext = createContext({
  token: "",
  login: async () => { },
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState("");
  const router = useRouter();
  const redirectUri = makeRedirectUri({ scheme: "SwiftyCompanion" });
  // console.log("redirectUri:", redirectUri);

  const discovery = {
    authorizationEndpoint: "https://api.intra.42.fr/oauth/authorize",
    tokenEndpoint: "https://api.intra.42.fr/oauth/token",
  }

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: process.env.EXPO_PUBLIC_CLIENT_ID as string,
      clientSecret: process.env.EXPO_PUBLIC_CLIENT_SECRET as string,
      redirectUri: redirectUri,
      scopes: ["profile", "projects"],
    },
    discovery
  );

  const login = async () => {
    try {
      if (!request)
        return;
      await promptAsync();
    } catch (error) {
      console.error("Erreur lors de l'authentification:", error);
    }
  };

  useEffect(() => {
    const getToken = async () => {
      try {
        const res = await axios.post("https://api.intra.42.fr/oauth/token/", {
          client_id: process.env.EXPO_PUBLIC_CLIENT_ID,
          client_secret: process.env.EXPO_PUBLIC_CLIENT_SECRET,
          grant_type: "client_credentials",
        });

        if (res.data)
          setToken(res.data.access_token);
      } catch (error) {
        console.log("Token Error", error);
        return null;
      }
    };

    if (response?.type === 'success') {
      router.replace('/search');
      console.log("L'authentification a été réussie");
    }
    else if (response?.type === 'cancel') 
      console.log("L'authentification a été annulée par l'utilisateur ou a échoué");
    else if (response) 
      console.log("Échec de l'authentification:", response);
    else if (!token) 
      getToken();

    console.log("token:", token);
  }, [response, token]);

  return (
    <AuthContext.Provider value={{ token, login }}>
      {children}
    </AuthContext.Provider>
  );
}