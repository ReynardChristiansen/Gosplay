import React, { useEffect } from 'react';
import { View, StyleSheet, Image,Button } from 'react-native';
import { Text } from 'react-native-paper';
import Flex from '../../../../../components/flex.js';
import UserStore from '../../../../../store/userStore.js';
export default Order = (props) => {
    const {name,isDone,price,quantity,images,id} = props
    const setOrderDoneByID = UserStore(state => state.setOrderDoneByID);
    const getOngoingOrders = UserStore(state => state.getOngoingOrders);

    const handleFinishButton = () => {
        setOrderDoneByID(id)
    }
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
            {!isDone && <Button mode="contained" title="Finish Order" onPress={()=>{handleFinishButton()}} style={{ marginVertical: 10, marginHorizontal:15}}/>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 100,
        width: 370,
        backgroundColor: 'aqua',
    },
    outerContainer: {

    },
    Product: {
        marginTop: 5,
        // marginHorizontal: 15,
        backgroundColor: 'red'
      },
});
