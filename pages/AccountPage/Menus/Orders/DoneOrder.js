import React,{useState,useEffect} from 'react';
import { View, StyleSheet } from 'react-native';
import UserStore from '../../../../store/userStore';
import { useIsFocused } from '@react-navigation/native'
export default DoneOrder = () => {
    const [doneOrder, setDoneOrder] = useState([]);
    const getDoneOrders = UserStore(state => state.getDoneOrders);
    const isFocused = useIsFocused();
    useEffect(() => {
      if(isFocused)
      {
        const orders = getDoneOrders();
        setDoneOrder(orders);
        console.log(orders)
      }
    }, [isFocused]);

    return (
      <View style={styles.container}>
        {doneOrder.map((order, index) => (
          <Order key={index} {...order} />
        ))}
      </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});
