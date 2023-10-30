import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image,Button } from 'react-native';
import Order from './Components/Order';
import UserStore from '../../../../store/userStore';
import { useIsFocused } from '@react-navigation/native'
import { Text } from 'react-native-paper';
import Flex from '../../../../components/flex.js';
import { useNavigation } from '@react-navigation/native';
const OngoingOrder = () => {
  const [ongoingOrder, setOngoingOrder] = useState([]);
  const getOngoingOrders = UserStore(state => state.getOngoingOrders);
  const setOrderDoneByID = UserStore(state => state.setOrderDoneByID);
  const navigation = useNavigation();
  const isFocused = useIsFocused()
  useEffect(() => {
    const orders = getOngoingOrders();
    setOngoingOrder(orders);
    console.log(orders);
  }, [isFocused, handleFinishButton, TriggerEffect]);

  const TriggerEffect = () => {};

  const handleFinishButton = (id) => {
    console.log("handle finish")
    setOrderDoneByID(id)
    const orders = getOngoingOrders();
    setOngoingOrder(orders);
    TriggerEffect();
  }

  const Order = (props) => {
    const {name,isDone,price,quantity,images,id} = props;

    return (
        <View style={{ backgroundColor: '#fbfbfb', padding: 8, marginTop: 4, marginBottom: 4}}>
            <Text variant="bodyLarge" style={{ marginHorizontal: 15, marginTop: 5, marginBottom: 5, fontWeight: 'bold'}}>Order ID : {id}</Text>
            <View style={styles.Product}>
                <Flex justify="flex-start" style={{height: 90, width: 500, backgroundColor: '#fbfbfb'}}>
                    <Image style={{width: 80, height: 80, borderRadius: 1, marginHorizontal: 15}}
                        source={{ uri: images[0] }} />
                    <Flex flexDirection="column" alignItems="flex-start" backgroundColor='#fbfbfb'>
                        <Text variant="bodyLarge">{name}</Text>
                        <Flex flexDirection="row" alignItems="center" backgroundColor='#fbfbfb'>
                            <Text variant="bodyMedium">Rp{price}</Text>
                            <Text style={{marginLeft: 175}} variant="labelSmall">x {quantity}</Text>
                        </Flex>
                    </Flex>
                </Flex>
            </View>
            {/* <Text style={{ marginLeft: 15, marginTop: 5, marginBottom: 5 }}>Total Price : {OrderID.total}</Text> */}
            {!isDone && <Button mode="contained" title="Finish Order" onPress={()=>{handleFinishButton(id)}} style={{ marginVertical: 10, marginHorizontal:15}}/>}
        </View>
    );
  }

  return (
    <View style={styles.container}>
      {ongoingOrder.map((order, index) => (
        <Order key={index} {...order} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default OngoingOrder;
