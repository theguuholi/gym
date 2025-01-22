import Button from "@components/Button";
import Input from "@components/Input";
import ScreenHeader from "@components/ScreenHeader";
import UserPhoto from "@components/UserPhoto";
import { Center, Heading, Text, useToast, VStack } from "@gluestack-ui/themed"
import { Alert, ScrollView, TouchableOpacity } from "react-native";
import { yupResolver } from '@hookform/resolvers/yup';
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { useState } from "react";
import ToastMessage from "@components/ToastMessage";
import { Controller, useForm } from "react-hook-form";
import { useAuth } from "@hooks/useAuth";
import * as yup from "yup";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";

type FormDataProps = {
    name: string;
    email: string;
    password: string;
    old_password: string;
    confirm_password: string;
}

const profileSchema = yup.object({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    old_password: yup.string().min(6, 'Old password must be at least 6 characters'),
    password: yup.string().min(6, 'Password mus have 6 chars').nullable().transform((value) => !!value ? value : null),
    confirm_password: yup
        .string()
        .nullable()
        .transform((value) => (!!value ? value : null))
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .when('password', {
            is: (Field: any) => Field,
            then: (schema) =>
                schema.nullable().required('Password confirmation is required')
                    .transform((value) => (!!value ? value : null))
            ,
        }),


})

const Profile = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [userPhoto, setUserPhoto] = useState<string>("https://github.com/theguuholi.png");
    const toast = useToast();
    const { user, updateUserProfile } = useAuth()
    const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
        defaultValues: {
            name: user.name,
            email: user.email
        },
        resolver: yupResolver(profileSchema)
    });

    const handleProfileUpdate = async (data: FormDataProps) => {
        try {
            setIsLoading(true);

            const userUpdated = user;
            userUpdated.name = data.name;


            await api.put('/users', data);

            await updateUserProfile(userUpdated);

            toast.show({
                placement: 'top',
                render: ({ id }) => (
                    <ToastMessage
                        id={id}
                        title="Profile has updated"
                        action="success"
                        onClose={() => toast.close(id)}
                    />
                )
            })

        } catch (error) {
            const isAppError = error instanceof AppError;
            toast.show({
                placement: 'top',
                render: ({ id }) => (
                    <ToastMessage
                        id={id}
                        title="Error"
                        description={isAppError ? error.message : "Error to update user"}
                        action="error"
                        onClose={() => toast.close(id)}
                    />
                )
            })
        } finally {
            setIsLoading(false);
        }
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

                // setUserPhoto(photoSelected.assets[0].uri);
                const fileExtension = photoURI.split('.').pop();
                const photoFile = {
                    uri: photoURI,
                    type: `${photoSelected.assets[0].type}/${fileExtension}`,
                    name: `${user.name}.${fileExtension}`.toLocaleLowerCase()
                } as any;

                const userPhotoUploadForm = new FormData();
                userPhotoUploadForm.append("avatar", photoFile);
                const avatarUpdatedResponse = await api.patch('/users/avatar', userPhotoUploadForm, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                toast.show({
                    placement: 'top',
                    render: ({ id }) => (
                        <ToastMessage
                            id={id}
                            title="Uploaded image"
                            action="success"
                            onClose={() => toast.close(id)}
                        />
                    )})

                    const userUpdated = user; 
                    userUpdated.avatar = avatarUpdatedResponse.data.avatar;
                    updateUserProfile(userUpdated);
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
                                <Input placeholder="Name" onChangeText={onChange} value={value}
                                    errorMessage={errors.name?.message} />
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
                                <Input placeholder="Old Password"
                                    errorMessage={errors.old_password?.message}
                                    secureTextEntry onChangeText={onChange} />
                            )}
                            name="old_password"
                        />
                        <Controller
                            control={control}
                            render={({ field: { onChange } }) => (
                                <Input placeholder="New Password"
                                    errorMessage={errors.password?.message}

                                    secureTextEntry onChangeText={onChange} />
                            )}
                            name="password"
                        />

                        <Controller
                            control={control}
                            render={({ field: { onChange } }) => (
                                <Input placeholder="Confirm Password"
                                    errorMessage={errors.confirm_password?.message}
                                    secureTextEntry onChangeText={onChange} />
                            )}
                            name="confirm_password"
                        />

                        <Button title="Update" onPress={handleSubmit(handleProfileUpdate)} isLoading={isLoading} />

                    </Center>
                </Center>


            </ScrollView>
        </VStack>
    )
}

export default Profile;