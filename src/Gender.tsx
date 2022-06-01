import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Pressable, BackHandler, KeyboardAvoidingView, Platform, FlatList, Image } from "react-native";
import { useNavigate } from "react-router-native";
import { Bounceable } from 'rn-bounceable';


export const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flexShrink: 1,
        backgroundColor: "#181a1b",
        flexDirection: "column",
        marginTop: Platform.OS === 'ios' ? 100 : 10,
    },
    loginContainer: {

        justifyContent: "flex-start",
    },
    text: {
        color: "white",
    },
    logoButton: {
        backgroundColor: "white",
        height: 80,
        width: 250,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        shadowColor: "white",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
    },
    logoText: {
        color: "black",
        fontSize: 30,
        fontWeight: "bold",
    },
    middleText: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        marginVertical: 30,
    },
    required: {
        color: "red",
    },
    button: {
        backgroundColor: "#287596",
        padding: 10,
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        marginBottom: 70,
        marginTop: 20,
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
    },
    field: {
        margin: 10,
        backgroundColor: "white",
        borderRadius: 10,
        height: 50,
        padding: 10,

    },
    registerText: {
        color: "#287596",
    },
    textContain: {
        margin: 4,
        borderRadius: 10,
        backgroundColor: "white",
        padding: 8,
    },
    textContainPressed: {
        margin: 4,
        borderRadius: 10,
        backgroundColor: "#287596",
        padding: 8,
    },
    insideText: {
        color: "black",
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
    },
});

export const TextContainer = ({ text, addGender, remGender }: { text: any, addGender: any, remGender: any }) => {
    const onPress = () => {
        if (pressed) {
            remGender(text);
        } else {
            addGender(text);
        }
        setPressed(!pressed);
    };
    const [pressed, setPressed] = useState(false);
    return <Bounceable onPress={onPress}>
        <View style={pressed ? styles.textContainPressed : styles.textContain}>
            <Text style={styles.insideText}>{text}</Text>
        </View>
    </Bounceable>
};
export const genderMock = ["Masculino", "Feminino", "Gay", "Lesbiana", "No binario", "Otro","asdfasdf","a","g"];
const Gender = ({ setInfo, info }: { setInfo: any, info: any }) => {
    const imageList = [require('../assets/gender/im1.png'),require("../assets/gender/im2.png")];
    const navigate = useNavigate();
    const [genders, setGenders] = useState(new Set());
    const addGender = (gender: any) => {
        setGenders(prevState => new Set([...prevState, gender]));
    };
    const remGender = (gender: any) => {
        setGenders(prev => new Set([...prev].filter(x => x !== gender)))
    };
    const onNext = () => {
        setInfo({ ...info, gender: Array.from(genders) });
        navigate('/preferences');
    };
    return (<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
        <View style={{ flex: 3, alignItems: "center", justifyContent: "flex-end" }}>
            <View style={styles.logoButton}>
                <Text style={styles.logoText}>Playdate</Text>
            </View>
            <Text style={styles.middleText}>¿Cómo te identificas?</Text>
            <FlatList data={genderMock} renderItem={({ item }) => <TextContainer text={item} addGender={addGender} remGender={remGender} />} numColumns={2} columnWrapperStyle={{ flexWrap: 'wrap', flex: 1, marginTop: 5, justifyContent: "center",flexDirection:"row"}}/>
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

export default Gender;