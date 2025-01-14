import { VStack, Image, Text, Center, Heading, ScrollView, onChange } from "@gluestack-ui/themed"
import BackgrounImage from "@assets/background.png";
import Logo from "@assets/logo.svg";
import Input from "@components/Input";
import Button from "@components/Button";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import { Controller, useForm } from "react-hook-form";

type FormDataProps = {
    name: string;
    email: string;
    password: string;
    password_confirm: string;
}
const SignUp = () => {
    const navigator = useNavigation<AuthNavigatorRoutesProps>();

    const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            password_confirm: ""
        }
    });

    const handleGoBack = () => {
        navigator.navigate("SignIn");
    }

    function handleSignUp({ name, email, password, password_confirm }: FormDataProps): void {
        console.log(name);
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
                            rules={
                                {
                                    required: "Name is required"
                                }
                            }
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
                            rules={
                                {
                                    required: "E-mail is required", 
                                    pattern: {
                                        value:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "E-mail is invalid"
                                    }
                                }
                            }
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