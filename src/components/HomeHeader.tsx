import { HStack, Text, Heading, VStack, Icon } from "@gluestack-ui/themed";
import UserPhoto from "./UserPhoto";
import { LogOut } from "lucide-react-native";
import { useAuth } from "@hooks/useAuth";
import defaulUserPhotoImg from "@assets/userPhotoDefault.png"
import { TouchableOpacity } from "react-native";
import { api } from "@services/api";
const HomeHeader = () => {
    const { user, signOut } = useAuth();

    return (
        <HStack bg="$gray600" pt="$16" pb="$5" px="$8" gap="$4" alignItems="center">
            <UserPhoto
                source={
                    user.avatar
                        ? { uri: `${api.defaults.baseURL}/avatar/${user.avatar}` }
                        : defaulUserPhotoImg
                }
                alt="Profile Photo"
                w="$16"
                h="$16"
            />
            <VStack flex={1}>
                <Text color="$gray100" fontSize="$sm">Hello, </Text>
                <Heading color="$gray100" fontSize="$md">
                    {user.name}
                </Heading>
            </VStack>
            <TouchableOpacity onPress={signOut}>
                <Icon as={LogOut} color="$gray200" size="xl" />
            </TouchableOpacity>
        </HStack>
    )
}

export default HomeHeader;