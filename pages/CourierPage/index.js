import React, { useState } from 'react';
import { ScrollView, Text, View, TouchableOpacity, StyleSheet,Button } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Flex from '../../components/flex';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
const CourierPage = ({route}) => {
  const navigation = useNavigation();
  const [courier,setCourier] = useState('')
  const selectCourier = (type) => setCourier(type)
  const handleConfirmation = () =>
  {
    const {select} = route.params;
    if(courier)
    {
      select(courier)
      navigation.goBack();
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View>
          <TouchableOpacity style={styles.dropdownItem}>
            <Flex justifyContent="space-between" style={{ flex:1 }}>
              <Flex justifyContent="flex-start">
                <Octicons name="arrow-switch" size={20}/>
                <View style={{ width:10 }}></View>
                <Text>Opsi Pengiriman</Text>
              </Flex>
              <AntDesign name="right" size={20} color="#000" style={[styles.icon, styles.rotatedIcon]} />
            </Flex>
          </TouchableOpacity>
            <View style={{marginLeft:20}}>
              <TouchableOpacity style={{marginVertical:5}} onPress={()=>selectCourier("JNE")}>
                <Text>JNE</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{marginVertical:5}} onPress={()=>selectCourier("Si Cepat")}>
                <Text>Si Cepat</Text>
              </TouchableOpacity>
            </View>
        </View>

        <View style={styles.confirmationButtonContainer}>
          <Button title="Konfirmasi" onPress={handleConfirmation} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  icon: {
    transform: [{ rotate: '0deg' }],
  },
  rotatedIcon: {
    transform: [{ rotate: '90deg' }],
  },
  confirmationButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
});

export default CourierPage;
