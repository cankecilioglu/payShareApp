import React, {useState, useEffect} from 'react';
import {SafeAreaView, Text, Button, StyleSheet, Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import {signIn} from '../lib/Google';

const AuthScreen = ({navigation}) => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  // Monitor authentication state
  const onAuthStateChanged = user => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // Cleanup on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <Button
          title="Google Sign-In"
          onPress={async () => {
            try {
              await signIn();
              navigation.replace('HomeScreen'); // Navigate to Home on success
            } catch (error) {
              Alert.alert('Login Error', 'Google sign-in failed');
            }
          }}
        />
      </SafeAreaView>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default AuthScreen;
