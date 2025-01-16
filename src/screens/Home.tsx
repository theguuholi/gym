import ExerciseCard from "@components/ExerciseCard";
import Group from "@components/Group";
import HomeHeader from "@components/HomeHeader";
import Loading from "@components/Loading";
import ToastMessage from "@components/ToastMessage";
import { ExerciseDTO } from "@dtos/ExerciseDTO";
import { HStack, VStack, Text, Heading, useToast } from "@gluestack-ui/themed"
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { useCallback, useEffect, useState } from "react";
import { FlatList } from "react-native";


const Home = () => {
    const navigation = useNavigation<AppNavigatorRoutesProps>();
    const [isLoading, setIsLoading] = useState(true);
    const [groups, setGroups] = useState<string[]>([]);
    const toast = useToast();
    const [exercises, setExercises] = useState<ExerciseDTO[]>([]);
    const [groupSelected, setGroupSelected] = useState("costas");

    const handleOpenExerciseDetails = () => {
        navigation.navigate("Exercise")
    }

    const fetchGroups = async () => {
        try {
            setIsLoading(true);
            const response = await api.get("/groups");
            setGroups(response.data);
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
        }
        finally {
            setIsLoading(false);
        }
    }

    const fetchExercisesByGroup = async (group: string) => {
        try {
            const response = await api.get(`/exercises/bygroup/${group}`);
            setExercises(response.data);
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
        }
    }

    useEffect(() => {
        fetchGroups();
    }, [])

    useFocusEffect(useCallback(() => {
        fetchExercisesByGroup(groupSelected);
    }, [groupSelected]));

    return (
        <VStack flex={1}>
            <HomeHeader></HomeHeader>

            <FlatList
                data={groups}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                    <Group
                        name={item}
                        isActive={groupSelected.toLowerCase() === item.toLowerCase()}
                        onPress={() => setGroupSelected(item)}
                    />
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 32 }}
                style={{ marginVertical: 40, maxHeight: 44, minHeight: 44 }}
            />

            {
                isLoading ? <Loading /> : (
                    <VStack px="$8" flex={1}>
                        <HStack justifyContent="space-between" mb="$5" alignItems="center">
                            <Heading color="$gray200" fontSize="$md">Exercises</Heading>
                            <Text color="$gray200" fontSize="$sm" fontFamily="$body">4</Text>
                        </HStack>


                        <FlatList
                            data={exercises}
                            keyExtractor={(item) => item.id}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ paddingBottom: 20 }}
                            renderItem={({ item }) => (
                                <ExerciseCard
                                    onPress={handleOpenExerciseDetails}
                                    data={item}
                                />
                            )}
                        />
                    </VStack>
                )
            }


        </VStack>
    )
}

export default Home;