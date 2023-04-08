import {View, Text, Image, Pressable } from 'react-native';
import React from 'react';
import { Input, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/core';
import Ionicons from "react-native-vector-icons/Ionicons";

const LoginScreen= () => {
    const navigation = useNavigation();
    return (
        <View style={{flex: 1,
            alignItems: 'center',
            justifyContent: "center"}}>
            <Image
                style={{flex: 1,
                    resizeMode: 'cover', 
                    position: 'absolute',
                    width: '100%',
                    height: '100%',}}
                source={require('../../assets/loginImage.png')}
            />

            <View style={{
                width: "80%"
            }}>

                <Input
                    type="email"
                    inputContainerStyle={{borderBottomWidth:0}} 
                    placeholder="Correo electrónico" 
                    placeholderTextColor={"#00000066"}
                    leftIcon={<Icon name='email' type='material' color='#769ECB' />}
                    style={{
                        padding:15,
                        color:"#00000066",
                        borderBottomWidth: 1,
                        borderBottomColor: "#00000066" }} />
                <Input
                    type="password"
                    inputContainerStyle={{borderBottomWidth:0}} 
                    placeholder="Contraseña" 
                    placeholderTextColor={"#00000066"}
                    leftIcon={<Icon name='lock-closed-outline' type='ionicon' color='#769ECB' />}
                    style={{
                        padding:15,
                        color:"#00000066",
                        borderBottomWidth: 1,
                        borderBottomColor: "#00000066" }} />
            </View>

            <Pressable 
                onPress={() => navigation.navigate("Home")}
                style={{
                    width:300, 
                    marginLeft:"auto", 
                    marginRight:"auto",
                    justifyContent:"center", 
                    alignItems:"center",
                    borderColor:"white",
                    borderWidth:2,
                    padding:14,
                    backgroundColor: "#769ECB",
                    borderRadius: 20
                }}>
                <Text 
                    style={{
                        textAlign:"center",
                        fontSize:19,
                        fontWeight:"700",
                        color:"white"}}>
                    Iniciar Sesión
                </Text>
            </Pressable>
    </View>
    );
}
export default LoginScreen;