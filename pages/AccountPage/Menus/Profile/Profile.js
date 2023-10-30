import { View, StyleSheet, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import { useState,useEffect } from "react";
import IconMI from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import userStore from '../../../../store/userStore';

export default ProfilePage = () => {
    const routes = useNavigation();

    // GET DATAS
    const currentUser = userStore(state=>state.currentUser);
    const getUserByID = userStore(state=>state.getUserByID);
    const editProfile = userStore(state=>state.editProfile);

    {/* User Profiles */}
    const [Name, setName] = useState('');
    const [Phone, setPhone] = useState('');
    const [Address, setAddress] = useState('');
    const getPreviousRoute = () => {
        return routes.getState().routes[routes.getState().index - 1].name;
    };
    useEffect(() => {
        const User = getUserByID(currentUser.id);
        setName(User.name?User.name:'');
        setPhone(User.phone?User.phone:'');
        setAddress(User.address?User.address:'');
    },[editProfile])

    {/*Handler */}
    const updateProfilePicture = () =>
    {

    }

    const handleSaveButton = () =>
    {
        // console.log(Name);
        editProfile(Name, Phone, Address);
        backToAcc();
    }

    const backToAcc = () => {
        routes.navigate('Account Main');
    }
    console.log(getPreviousRoute())
    return (
        <View style={styles.container}>
            <View style={styles.body}>
                {/* Title */}
                {/* <Text style={{fontSize: 32, fontWeight: 'bold'}}>Account</Text> */}
                <View style={styles.innerBody}>

                    {/* Data Section */}
                    <View style={styles.inputContainer}>
                        {/* Full Name Textbox */}
                        {getPreviousRoute()!='Main Home' && getPreviousRoute()!='Cart Page' &&
                        <View style={styles.inputItem}>
                            <Text style={{fontSize: 24, fontWeight: 'bold'}}>Full Name</Text>
                            <TextInput
                                style={styles.textInput}
                                onChangeText={newText => setName(newText)}
                                defaultValue={Name}
                            />
                        </View>}

                        {/* Phone Number Textbox */}
                        {getPreviousRoute()!='Main Home' && getPreviousRoute()!='Cart Page' &&
                        <View style={styles.inputItem}>
                            <Text style={{fontSize: 24, fontWeight: 'bold'}}>Phone Number</Text>
                            <TextInput
                                style={styles.textInput}
                                onChangeText={newText => setPhone(newText)}
                                defaultValue={Phone}
                            />
                        </View>}

                        {/* Address Textbox */}
                        <View style={styles.inputItem}>
                            <Text style={{fontSize: 24, fontWeight: 'bold'}}>Address</Text>
                            <TextInput
                                style={styles.textInput}
                                onChangeText={newText => setAddress(newText)}
                                defaultValue={Address}
                            />
                        </View>
                    </View>

                    <TouchableOpacity onPress={()=>handleSaveButton()}>
                        <View style={styles.button}>
                            <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>Save Changes</Text>
                        </View>
                    </TouchableOpacity>
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
        width: 70
    },
    ProfilePicture: {
        position: 'absolute',
        height: 70,
        width: 70,

    },
    profileOverlay: {
        position: 'absolute',
        height: 70,
        width: 70,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(127.5, 127.5, 127.5, 0.5)'
    },

    inputContainer: {
        borderTopColor: 'gray',
        borderTopWidth: 1,
        flex: 1,
        marginTop: 30,
        alignItems: 'flex-start',
    },
    inputItem: {
        marginTop: 15,
        width: 375,
        height: 70,
        justifyContent: 'center'
    },
    textInput: {
        fontSize: 18,
        marginTop: 5,
        padding: 5,
        borderColor: 'black',
        borderWidth: 1,
    },
    button:{
        color: 'white',
        backgroundColor: '#3669C9',
        paddingVertical: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15
      }
});