import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Pressable, BackHandler, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { useNavigate } from 'react-router-native';
import axios from 'axios';
import constants from 'expo-constants';
import * as SecureStore from 'expo-secure-store';
import { FlatList } from 'react-native-gesture-handler';
import { NavigationBar } from './Home';

const Match = ({ user }: { user: any }) => {
    const styles = StyleSheet.create({
        PictureContainer: {
            padding: 3,
            borderRadius: 100,
            borderColor: "red",
            borderWidth: 2,
            height: 80,
            width: 80,
            marginHorizontal: 10,
        }
    });
    return <View style={styles.PictureContainer}>
        <Image source={{ uri: `data:image/${user.pictures[0].extension};base64,${user.pictures[0].file}` }} style={{ width: 70, height: 70, borderRadius: 100 }} />
    </View>
}
const Matches = () => {
    const [matches, setMatches] = useState([]);
    const apiUrl = constants.manifest!.extra!.apiUrl + "api/users/get_matches/";
    useEffect(() => {
        const getMatches = async () => {
            const token = await SecureStore.getItemAsync('token')
            const response = await axios.get(apiUrl, {
                headers: {
                    'Authorization': `token ${token}`
                }
            });
            setMatches(response.data.users);
        };
        getMatches();
    }, []);
    return <FlatList data={matches} renderItem={({ item }) => <Match user={item} />} keyExtractor={item => item} horizontal={true} style={{ paddingHorizontal: 30, marginVertical: 50, flexGrow: 0 }} />
};

const Chat = ({ chatLine, user, chat }: { chatLine: any, user: any, chat: any }) => {
    const navigate = useNavigate();
    const navigateToChat = () => {
        navigate('/chat', { state: { chat: chat, user: user } });
    }
    const styles = StyleSheet.create({
        ChatContainer: {
            padding: 10,
            width: "100%",
            borderColor: "gray",
            borderBottomWidth: 2,
            borderTopWidth: 2,


        },
        userName: {
            fontWeight: "bold",
            fontSize: 20,
            color: "white",
        },
        message: {
            fontSize: 15,
            color: "white",
        }
    });
    return <View style={styles.ChatContainer} onTouchEnd={navigateToChat}>
        <Text style={styles.userName}>{user.username}</Text>
        <Text style={styles.message}>{chatLine.text !== "" ? chatLine.text : "Aún nada"}</Text>
    </View>
}
const Chats = () => {
    //return a vertical list of chats
    //each chat is a horizontal list of pictures of people in the chat and the last message
    //when you click on a chat, it takes you to the chat page

    const [chats, setChats] = useState([]);
    const apiUrl = constants.manifest!.extra!.apiUrl + "api/users/get_chats/";
    useEffect(() => {
        const getChats = async () => {
            const token = await SecureStore.getItemAsync('token')
            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `token ${token}`,
                }
            });
            setChats(response.data.chats);
        };
        getChats();
    }, []);
    //console.log(chats);
    return <View style={{ width: "100%", flex: 1, flexDirection: "column" }}>
        <Matches />
        <FlatList data={chats} renderItem={({ item }) => <Chat chatLine={item.last_chat_line} user={item.recipient} chat={item.chat} />} keyExtractor={item => item.id} style={{ width: "100%" }} />
        <NavigationBar onPage={"chats"} />
    </View>
};

export default Chats;