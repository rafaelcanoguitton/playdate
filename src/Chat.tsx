import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View, Text, TextInput, Pressable, BackHandler, KeyboardAvoidingView, Platform, FlatList, Image, useWindowDimensions, Button } from "react-native";
import { useNavigate, Navigate, useLocation } from "react-router-native";
import { Bounceable } from 'rn-bounceable';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    useDerivedValue,
    useAnimatedGestureHandler,
    interpolate,
    withSpring,
    runOnJS,
} from 'react-native-reanimated';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import constants from 'expo-constants';
import axios from "axios";
import * as SecureStore from 'expo-secure-store';
import { NavigationBar } from "./Home";

const FloatingBackButton = () => {
    const navigate = useNavigate();
    const styles = StyleSheet.create({
        BackButton: {
            position: "absolute",
            top: 70,
            right: 20,
            zIndex: 100,
            backgroundColor: "white",
            borderRadius: 100,
            padding: 10,
            elevation: 10,
        }
    });
    return <View style={styles.BackButton}><View onTouchEnd={() => navigate('/chats')}>
        <Ionicons name="arrow-back" size={24} color="black" />
    </View></View>
}

const PersonBanner = ({ user }: { user: any }) => {
    const styles = StyleSheet.create({
        PictureContainer: {
            padding: 3,
            borderRadius: 100,
            height: 80,
            width: 80,
            flexDirection: "row",
            flexGrow: 0,
            marginTop: 40,
        },
        userName: {
            fontWeight: "bold",
            fontSize: 20,
            color: "white",
            alignSelf: "center",
            marginLeft: 20,
            width: "100%",
        },
    });
    return <View style={styles.PictureContainer}>
        <Image source={{ uri: `data:image/${user.pictures[0].extension};base64,${user.pictures[0].file}` }} style={{ width: 70, height: 70, borderRadius: 100 }} />
        <Text style={styles.userName}>{user.username}</Text>
    </View>
};
const Chat = () => {
    const location = useLocation();
    const [user, setUser] = useState(location.state.user);
    const [chat, setChat] = useState(location.state.chat);
    const [message, setMessage] = useState("");
    const ws = useRef<WebSocket>(null);
    useEffect(() => {
        console.log(chat.lines);
        ws.current = new WebSocket(`ws://192.168.0.105:8000/ws/chat/${chat.id}/`);
        ws.current.onopen = () => {
            console.log("connected");
        };
        ws.current.onmessage = (e) => {
            const data = JSON.parse(e.data);
            if (data.user === location.state.user.id) {
                setChat((chat) => {
                    return { ...chat, lines: [data,...chat.lines] };
                });
            }
        };
    }, []);
    const SendMessage = async () => {
        const token = await SecureStore.getItemAsync('token');
        const apiUrl = constants.manifest!.extra!.apiUrl + "api/users/send_message/";
        const response = await axios.post(apiUrl, {
            chat_id: chat.id,
            message: message,
        }, {
            headers: {
                'Authorization': `token ${token}`
            },
        });
        ws.current.send(JSON.stringify(response.data));
        setChat({ ...chat, lines: [response.data,...chat.lines] });
        setMessage("");
    }

    const styles = StyleSheet.create({
        ChatContainer: {
            padding: 10,
            width: "100%",
            height: "100%",
            flexDirection: "column",
            justifyContent: "space-around",
            flex: 1,
        },
        sendedBubble: {
            backgroundColor: "green",
            padding: 10,
            borderRadius: 10,
            maxWidth: "70%",
            alignSelf: "flex-start",
            marginLeft: 10,
            fontWeight: "bold",
            fontSize: 20,
            color: "white",
            margin: 5,

        },
        receivedBubble: {
            backgroundColor: "blue",
            padding: 10,
            borderRadius: 10,
            maxWidth: "70%",
            alignSelf: "flex-end",
            marginRight: 10,
            margin: 5,
        },
        messageBox: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            backgroundColor: "white",
            margin: "auto",
            marginBottom: 40,
            padding: 10,
        },
    });
    return <View style={styles.ChatContainer}>
        <FloatingBackButton />
        <PersonBanner user={user} />
        <FlatList
            data={chat.lines}
            inverted={true}
            style={{
                width: "100%", height: "100%", borderTopColor: "gray",
                borderTopWidth: 2,
            }}
            renderItem={({ item }) => {
                return <View style={item.user === user.id ? styles.sendedBubble : styles.receivedBubble}>
                    <Text
                        style={{
                            fontWeight: "bold",
                            fontSize: 20,
                            color: "white",
                        }}>{item.text} </Text>
                </View>
            }}
            keyExtractor={(item) => item.id}
        />
        <KeyboardAvoidingView style={styles.messageBox} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <TextInput placeholder="Escribe un mensaje..." value={message} onChangeText={(text) => setMessage(text)} />
            <View onTouchEnd={SendMessage} >
                <Ionicons name="send" size={24} color="black" />
            </View>
        </KeyboardAvoidingView>
    </View>
};

export default Chat;