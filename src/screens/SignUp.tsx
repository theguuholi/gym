import { VStack, Image, Text, Center, Heading, ScrollView, useToast } from "@gluestack-ui/themed"
import BackgrounImage from "@assets/background.png";
import Logo from "@assets/logo.svg";
import Input from "@components/Input";
import Button from "@components/Button";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { api } from "@services/api";
import axios from "axios";
import { Alert } from "react-native";
import { AppError } from "@utils/AppError";
import ToastMessage from "@components/ToastMessage";


type FormDataProps = {
    name: string;
    email: string;
    password: string;
    password_confirm: string;
}

const signUpSchema = yup.object({
    name: yup.string().required("Name is required"),
    email: yup.string().email("E-mail is invalid").required("E-mail is required"),
    password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
    password_confirm: yup.string()
        .oneOf([yup.ref('password'), undefined], 'Passwords must match')
        .required('Password confirmation is required')
});

const SignUp = () => {
    const toast = useToast();
    const navigator = useNavigation<AuthNavigatorRoutesProps>();

    const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            password_confirm: ""
        },
        resolver: yupResolver(signUpSchema)
    });

    const handleGoBack = () => {
        navigator.navigate("SignIn");
    }

    async function handleSignUp({ name, email, password }: FormDataProps): Promise<void> {
        // const response = await fetch("http://localhost:3333/users", {
        //     method: "POST",
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         name,
        //         email,
        //         password
        //     })
        // })
        //     .then(response => response.json())
        //     .then(data => console.log(data))

        try {
            const response = await api.post("/users", { name, email, password });
        } catch (error) {
            // if(axios.isAxiosError(error)) {
            //     Alert.alert("Error", error.response?.data.message);
            // }

            const isAppError = error instanceof AppError;
            toast.show({
                placement: 'top',
                render: ({ id }) => (
                    <ToastMessage
                        id={id}
                        title={isAppError ? "Error" : "Internal Server Error"}
                        description={isAppError ? error.message : "An error occurred while trying to process your request"}
                        action="error"
                        onClose={() => toast.close(id)}
                    />
                )
            })
        }

    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>

            <VStack flex={1}>
                <Image
                    w="$full"
                    h={624}
                    source={BackgrounImage}
                    defaultSource={BackgrounImage}
                    alt="People Training"
                    position="absolute"
                />

                <VStack flex={1} px="$10" pb="$16">
                    <Center my="$24">
                        <Logo />
                        <Text color="$gray100" fontSize="$sm">
                            Train your Mind and your Body
                        </Text>
                    </Center>

                    <Center gap="$2" flex={1}>
                        <Heading color="$gray100">
                            Create Account
                        </Heading>

                        <Controller control={control}
                            name="name"
                            render={({ field: { onChange, value } }) => (
                                <Input
                                    placeholder="Name"
                                    onChangeText={onChange}
                                    value={value}
                                    errorMessage={errors.name?.message}
                                />)}
                        />

                        {/* {
                            errors.name?.message && <Text color="$white">{errors.name.message}</Text>
                        } */}


                        <Controller
                            control={control}
                            name="email"
                            render={({ field: { onChange, value } }) => (
                                <Input
                                    placeholder="E-mail"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    onChangeText={onChange}
                                    value={value}
                                    errorMessage={errors.email?.message}
                                />
                            )}
                        />


                        <Controller
                            control={control}
                            name="password"
                            render={({ field: { onChange, value } }) => (
                                <Input
                                    placeholder="Password"
                                    secureTextEntry
                                    onChangeText={onChange}
                                    value={value}
                                    errorMessage={errors.password?.message}
                                />
                            )}
                        />

                        <Controller
                            control={control}
                            name="password_confirm"
                            render={({ field: { onChange, value } }) => (
                                <Input
                                    placeholder="Confirm Password"
                                    secureTextEntry
                                    onChangeText={onChange}
                                    value={value}
                                    onSubmitEditing={handleSubmit(handleSignUp)}
                                    returnKeyType="send"
                                    errorMessage={errors.password_confirm?.message}
                                />
                            )}
                        />


                        <Button title="Sign Up" onPress={handleSubmit(handleSignUp)} />
                    </Center>

                    <Button title="Back to Sign In" variant="outline" mt="$12" onPress={handleGoBack} />
                </VStack>

            </VStack>
        </ScrollView>

    )
}
export default SignUp
