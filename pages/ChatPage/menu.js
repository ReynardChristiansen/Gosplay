import React from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';

// SVG source for the back button
const backButtonSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <path d="M0 0h24v24H0z" fill="none"/>
    <path fill="#000000" d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/>
  </svg>
`;

const ProfileItem = ({ name, profilePicture }) => {
  const navigation = useNavigation();

  const handleProfilePress = () => {
    navigation.navigate('Chat Main');
  };

  return (
    <TouchableOpacity style={styles.profileItem} onPress={handleProfilePress}>
      <Image source={profilePicture} style={styles.profilePicture} />
      <Text style={styles.profileName}>{name}</Text>
    </TouchableOpacity>
  );
};

const MainMenu = () => {
  const navigation = useNavigation();

  const handleBackButton = () => {
    // Go back to the previous screen
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackButton}>
          <SvgXml xml={backButtonSvg} width={24} height={24} style={styles.backButton} />
        </TouchableOpacity>
        <Text style={styles.title}>Chat</Text>
      </View>
      {/* Main menu content */}
      <View style={styles.content}>
        <ScrollView contentContainerStyle={styles.profilesContainer}>
          <ProfileItem
            name="Anna Store"
            profilePicture={require('./Woman21.png')}
          />
          {/* Add more ProfileItems here */}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  profilesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  profileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    marginRight: 16,
  },
  profilePicture: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  profileName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MainMenu;
