import { VStack, Image, Text, Center, Heading, ScrollView, useToast } from "@gluestack-ui/themed"
import BackgrounImage from "@assets/background.png";
import Logo from "@assets/logo.svg";
import Input from "@components/Input";
import Button from "@components/Button";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import { Controller, useForm } from 'react-hook-form';
import { useAuth } from "@hooks/useAuth";
import { AppError } from "@utils/AppError";
import ToastMessage from "@components/ToastMessage";
import { useState } from "react";


type FormData = {
    email: string;
    password: string;
}


const SignIn = () => {
    const navigator = useNavigation<AuthNavigatorRoutesProps>();
    const { singIn } = useAuth();
    const toast = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const handleNewAccount = () => {
        navigator.navigate("SignUp");
    }


    const { control, handleSubmit, formState: { errors } } = useForm<FormData>()

    async function handleSignIn({ email, password }: FormData) {
        try {
            setIsLoading(true);
            await singIn(email, password);

        } catch (error) {
            const isAppError = error instanceof AppError;
            setIsLoading(false);
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

        } finally {
            setIsLoading(false);
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

                    <Center gap="$2">
                        <Heading color="$gray100">
                            Access Account
                        </Heading>

                        <Controller
                            control={control}
                            name="email"
                            rules={{ required: 'Informe o e-mail' }}
                            render={({ field: { onChange } }) => (
                                <Input
                                    placeholder="E-mail"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    onChangeText={onChange}
                                    errorMessage={errors.email?.message}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="password"
                            rules={{ required: 'Informe a senha' }}
                            render={({ field: { onChange } }) => (
                                <Input
                                    placeholder="Senha"
                                    secureTextEntry
                                    onChangeText={onChange}
                                    errorMessage={errors.password?.message}
                                />
                            )}
                        />
                        <Button title="Sign In" onPress={handleSubmit(handleSignIn)} isLoading={isLoading} />
                    </Center>

                    <Center flex={1} justifyContent="flex-end" mt="$4">
                        <Text color="$gray100" fontSize="$sm" mb="$3" fontFamily="$bold">Do you still does not have access?</Text>
                        <Button title="Create" variant="outline" onPress={handleNewAccount} />
                    </Center>
                </VStack>

            </VStack>
        </ScrollView>

    )
}
export default SignIn