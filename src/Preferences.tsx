import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Pressable, BackHandler, KeyboardAvoidingView, Platform, FlatList, Image } from "react-native";
import { useNavigate } from "react-router-native";
import { TextContainer, styles, genderMock } from "./Gender";
import { Bounceable } from 'rn-bounceable';

const Preferences = ({ setInfo, info }: { setInfo: any, info: any }) => {
    const navigate = useNavigate();
    const imageList = [require('../assets/gender/im1.png'), require("../assets/gender/im2.png")];
    const [preferences, setPreferences] = useState(new Set());
    const addGender = (gender: any) => {
        setPreferences(prevState => new Set([...prevState, gender]));
    };
    const remGender = (gender: any) => {
        setPreferences(prev => new Set([...prev].filter(x => x !== gender)));
    };
    const onNext = () => {
        setInfo({ ...info, preferences: Array.from(preferences) });
        navigate('/platforms');
    };
    return (<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
        <View style={{ flex: 3, alignItems: "center", justifyContent: "flex-end" }}>
            <View style={styles.logoButton}>
                <Text style={styles.logoText}>Playdate</Text>
            </View>
            <Text style={styles.middleText}>¿Cuales son tus preferencias?</Text>
            <FlatList data={genderMock} renderItem={({ item }) => <TextContainer text={item} addGender={addGender} remGender={remGender} />} numColumns={2} columnWrapperStyle={{ flexWrap: 'wrap', flex: 1, marginTop: 5, justifyContent: "center", flexDirection: "row" }} keyExtractor={(item, index) => index.toString()} />
            <Image   
                    style={{height:200,resizeMode:"contain",alignSelf:"center",marginTop:5}}
                    source={imageList[Math.floor(Math.random() * imageList.length)]}
                />
            <Bounceable>
                <Pressable style={styles.button} onPress={onNext}>
                    <Text style={styles.buttonText}>Siguiente</Text>
                </Pressable>
            </Bounceable>
        </View>
    </KeyboardAvoidingView>)
};

export default Preferences;