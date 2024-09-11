import React from 'react';
import {SafeAreaView, Text, Button, StyleSheet} from 'react-native';
import auth from '@react-native-firebase/auth';

const HomeScreen = ({navigation}) => {
  const user = auth().currentUser;

  const handleLogout = () => {
    auth()
      .signOut()
      .then(() => {
        navigation.navigate('AuthScreen');
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.welcomeText}>Welcome {user?.email}</Text>
      <Button title="Logout" onPress={handleLogout} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default HomeScreen;
