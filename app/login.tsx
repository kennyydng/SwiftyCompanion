import { StyleSheet, View, TouchableOpacity, Text, Image, ImageBackground } from 'react-native';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthProvider';

export default function LoginScreen() {
  const { login } = useContext(AuthContext);

  return (
    <ImageBackground
      source={require('../assets/images/background.jpg')}
      style={styles.container}
    >
      <View style={styles.overlay}>
        <Image
          source={require('../assets/images/42_Logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <TouchableOpacity
          style={[styles.button]}
          onPress={login}
        >
          <Text style={styles.buttonText}>
            {'Sign in with 42'}
          </Text>
        </TouchableOpacity>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Overlay semi-transparent
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 40,
    tintColor: '#fff', // Logo en blanc
  },
  button: {
    backgroundColor: '#00BABC',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
    maxWidth: 300,
  },
  buttonDisabled: {
    backgroundColor: 'rgba(0, 186, 188, 0.5)', // Version semi-transparente de #00BABC
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 