import React from "react";
import { Route, Routes, Navigate } from "react-router-native";
import { StyleSheet, View } from "react-native";
import Login from "./Login";
import Register from "./Register";
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#181a1b',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    },
});
const Main = () => {
    return (
        <View style={styles.container}>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </View>
    );
};

export default Main;