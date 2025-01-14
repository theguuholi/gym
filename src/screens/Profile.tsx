import Button from "@components/Button";
import Input from "@components/Input";
import ScreenHeader from "@components/ScreenHeader";
import UserPhoto from "@components/UserPhoto";
import { Center, Heading, Text, VStack } from "@gluestack-ui/themed"
import { ScrollView, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";

const Profile = () => {

    const handleUserPhotoSelect = async () => {
        await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });
    }

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

                    <TouchableOpacity onPress={handleUserPhotoSelect}>
                        <Text color="$green500" fontFamily="$heading" fontSize="$md" mt="$2" mb="$8">
                            Edit Profile
                        </Text>
                    </TouchableOpacity>


                    <Center w="$full" gap="$4">
                        <Input placeholder="Name" isReadOnly />
                        <Input placeholder="E-mail" />
                    </Center>

                    <Heading
                        alignSelf="flex-start"
                        fontFamily="$heading"
                        color="$gray200"
                        fontSize="$md"
                        mt="$12"
                        mb="$2"
                    >Update Password</Heading>

                    <Center w="$full" gap="$4">
                        <Input placeholder="Old Password" secureTextEntry />
                        <Input placeholder="New Password" secureTextEntry />
                        <Input placeholder="Confirm Password" secureTextEntry />
                        <Button title="Update" />

                    </Center>
                </Center>


            </ScrollView>
        </VStack>
    )
}

export default Profile;