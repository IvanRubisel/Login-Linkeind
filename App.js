import React, { useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import LinkedInModal from '@gcou/react-native-linkedin';

export default function App() {
  const linkedInModalRef = useRef(null);
  const [profile, setProfile] = useState(null);

  const handleSuccess = async (token) => {
    console.log('Access Token:', token);
    try {
      const response = await fetch('https://api.linkedin.com/v2/me', {
        headers: {
          Authorization: `Bearer ${token.access_token}`,
        },
      });
      const profileData = await response.json();
      setProfile(profileData);
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

  const handleError = (error) => {
    console.error('Error:', error);
  };

  const openLinkedInModal = () => {
    if (linkedInModalRef.current) {
      linkedInModalRef.current.open();
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png",
        }}
        style={styles.logo}
      />
      <Text style={styles.title}>
        La nueva aplicación de LinkedIn, más sencilla y mejor
      </Text>
      <Button title="Inicia sesión" onPress={openLinkedInModal} />
      <LinkedInModal
        ref={linkedInModalRef}
        clientID="78d2502qu8smz1"
        clientSecret="WPL_AP1.FWlKvXrYQlxoB07O.gxQ4aA=="
        redirectUri="https://likehome.com.mx/"
        permissions={['openid', 'profile', 'email']}
        onSuccess={handleSuccess}
        onError={handleError}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  profile: {
    marginTop: 20,
  },
});
