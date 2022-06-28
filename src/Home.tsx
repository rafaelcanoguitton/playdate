import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TextInput, Pressable, BackHandler, KeyboardAvoidingView, Platform, FlatList, Image, useWindowDimensions } from "react-native";
import { useNavigate, Navigate } from "react-router-native";
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
import { PanGestureHandler } from 'react-native-gesture-handler';
import constants from 'expo-constants';
import axios from "axios";
const NavigationBar = () => {
    const navigate = useNavigate();
    return (
        <View style={{ flexDirection: 'row', height: '7%', backgroundColor: 'black', justifyContent: "space-evenly", alignItems: "center", width: "100%", }}>
            <Pressable onPress={() => navigate('/home')}>
                <Ionicons name="ios-home" size={30} color="white" />
            </Pressable>
            <Pressable onPress={() => navigate('/chat')}>
                <Ionicons name="ios-chatbubbles" size={30} color="gray" />
            </Pressable>
            <Pressable onPress={() => navigate('/settings')}>
                <Ionicons name="ios-settings" size={30} color="gray" />
            </Pressable>
            <Pressable onPress={() => navigate('/profile')}>
                <Ionicons name="ios-person" size={30} color="gray" />
            </Pressable>
        </View>
    );
};

const TopicContainer = ({ topic }) => {
    return (
        <View style={{
            backgroundColor: "black", margin: 4,
            borderRadius: 10,
            padding: 8,
        }}>
            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', }}>{topic}</Text>
        </View>
    );
};
const PersonCard = ({ person }) => {
    const navigate = useNavigate();
    return (
        <View style={{
            flexDirection: 'column', backgroundColor: '#181a1b', borderRadius: 50, shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 5,
            },
            shadowOpacity: 0.36,
            shadowRadius: 6.68,
            elevation: 11,
        }}>
            <Image source={{ uri: `data:image/${person.pictures[0].extension};base64,${person.pictures[0].file}` }} style={{ width: 350, height: 350, overflow: "hidden", justifyContent: "flex-end", borderRadius: 10, position: "relative" }} />
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginTop: -100, marginLeft: 10 }}>
                <Text style={{ color: 'white', fontSize: 30, fontWeight: 'bold' }}>{person.username}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginLeft: 20, marginTop: 10 }}>
                <Text style={{ color: 'white', fontSize: 20 }}>{"Me gusta el café  y las películas de romance ☕📚📽"}</Text>
            </View>
            <View style={{ flexShrink: 1, flexDirection: "row", justifyContent: "space-evenly", marginTop: 10 }}>
                <FlatList numColumns={2} columnWrapperStyle={{ flexWrap: 'nowrap', marginTop: 5, justifyContent: "center", flexDirection: "row" }}
                    data={person.topics}
                    renderItem={({ item }) => <TopicContainer topic={`#${item}`} />}
                    keyExtractor={item => item}
                />
            </View>
        </View>
    );
};

