import { VStack, Image, Text, Center, Heading } from "@gluestack-ui/themed"
import BackgrounImage from "@assets/background.png";
import Logo from "@assets/logo.svg";
import Input from "@components/Input";
import Button from "@components/Button";

const SignIn = () => {
    return (
        <VStack flex={1} bg='$gray700' >
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

                    <Input placeholder="E-mail" keyboardType="email-address" autoCapitalize="none" />
                    <Input placeholder="Password" secureTextEntry />

                    <Button title="Sign In" />
                </Center>

                <Center flex={1} justifyContent="flex-end" mt="$4">
                    <Text color="$gray100" fontSize="$sm" mb="$3" fontFamily="$bold">Do you still does not have access?</Text>
                    <Button title="Create" variant="outline" />
                </Center>
            </VStack>

        </VStack>
    )
}
export default SignIn