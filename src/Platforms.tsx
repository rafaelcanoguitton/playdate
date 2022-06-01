import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Pressable, BackHandler, KeyboardAvoidingView, Platform, FlatList, Image } from "react-native";
import { useNavigate } from "react-router-native";
import { TextContainer, styles, genderMock } from "./Gender";
import { Bounceable } from 'rn-bounceable';

const Platforms = ({ setInfo, info }: { setInfo: any, info: any }) => {
    const imageList = [require('../assets/Logos/EGLogo.png'), require('../assets/Logos/MyAnimeListLOGO.png'), require('../assets/Logos/STLogo.png')];
    const navigate = useNavigate();
    const onNext = () => {
        // setInfo({ ...info, gender: Array.from(genders) });
        console.log(info);
        navigate('/topics');
    };
    return (<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
        <View style={{ flex: 3, alignItems: "center", justifyContent: "flex-end" }}>
            <View style={styles.logoButton}>
                <Text style={styles.logoText}>Playdate</Text>
            </View>
            <Text style={styles.middleText}>¡Conecta tus plataformas!</Text>
            <Text style={{
                fontSize: 18,
                textAlign: 'center',
                color: '#828282',
            }}>Con ellas podemos conocer tus preferencias al jugar o anime que te guste 
            </Text>
            {/* row view */}
            <View style={{
                flexDirection: "row",
                marginTop: 150,
            }}>
                <Bounceable>
                    <View style={{
                        backgroundColor: "white",
                        borderRadius: 100,
                        height: 100,
                        width: 100,
                        alignItems: "center",
                        justifyContent: "center",
                        margin: 20
                    }}>
                        <Image
                            style={{
                                resizeMode: "contain",
                                alignSelf: "center",
                                width: 100,
                            }}
                            source={imageList[1]}
                        />
                    </View>
                </Bounceable>
                <Bounceable
                    level={1.1}>
                    <View style={{
                        backgroundColor: "white",
                        borderRadius: 100,
                        height: 100,
                        width: 100,
                        alignItems: "center",
                        justifyContent: "center",
                        margin: 20
                    }}>
                        <Image
                            style={{
                                resizeMode: "contain",
                                alignSelf: "center",
                                height: 70,
                            }}
                            source={imageList[2]}
                        />
                    </View>
                </Bounceable>
            </View>
            <Bounceable>
                <View style={{
                    backgroundColor: "white",
                    borderRadius: 100,
                    height: 100,
                    width: 100,
                    alignItems: "center",
                    justifyContent: "center",
                    margin: 20,

                }}>
                    <Image
                        style={{
                            resizeMode: "contain",
                            alignSelf: "center",
                            height: 80,
                        }}
                        source={imageList[0]}
                    />
                </View>
            </Bounceable>
            <Bounceable>
                <Pressable style={styles.button} onPress={onNext}>
                    <Text style={styles.buttonText}>Siguiente</Text>
                </Pressable>
            </Bounceable>
        </View>

    </KeyboardAvoidingView>)

};
export default Platforms;