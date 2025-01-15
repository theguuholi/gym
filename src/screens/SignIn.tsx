import { VStack, Image, Text, Center, Heading, ScrollView } from "@gluestack-ui/themed"
import BackgrounImage from "@assets/background.png";
import Logo from "@assets/logo.svg";
import Input from "@components/Input";
import Button from "@components/Button";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import { Controller, useForm } from 'react-hook-form';


type FormData = {
    email: string;
    password: string;
}


const SignIn = () => {
    const navigator = useNavigation<AuthNavigatorRoutesProps>();

    const handleNewAccount = () => {
        navigator.navigate("SignUp");
    }


    const { control, handleSubmit, formState: { errors } } = useForm<FormData>()

    function handleSignIn({ email, password }: FormData) {
        console.log(email, password)
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
                        <Button title="Sign In" onPress={handleSubmit(handleSignIn)} />
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