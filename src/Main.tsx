import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-native";
import { StyleSheet, View } from "react-native";
import Login from "./Login";
import Register from "./Register";
import Gender from "./Gender";
import * as SecureStore from 'expo-secure-store';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#181a1b',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    },
});

export const initialPersonalInfoState = {
    email: "",
    username: "",
    password: "",
    gender: [],
    preferences: [],
    topics: [],
};


const Main = () => {
    const [personalInfo, setPersonalInfo] = useState(initialPersonalInfoState);
    const history = useNavigate();
    useEffect(() => {
        const getTokenAndNavigate = async () => {
            const token = await SecureStore.getItemAsync("token");
            if (token !== null) {
                history('/register');
            }
            getTokenAndNavigate();
        };
    }, [])
    return (
        <View style={styles.container}>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register setInfo={setPersonalInfo} info={personalInfo} />} />
                <Route path="/gender" element={<Gender setInfo={setPersonalInfo} info={personalInfo} />} />
            </Routes>
        </View>
    );
};

export default Main;