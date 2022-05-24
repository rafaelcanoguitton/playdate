import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TextInput, Pressable, BackHandler, KeyboardAvoidingView, Platform } from "react-native";
import { Formik, useField } from "formik";
import { useNavigate } from "react-router-native";
import { setter, obj } from "./Types/PersonalInfo";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import * as Yup from "yup";

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

const initialValues = {
    email: "",
    username: "",
    password: "",
    passwordConfirmation: "",
};

const validationSchema = Yup.object({
    email: Yup.string().email("Email inválido").required("Requerido"),
    username: Yup.string().required("Requerido"),
    password: Yup.string().required("Requerido").min(6, "La contraseña debe tener mínimo 6 caracteres"),
    passwordConfirmation: Yup.string().required("Requerido").oneOf([Yup.ref("password"), null], "Las contraseñas no coinciden"),
});

const FormikTextInput = ({ name, ...props }) => {
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

const RegisterForm = ({ onSubmit }) => {
    const [email, emailMeta, setEmail] = useField("email");
    const [username, usernameMeta, setUsername] = useField("username");
    const [password, passwordMeta, setPassword] = useField("password");
    const [passwordConfirmation, passwordConfirmationMeta, setPasswordConfirmation] = useField("passwordConfirmation");
    return (<View style={styles.loginContainer}>
        <FormikTextInput
            name="email"
            placeholder="Email"
            style={styles.field}
            onChangeText={(text: any) => setEmail.setValue(text)}
            value={email.value}
        />
        <FormikTextInput
            name="username"
            placeholder="Nombre de usuario"
            style={styles.field}
            onChangeText={(text: any) => setUsername.setValue(text)}
            value={username.value}
        />
        <FormikTextInput
            name="password"
            placeholder="Contraseña"
            style={styles.field}
            onChangeText={(text: any) => setPassword.setValue(text)}
            value={password.value}
            secureTextEntry={true}
        />
        <FormikTextInput
            name="passwordConfirmation"
            placeholder="Confirmar contraseña"
            style={styles.field}
            onChangeText={(text: any) => setPasswordConfirmation.setValue(text)}
            value={passwordConfirmation.value}
            secureTextEntry={true}
        />
        <BouncyCheckbox onPress={(isChecked: boolean) => { }} text="Acepto los términos y condiciones" textStyle={{
            textDecorationLine: "none",
        }} />
        <Pressable onPress={onSubmit} style={styles.button} testID="submitButton">
            <Text style={styles.buttonText}>Registrarse</Text>
        </Pressable>
    </View>);
};

const RegisterContainer = ({ onSubmit }) => {
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {({ handleSubmit }) => <RegisterForm onSubmit={handleSubmit} />}
        </Formik>
    );
};


const Register = ({ setInfo, info }: { setInfo: setter, info: obj }) => {
    //const [register] = useRegister();
    useEffect(() => {
        const backAction = () => {
            navigate("/");
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );
        return () => backHandler.remove();
    }, []);
    const navigate = useNavigate();
    const onSubmit = (values) => {
        setInfo({ ...info, email: values.email, username: values.username, password: values.password });
        navigate("/gender");
    }
    return (<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
        <View style={{ flex: 3, alignItems: "center", justifyContent: "flex-end" }}>
            <View style={styles.logoButton}>
                <Text style={styles.logoText}>Playdate</Text>
            </View>
        </View>
        <View style={{ flex: 8, justifyContent: "center" }}>
            <RegisterContainer onSubmit={onSubmit} />
        </View>
    </KeyboardAvoidingView>);
};

export default Register;