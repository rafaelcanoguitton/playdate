import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Pressable, BackHandler, KeyboardAvoidingView, Platform, FlatList, Image } from "react-native";
import { useNavigate } from "react-router-native";
import { TextContainer, styles } from "./Gender";
import { Bounceable } from 'rn-bounceable';

const topicMock = ["Anime", "Minecraft", "Café☕", "Euphoria", "TheOffice", "Melgar", "Gatos", "420", "PizzaCompañia", "PuestaDeSol"]

const Topics = ({ setInfo, info }: { setInfo: any, info: any }) => {
    const navigate = useNavigate();
    const [topics, setTopics] = useState(new Set());
    const [newTopic, setNewTopic] = useState("");
    const addTopic = (topic: any) => {
        setTopics(prevState => new Set([...prevState, topic]));
    };
    const remTopic = (topic: any) => {
        setTopics(prev => new Set([...prev].filter(x => x !== topic)));
    };
    const onNext = () => {
        setInfo({ ...info, topics: Array.from(topics) });
        console.log(info);
        navigate('/pictures');
    };

    return (<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
        <View style={{ flex: 3, alignItems: "center", justifyContent: "flex-end" }}>
            <View style={styles.logoButton}>
                <Text style={styles.logoText}>Playdate</Text>
            </View>
            <Text style={styles.middleText}>¿Cuales son tus intereses?</Text>
            <FlatList data={topicMock} renderItem={({ item }) => <TextContainer text={"#"+item} addGender={addTopic} remGender={remTopic} />} numColumns={2} columnWrapperStyle={{ flexWrap: 'wrap', flex: 1, marginTop: 5, justifyContent: "center", flexDirection: "row" }} />
            <Text style={{
                fontSize: 18,
                textAlign: 'center',
                color: '#828282',
            }}>O añade uno nuevo...
            </Text>
            <TextInput
                style={{
                    height: 40,
                    borderColor: 'gray',
                    borderWidth: 1,
                    margin: 10,
                    borderRadius: 10,
                    padding: 10,
                    width: "80%",
                    backgroundColor: 'white',
                }}
                onChangeText={(text) => {
                    setNewTopic(text);
                }}
                value={newTopic}
                placeholder="Escribe aquí"
            />

            <Bounceable>
                <Pressable style={styles.button} onPress={onNext}>
                    <Text style={styles.buttonText}>Siguiente</Text>
                </Pressable>
            </Bounceable>
        </View>

    </KeyboardAvoidingView>)
};

export default Topics;