import React, { useState } from 'react';
import { Text, View, TextInput, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import axios from 'axios'; // For sending data to backend

const Stack = createStackNavigator();

// Reusable Button Component
const CustomButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

// Screen 1: Full Name Input Screen
function CustomizationScreen({ navigation }) {
  const [name, setName] = useState('');

  const handleSubmit = async () => {
    if (name.trim() === '') {
      Alert.alert('Please enter your full name.');
      return;
    }
  
    try {
      const response = await fetch('http://192.168.247.164:8081/submitData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          deviceInfo: 'Device Info', // You can add more details about the device if needed
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
  
      Alert.alert('Success', `Hello ${data.name}, your data has been sent! IP: ${data.ip_address}`);
      // Navigate to the next screen with the name
      navigation.navigate('InputChoice', { userName: name });
  
    } catch (error) {
      console.error('Error sending data:', error);
      Alert.alert('Error', 'Could not send data to the server.');
    }
  };
  
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Your Full Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        placeholderTextColor="#888"
        value={name}
        onChangeText={setName}
      />
      <CustomButton title="Submit" onPress={handleSubmit} />
    </View>
  );
}

// Screen 2: Ask for Manual Input or File Upload
function InputChoiceScreen({ route }) {
  const { userName } = route.params;

  const handleManualInput = () => {
    Alert.alert("Manual input selected!", `Hello, ${userName}!`);
  };

  const handleFileUpload = () => {
    Alert.alert("File upload selected!", `Hello, ${userName}!`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {userName}!</Text>
      <Text style={styles.subtitle}>Would you like to manually input your classes or upload a file?</Text>
      <CustomButton title="Manual Input" onPress={handleManualInput} />
      <CustomButton title="Upload File" onPress={handleFileUpload} />
    </View>
  );
}

// Main App Component with Navigation
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Customization" component={CustomizationScreen} />
        <Stack.Screen name="InputChoice" component={InputChoiceScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Updated styles to match the design (purple, red, black theme)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#2e2e3e', // Darker background (black-ish with a tint of purple)
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#f6f6f6', // Light gray/white text for title
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#f6f6f6', // Light gray/white text for subtitle
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#8c57a0', // Purple border color
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    color: '#000', // Black text
    backgroundColor: '#f6f6f6', // Light background for input fields
  },
  button: {
    width: '100%',
    backgroundColor: '#d32f2f', // Red button color
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#ffffff', // White text inside the button
    fontWeight: 'bold',
  },
});
