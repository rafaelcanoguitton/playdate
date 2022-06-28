import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Pressable, BackHandler, KeyboardAvoidingView, Platform, FlatList, Image, Button } from "react-native";
import { useNavigate } from "react-router-native";
import { Bounceable } from 'rn-bounceable';
import { TextContainer, styles, genderMock } from "./Gender";
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import constants from 'expo-constants';
import * as SecureStore from 'expo-secure-store';
const ImageProfile = ({ setInfo, info }: { setInfo: any, info: any }) => {
    const [image, setImage] = useState(null);
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    const navigate = useNavigate();
    const onNext = async () => {
        try {
            const apiURL = constants.manifest!.extra!.apiUrl + 'api/users/login/';
            const formData = new FormData();
            formData.append('pictures', {
                uri: image,
                name: 'image.jpg',
                type: 'image/jpg',
            });
            const json = JSON.stringify(info);
            const blob = new Blob([json], { type: 'application/json' });
            formData.append('data', blob);
            const config = {
                headers: {
                    'content-type': 'multipart/form-data',
                },
            };
            const response = await axios.post(apiURL, formData, config);
            console.log(response.data);
            const token = response.data.token;
            await SecureStore.setItemAsync('token', token);
            if (token) {
                navigate('/home');
            } else {
                navigate('/home');
            }
        } catch(error){
            console.log(error);
        } finally {
            navigate('/home');
        }

    };
    return (<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
        <View style={{ flex: 3, alignItems: "center", justifyContent: "flex-end" }}>
            <View style={styles.logoButton}>
                <Text style={styles.logoText}>Playdate</Text>
            </View>
            <Text style={styles.middleText}>¡Crea tu perfil!</Text>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Button title="¡Elige una foto de perfil!" onPress={pickImage} />
                {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
            </View>

            <Bounceable>
                <Pressable style={styles.button} onPress={onNext}>
                    <Text style={styles.buttonText}>Siguiente</Text>
                </Pressable>
            </Bounceable>
        </View>

    </KeyboardAvoidingView>)
};
export default ImageProfile;