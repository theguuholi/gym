import Button from "@components/Button";
import Input from "@components/Input";
import ScreenHeader from "@components/ScreenHeader";
import UserPhoto from "@components/UserPhoto";
import { Center, Heading, Text, useToast, VStack } from "@gluestack-ui/themed"
import { Alert, ScrollView, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { useState } from "react";
import ToastMessage from "@components/ToastMessage";
import { Controller, useForm } from "react-hook-form";
import { useAuth } from "@hooks/useAuth";


type FormDataProps = {
    name: string;
    email: string;
    password: string;
    old_password: string;
    confirm_password: string;
}
const Profile = () => {

    const [userPhoto, setUserPhoto] = useState<string>("https://github.com/theguuholi.png");
    const toast = useToast();
    const { user } = useAuth()
    const { control, handleSubmit } = useForm<FormDataProps>({
        defaultValues: {
            name: user.name,
            email: user.email
        }
    })

    const handleProfileUpdate = async (data: FormDataProps) => {
        console.log(data);
    }

    const handleUserPhotoSelect = async () => {
        try {


            const photoSelected = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 4],
                quality: 1,
                // base64: true
            });

            if (photoSelected.canceled) return;

            const photoURI = photoSelected.assets[0].uri;

            if (photoURI) {
                const photoInfo = await FileSystem.getInfoAsync(photoURI) as {
                    size: number;
                }

                if (photoInfo.size && (photoInfo.size / 1024 / 1024) > 5) {
                    return toast.show({
                        placement: 'top',
                        render: ({ id }) => (
                            <ToastMessage
                                id={id}
                                title="File too large"
                                description="Please select a file smaller than 5MB"
                                action="error"
                                onClose={() => toast.close(id)}
                            />
                        )
                    })
                }

                setUserPhoto(photoSelected.assets[0].uri);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <VStack flex={1}>
            <ScreenHeader title="Profile" />

            <ScrollView
                contentContainerStyle={{ paddingBottom: 32 }}
            >
                <Center mt="$6" px="$10">
                    <UserPhoto
                        source={{ uri: userPhoto }}
                        alt="Profile Photo"
                        size="xl"
                    />

                    <TouchableOpacity onPress={handleUserPhotoSelect}>
                        <Text color="$green500" fontFamily="$heading" fontSize="$md" mt="$2" mb="$8">
                            Edit Profile
                        </Text>
                    </TouchableOpacity>


                    <Center w="$full" gap="$4">

                        <Controller
                            control={control}
                            render={({ field: { value, onChange } }) => (
                                <Input placeholder="Name" onChangeText={onChange} value={value} />
                            )}
                            name="name"
                        />

                        <Controller
                            control={control}
                            render={({ field: { value, onChange } }) => (
                                <Input placeholder="E-mail" isReadOnly onChangeText={onChange} value={value} />
                            )}
                            name="email"
                        />

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


                        <Controller
                            control={control}
                            render={({ field: { onChange } }) => (
                                <Input placeholder="Old Password" secureTextEntry onChangeText={onChange} />
                            )}
                            name="old_password"
                        />
                        <Controller
                            control={control}
                            render={({ field: { onChange } }) => (
                                <Input placeholder="New Password" secureTextEntry onChangeText={onChange} />
                            )}
                            name="password"
                        />

                        <Controller
                            control={control}
                            render={({ field: { onChange } }) => (
                                <Input placeholder="Confirm Password" secureTextEntry onChangeText={onChange} />
                            )}
                            name="confirm_password"
                        />

                        <Button title="Update" onPress={handleSubmit(handleProfileUpdate)} />

                    </Center>
                </Center>


            </ScrollView>
        </VStack>
    )
}

export default Profile;