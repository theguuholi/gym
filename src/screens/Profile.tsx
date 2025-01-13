import ScreenHeader from "@components/ScreenHeader";
import UserPhoto from "@components/UserPhoto";
import { Center, Text, VStack } from "@gluestack-ui/themed"
import { ScrollView } from "react-native";


const Profile = () => {
    return (
        <VStack flex={1}>
            <ScreenHeader title="Profile" />
            <ScrollView
                contentContainerStyle={{ paddingBottom: 32 }}
            >
                <Center mt="$6" px="$10">
                    <UserPhoto
                        source={{ uri: "https://github.com/theguuholi.png" }}
                        alt="Profile Photo"
                        size="xl"
                    />
                </Center>

            </ScrollView>
        </VStack>
    )
}

export default Profile;