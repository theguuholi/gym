import { VStack, Image } from "@gluestack-ui/themed"
import BackgrounImage from "@assets/background.png";

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
        </VStack>
    )
}
export default SignIn