import { VStack, Image, Text, Center } from "@gluestack-ui/themed"
import BackgrounImage from "@assets/background.png";
import Logo from "@assets/logo.svg";

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

            <Center my="$24">
                <Logo />
                <Text color="$gray100" fontSize="$sm">
                    Train your Mind and your Body
                </Text>
            </Center>
        </VStack>
    )
}
export default SignIn