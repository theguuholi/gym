import { Text, HStack, Icon, Heading, VStack, Box, useToast, Image } from "@gluestack-ui/themed"

import { useNavigation, useRoute } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { ArrowLeft } from "lucide-react-native";
import { ScrollView, TouchableOpacity } from 'react-native'
import BodySvg from '@assets/body.svg'
import SeriesSvg from '@assets/series.svg'
import RepetitionsSvg from '@assets/repetitions.svg'
import Button from "@components/Button";
import ToastMessage from "@components/ToastMessage";
import { AppError } from "@utils/AppError";
import { api } from "@services/api";
import { useEffect, useState } from "react";
import { ExerciseDTO } from "@dtos/ExerciseDTO";
import Loading from "@components/Loading";

type RouteParamsProps = {
    exerciseId: string;
}

const Exercise = () => {
    const navigation = useNavigation<AppNavigatorRoutesProps>();
    const [isLoading, setIsLoading] = useState(true);
    const route = useRoute();
    const toast = useToast();
    const [exercise, setExercise] = useState<ExerciseDTO>({} as ExerciseDTO);


    const { exerciseId } = route.params as RouteParamsProps;

    function handleGoBack(): void {
        navigation.goBack();
    }


    const fetchExerciseDetails = async () => {
        try {
            setIsLoading(true);
            const response = await api.get(`/exercises/${exerciseId}`);
            setExercise(response.data);
        } catch (error) {
            const isAppError = error instanceof AppError;

            return toast.show({
                placement: 'top',
                render: ({ id }) => (
                    <ToastMessage
                        id={id}
                        title="Error"
                        description={isAppError ? error.message : "An error occurred"}
                        action="error"
                        onClose={() => toast.close(id)}
                    />
                )
            })
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchExerciseDetails();
    }, [exerciseId]);

    return (
        <VStack flex={1}>
            <VStack px="$8" bg="$gray600" pt="$12">
                <TouchableOpacity onPress={handleGoBack}>
                    <Icon as={ArrowLeft} color="$green500" size="xl" />
                </TouchableOpacity>

                <HStack
                    justifyContent="space-between"
                    alignItems="center"
                    mt="$4"
                    mb="$8"
                >
                    <Heading
                        color="$gray100"
                        fontFamily="$heading"
                        fontSize="$lg"
                        flexShrink={1}
                    >
                        {exercise.name}
                    </Heading>
                    <HStack alignItems="center">
                        <BodySvg />
                        <Text color="$gray200" ml="$1" textTransform="capitalize">
                            {exercise.group}
                        </Text>
                    </HStack>
                </HStack>
            </VStack>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 32 }}
            >
                {isLoading ? <Loading /> : <VStack p="$8">
                    <Box overflow="hidden" rounded="$lg" p="$4" mb="$3">
                        <Image
                            source={{
                                uri: `${api.defaults.baseURL}/exercise/demo/${exercise.demo}`
                            }}
                            alt="Exercício"
                            style={{ width: "100%", height: 320, borderRadius: 8 }}
                        />
                    </Box>

                    <Box bg="$gray600" rounded="$md" pb="$4" px="$4">
                        <HStack
                            alignItems="center"
                            justifyContent="space-around"
                            mb="$6"
                            mt="$5"
                        >
                            <HStack>
                                <SeriesSvg />
                                <Text color="$gray200" ml="$2">
                                    {exercise?.series} sets
                                </Text>
                            </HStack>
                            <HStack>
                                <RepetitionsSvg />
                                <Text color="$gray200" ml="$2">
                                    {exercise?.repetitions} reps
                                </Text>
                            </HStack>
                        </HStack>
                        <Button title="Done" />
                    </Box>
                </VStack>}

            </ScrollView>
        </VStack>
    )
}

export default Exercise;