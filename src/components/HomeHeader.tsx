import { HStack, Text, Heading, VStack, Icon } from "@gluestack-ui/themed";
import UserPhoto from "./UserPhoto";
import { LogOut } from "lucide-react-native";

const HomeHeader = () => {
    return (
        <HStack bg="$gray600" pt="$16" pb="$5" px="$8" gap="$4" alignItems="center">
            <UserPhoto 
                source={{uri: "https://github.com/theguuholi.png"}} 
                alt="Profile Photo" 
                w="$16"
                h="$16"
                />
            <VStack flex={1}>
                <Text color="$gray100" fontSize="$sm">Hello, </Text>
                <Heading color="$gray100" fontSize="$md">
                    Gustavo Oliveira
                </Heading>
            </VStack>

            <Icon as={LogOut} color="$gray200" size="xl" />
        </HStack>
    )
}

export default HomeHeader;