const ROTATION = 60;
const SWIPE_VELOCITY = 800;
const Home = () => {
    const [people, setPeople] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const AnimatedIcon = Animated.createAnimatedComponent(Entypo);
    const navigate = useNavigate();

    const translateX = useSharedValue(0);
    const { width: screenWidth } = useWindowDimensions();
    const hiddenTranslateWidth = screenWidth * 2;
    const rotate = useDerivedValue(() =>
        interpolate(translateX.value, [0, hiddenTranslateWidth], [0, ROTATION]) + 'deg'
    );
    const cardStyle = useAnimatedStyle(() => ({
        transform: [
            {
                translateX: translateX.value,
            },
            {
                rotate: rotate.value,
            }
        ],
    }));
    const nextCardStyle = useAnimatedStyle(() => ({
        transform: [
            {
                scale: interpolate(
                    translateX.value,
                    [-hiddenTranslateWidth, 0, hiddenTranslateWidth],
                    [1, 0.8, 1],
                ),
            },
        ],
        opacity: interpolate(
            translateX.value,
            [-hiddenTranslateWidth, 0, hiddenTranslateWidth],
            [1, 0.5, 1],
        ),
    }));
    const likeStyle = useAnimatedStyle(() => ({
        opacity: interpolate(translateX.value, [0, hiddenTranslateWidth / 5], [0, 1]),
    }));
    const nopeStyle = useAnimatedStyle(() => ({
        opacity: interpolate(translateX.value, [0, -hiddenTranslateWidth / 5], [0, 1]),
    }));
    const randomChange = () => {
        translateX.value = withSpring(Math.random());
    };
    const gestureHandler = useAnimatedGestureHandler({
        onStart: (_, context) => {
            context.startX = translateX.value;
        },
        onActive: (event, context) => {
            translateX.value = context.startX + event.translationX;
        },
        onEnd: (event) => {
            if (Math.abs(event.velocityX) < SWIPE_VELOCITY) {
                translateX.value = withSpring(0);
                return;
            }
            translateX.value = withSpring(
                hiddenTranslateWidth * Math.sign(event.velocityX), {}, () => runOnJS(setCurrentIndex)(currentIndex + 1));
        },
    });
    useEffect(() => {
        translateX.value = 0;
    }, [currentIndex]);


    useEffect(() => {
        const getPeople = async () => {
            const URL = constants.manifest!.extra!.apiUrl + 'api/users/get_users';
            const response = await axios.get(URL);
            setPeople(response.data);
        }
        getPeople();
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: '#181a1b' }}>
            <View style={{ flex: 8, justifyContent: 'center', alignItems: 'center', flexDirection: "column" }}>
                <Animated.View style={[{ justifyContent: 'center', alignItems: 'center', position: "absolute", top: "17.5%" }, nextCardStyle]}>
                    {people[currentIndex + 1] && <PersonCard person={people[currentIndex + 1]} />}
                </Animated.View>
                <PanGestureHandler onGestureEvent={gestureHandler}>
                    <Animated.View style={[{ flex: 6, justifyContent: 'center', alignItems: 'center' }, cardStyle]}>
                        <AnimatedIcon name="heart" size={200} color="red" style={[{ position: "absolute", top: "50%", zIndex: 1 }, likeStyle]} />
                        <AnimatedIcon name="circle-with-cross" size={200} color="red" style={[{ position: "absolute", top: "50%", zIndex: 1 }, nopeStyle]} />
                        {people[currentIndex] && <PersonCard person={people[currentIndex]} />}
                    </Animated.View>
                </PanGestureHandler>
                <View style={{ flexDirection: 'column', justifyContent: 'flex-end', width: "80%", flex: 1 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: 30 }}>
                        <Pressable onPress={randomChange}>
                            <View style={{ backgroundColor: 'white', padding: 10, borderRadius: 100, alignItems: 'center', justifyContent: 'center' }}>
                                <Ionicons name="ios-heart" size={30} color="red" />
                            </View>
                        </Pressable>
                        <Pressable onPress={() => navigate('/home')}>
                            <View style={{ backgroundColor: 'white', padding: 10, borderRadius: 100, alignItems: 'center', justifyContent: 'center' }}>
                                <Ionicons name="arrow-back" size={30} color="#D6CD04" />
                            </View>
                        </Pressable>
                        <Pressable onPress={() => navigate('/home')}>
                            <View style={{ backgroundColor: 'white', padding: 10, borderRadius: 100, alignItems: 'center', justifyContent: 'center' }}>
                                <Ionicons name="chatbox" size={30} color="purple" />
                            </View>
                        </Pressable>
                        <Pressable onPress={() => navigate('/home')}>
                            <View style={{ backgroundColor: 'white', padding: 10, borderRadius: 100, alignItems: 'center', justifyContent: 'center' }}>
                                <Entypo name="circle-with-cross" size={30} color="black" />
                            </View>
                        </Pressable>
                    </View>
                </View>
            </View>
            <NavigationBar />
        </View>
    );
};

const styles = StyleSheet.create({

});

export default Home;