import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import IconMI from 'react-native-vector-icons/MaterialIcons'
import IconII from 'react-native-vector-icons/Ionicons'
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native';
import { Text } from 'react-native-paper';
import userStore from '../../store/userStore';
import { useIsFocused } from '@react-navigation/native'


const AccountPage = () => {
  const routes = useNavigation();

  const [user, setUser] = useState(userStore(state=>state.getUserByIDAuto))

  const ProfileSettings = () => {
    routes.navigate('Profile');
  };

  const MyOrder = () => {
    routes.navigate('My Order');
  }

  const MyShop = () => {
    routes.navigate('My Shop')
  }
  const Logout = () =>{
    routes.navigate('Login')
  }
  const isFocused = useIsFocused()

  useEffect(() => {
      if(isFocused){
          //Update the state you want to be updated
      }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        {/* Title */}
        {/* <Text style={{fontSize: 32, fontWeight: 'bold'}}>Account</Text> */}
        <View style={styles.innerBody}>
          {/* Profile Section */}
          <View style={styles.profileContainer}>
            <View style={styles.innerProfile}>
              <Image
                source={require('../../assets/images/ProfilePic.jpg')}
                style={{ width: 70, height: 70, borderRadius: 50 }}
              />
              <Text variant='headlineSmall' style={{fontWeight: 'bold', marginHorizontal: 25}}>{user.name}</Text>
            </View>
            <View style={styles.editButton}>
              <TouchableOpacity onPress={()=>ProfileSettings()}>
                <IconMI name="edit" size={24} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Menus Section */}
          <View style={styles.menuContainer}>

            {/* My Order Menu */}
            <View style={styles.MenuItem}>
              <TouchableOpacity style={styles.innerMenuItem} onPress={MyOrder}>
                <IconMCI name="file-document-multiple" size={24} />
                <Text variant='headlineSmall' style={{marginHorizontal: 15}}>My Order</Text>
              </TouchableOpacity>
            </View>

            {/* Shop Menu */}
            <View style={styles.MenuItem}>
              <TouchableOpacity style={styles.innerMenuItem} onPress={MyShop}>
                <IconMI name="store-mall-directory" size={24} />
                <Text variant='headlineSmall' style={{marginHorizontal: 15}}>My Shop</Text>
              </TouchableOpacity>
            </View>

            {/* Log Out */}
            <View style={styles.MenuItem}>
              <TouchableOpacity style={styles.innerMenuItem} onPress={Logout}>
                <IconMI name="logout" size={24} />
                <Text variant='headlineSmall' style={{marginHorizontal: 15}}>Log Out</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
    paddingHorizontal: 16,
  },
  innerBody: {
    flex: 1,
    marginTop: 25,
    justifyContent: 'flex-start'
  },
  profileContainer: {
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: 'blue'
  },
  innerProfile: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
  },
  editButton: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'center'
  },

  menuContainer: {
    flex: 1,
    marginTop: 30,
    alignItems: 'flex-start',
    // backgroundColor: 'red'
  },
  MenuItem: {
    width: 375,
    height: 70,
    borderTopColor: 'gray',
    borderTopWidth: 1,
    justifyContent: 'center'
  },
  innerMenuItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    // backgroundColor: 'green'
  }
});

export default AccountPage;
