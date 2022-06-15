import React from "react";
import { StyleSheet, View, Text, TextInput, Pressable, KeyboardAvoidingView, Platform } from "react-native";
import { Formik, useField } from "formik";
import { useNavigate } from "react-router-native";
import * as Yup from "yup";
import axios from 'axios';
import constants from 'expo-constants';
import * as SecureStore from 'expo-secure-store';
//types
type FormikParameter = {
    name: string,
    [x: string]: any;
}
type fnFromObj = {
    [x: string]: (values: any) => void;
}
///////
const initialValues = {
    username: "",
    password: "",
};

const validationSchema = Yup.object({
    username: Yup.string().required("Requerido"),
    password: Yup.string()
        .required("Requerido")
        .min(6, "La contraseña debe tener mínimo 6 caracteres"),
});

const FormikTextInput = ({ name, ...props }: FormikParameter) => {
    const [field, meta, helpers] = useField(name);
    const showError = meta.touched && meta.error;
    return (
        <>
            <TextInput
                onChangeText={(text) => helpers.setValue(text)}
                onBlur={() => helpers.setTouched(true)}
                value={field.value}
                {...props}
            />
            {showError && <Text style={{ color: "red", margin: 2 }}>{meta.error}</Text>}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flexShrink: 1,
        backgroundColor: "#181a1b",
        flexDirection: "column",
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
        width: "40%",
        marginLeft: "30%",
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
    }
});
const LoginForm = ({ onSubmit }: fnFromObj) => {
    const [username, usernameMeta, setUsername] = useField("username");
    const [password, passwordMeta, setPassword] = useField("password");
    return (
        <View style={styles.loginContainer}>
            <FormikTextInput
                name={"username"}
                placeholder="Nombre de usuario"
                onChangeText={(text: any) => setUsername.setValue(text)}
                value={username.value}
                style={styles.field}
            />
            <FormikTextInput
                name={"password"}
                placeholder="Contraseña"
                onChangeText={(text: any) => setPassword.setValue(text)}
                value={password.value}
                style={styles.field}
                secureTextEntry={true}
            />
            <Pressable onPress={onSubmit} style={styles.button} testID="submitButton">
                <Text style={styles.buttonText}>Iniciar Sesión</Text>
            </Pressable>
        </View>
    );
};
const LoginContainer = ({ onSubmit }: fnFromObj) => {
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {({ handleSubmit }) => <LoginForm onSubmit={handleSubmit} />}
        </Formik>
    );
};

const Login = () => {
    // const [login]= useLogin();
    const history = useNavigate();
    const onSubmit = async (values: any) => {
        const apiURL = constants.manifest!.extra!.apiUrl + 'api/users/login/';
        const response = await axios.post(apiURL, values);
        await SecureStore.setItemAsync("token", response.data.token);
        if (response.data.token) {
            goHome();
        } else {
            alert("Usuario o contraseña incorrectos");
        }
    };
    const goToRegister = () => {
        history("/register");
    };
    const goHome = () => {
        history("/home");
    };
    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
            <View style={{ flex: 4, alignItems: "center", justifyContent: "center" }}>
                <View style={styles.logoButton}>
                    <Text style={styles.logoText}>Playdate</Text>
                </View>
            </View>
            <View
                style={{ flex: 1, justifyContent: "center", paddingHorizontal: "15%" }}
            >
                <Text style={styles.middleText}>
                    En Playdate encontrarás a alguien para ti
                </Text>
            </View>
            <View style={{ flex: 8, justifyContent: "center" }}>
                <LoginContainer onSubmit={onSubmit} />
                <Pressable style={{ alignItems: "center", justifyContent: "flex-start", margin: 5 }} onPress={goToRegister}>
                    <Text style={styles.registerText}>¿Aún no estás registrado?</Text>
                </Pressable>
            </View>
        </KeyboardAvoidingView>
    );
};

export default Login;
