import React, { useState } from 'react';
import { Text, View, Alert, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

// Reusable Button Component
const CustomButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

// Screen 1: Language Selection Screen
function LanguageSelectionScreen({ navigation }) {
  const [openLanguage, setOpenLanguage] = useState(false);
  const [language, setLanguage] = useState(null);
  const [languages, setLanguages] = useState([
    { label: 'English', value: 'en' },
    { label: 'German', value: 'de' },
    { label: 'Romanian', value: 'ro' },
  ]);

  const handleProceed = () => {
    if (!language) {
      Alert.alert('Error', 'Please select a language');
      return;
    }
    // Navigate to the YearSelection screen with the selected language
    navigation.navigate('YearSelection', { language });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Language</Text>
      <DropDownPicker
        open={openLanguage}
        value={language}
        items={languages}
        setOpen={setOpenLanguage}
        setValue={setLanguage}
        setItems={setLanguages}
        placeholder="Select Language"
        containerStyle={styles.dropdown}
      />
      <CustomButton title="Proceed" onPress={handleProceed} />
    </View>
  );
}

// Screen 2: Year Selection Screen
function YearSelectionScreen({ route, navigation }) {
  const { language } = route.params; // Destructure language from route params

  const [openYear, setOpenYear] = useState(false);
  const [year, setYear] = useState(null);
  const [years, setYears] = useState([
    { label: 'Year 1', value: '1' },
    { label: 'Year 2', value: '2' },
    { label: 'Year 3', value: '3' },
    { label: 'Year 4', value: '4' },
  ]);

  const handleProceed = () => {
    if (!year) {
      Alert.alert('Error', 'Please select a year');
      return;
    }
    // Pass the selected language and year to the next screen
    navigation.navigate('GroupSelection', { language, year });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Year</Text>
      <DropDownPicker
        open={openYear}
        value={year}
        items={years}
        setOpen={setOpenYear}
        setValue={setYear}
        setItems={setYears}
        placeholder="Select Year"
        containerStyle={styles.dropdown}
      />
      <CustomButton title="Proceed" onPress={handleProceed} />
    </View>
  );
}

// Screen 3: Group Selection Screen
function GroupSelectionScreen({ route, navigation }) {
  const { language, year } = route.params; // Destructure language and year from route params

  const [openGroup, setOpenGroup] = useState(false);
  const [group, setGroup] = useState(null);

  // Generate groups dynamically based on the selected year
  const groupItems = [
    { label: `7${year}1`, value: `7${year}1` },
    { label: `7${year}2`, value: `7${year}2` },
    { label: `7${year}3`, value: `7${year}3` },
  ];

  const handleProceed = () => {
    if (!group) {
      Alert.alert('Error', 'Please select a group');
      return;
    }
    // Pass the selected language, year, and group to the next screen
    navigation.navigate('OptionalClasses', { language, year, group });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Group</Text>
      <DropDownPicker
        open={openGroup}
        value={group}
        items={groupItems}
        setOpen={setOpenGroup}
        setValue={setGroup}
        placeholder="Select Group"
        containerStyle={styles.dropdown}
      />
      <CustomButton title="Proceed" onPress={handleProceed} />
    </View>
  );
}

// Screen 4: Optional Classes Selection
function OptionalClassesScreen({ route, navigation }) {
  const { language, year, group } = route.params; // Destructure params

  const optionalClasses = ['AI', 'Machine Learning', 'Mobile Development']; // Mock optional classes

  const [selectedClasses, setSelectedClasses] = useState([]);

  const handleClassToggle = (className) => {
    setSelectedClasses((prev) =>
      prev.includes(className)
        ? prev.filter((cls) => cls !== className)
        : [...prev, className]
    );
  };

  const handleProceed = () => {
    // Navigate to the final calendar screen (if implemented)
    navigation.navigate('Calendar', { language, year, group, selectedClasses });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Select Your Optional Classes</Text>
      {optionalClasses.map((optionalClass) => (
        <TouchableOpacity
          key={optionalClass}
          style={[
            styles.optionButton,
            selectedClasses.includes(optionalClass) && styles.optionButtonSelected,
          ]}
          onPress={() => handleClassToggle(optionalClass)}
        >
          <Text style={styles.buttonText}>{optionalClass}</Text>
        </TouchableOpacity>
      ))}
      <CustomButton title="Show Calendar" onPress={handleProceed} />
    </ScrollView>
  );
}

// Main App Component with Navigation
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="LanguageSelection" component={LanguageSelectionScreen} />
        <Stack.Screen name="YearSelection" component={YearSelectionScreen} />
        <Stack.Screen name="GroupSelection" component={GroupSelectionScreen} />
        <Stack.Screen name="OptionalClasses" component={OptionalClassesScreen} />
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
    backgroundColor: '#2e2e3e',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#f6f6f6',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#f6f6f6',
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  dropdown: {
    width: '100%',
    marginBottom: 20,
    color: '#00FF00',
  },
  button: {
    width: '100%',
    backgroundColor: '#d32f2f',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  optionButton: {
    width: '100%',
    backgroundColor: '#d32f2f',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  optionButtonSelected: {
    backgroundColor: '#8c57a0', // Change color when selected
  },
});
