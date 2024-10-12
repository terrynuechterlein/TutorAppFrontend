import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector } from 'react-redux';

export default function BecomeTutor({ navigation }) {
  const [email, setEmail] = useState('');
  const userId = useSelector((state) => state.auth.userId);

  const handleSubmit = async () => {
    if (!email.endsWith('.edu')) {
      Alert.alert('Invalid Email', 'Please enter a valid .edu email address.');
      return;
    }

    try {
      // Call your backend API to initiate email verification
      const response = await fetch(`http://yourapi.com/api/verifyEmail`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, email }),
      });

      if (response.ok) {
        Alert.alert(
          'Verification Email Sent',
          'Please check your email to verify your account.'
        );
        navigation.goBack();
      } else {
        Alert.alert('Error', 'Failed to send verification email.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An unexpected error occurred.');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

    <LinearGradient
      colors={['#6a11cb', '#2575fc']}
      style={styles.container}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inner}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>

        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/hornetLogo2.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={styles.headerContainer}>
          <Text style={styles.title}>Become a Tutor</Text>
          <Text style={styles.subtitle}>
            Verify your .edu email to start tutoring
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <MaterialIcons name="email" size={24} color="#fff" />
          <TextInput
            style={styles.input}
            placeholder="Your .edu Email"
            placeholderTextColor="#d1d1d1"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <LinearGradient
            colors={['#ff8c00', '#ff6a00']}
            style={styles.buttonBackground}
          >
            <Text style={styles.buttonText}>Verify Email</Text>
          </LinearGradient>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </LinearGradient>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    inner: {
      flex: 1,
      padding: 24,
      justifyContent: 'space-be',
    },
    backButton: {
      marginTop: 40,
      marginLeft: -5,
    },
    logoContainer: {
        alignItems: 'center',
        marginTop: 20,
      },
      logo: {
        width: 150,
        height: 150,
      },
    headerContainer: {
      marginTop: 60,
    },
    title: {
      fontSize: 32,
      color: '#fff',
      fontWeight: '700',
    },
    subtitle: {
      fontSize: 18,
      color: '#d1d1d1',
      marginTop: 10,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 50,
      borderBottomWidth: 1,
      borderBottomColor: '#fff',
      paddingBottom: 8,
    },
    input: {
      flex: 1,
      marginLeft: 10,
      color: '#fff',
      fontSize: 18,
    },
    button: {
      marginTop: 50,
    },
    buttonBackground: {
      paddingVertical: 15,
      borderRadius: 30,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.2,
      shadowRadius: 10,
      elevation: 10,
    },
    buttonText: {
      color: '#fff',
      fontSize: 20,
      textAlign: 'center',
      fontWeight: '600',
    },
    bottomImageContainer: {
      alignItems: 'center',
      marginBottom: 30,
    },
    bottomImage: {
      width: '100%',
      height: 150,
    },
  });
  