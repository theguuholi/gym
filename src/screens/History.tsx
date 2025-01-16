import HistoryCard from "@components/HistoryCard";
import ScreenHeader from "@components/ScreenHeader";
import ToastMessage from "@components/ToastMessage";
import { Heading, VStack, Text, useToast } from "@gluestack-ui/themed"
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { useCallback, useEffect, useState } from "react";
import { SectionList } from "react-native";


const History = () => {
    const toast = useToast();
    const [isLoading, setIsLoading] = useState(true);
    const [exercises, setExercises] = useState();


    const fetchHistory = async () => {
        try {
            setIsLoading(true);
            const response = await api.get(`/history`);
            
        } catch (error) {
            const isAppError = error instanceof AppError;

            return toast.show({
                placement: 'top',
                render: ({ id }) => (
                    <ToastMessage
                        id={id}
                        title="Error"
                        description={isAppError ? error.message : "it was not possible to fetch the history"}
                        action="error"
                        onClose={() => toast.close(id)}
                    />
                )
            })
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(useCallback(() => {
        fetchHistory();
    }, []));

    return (
        <VStack flex={1}>
            <ScreenHeader title="History" />

            <SectionList
                sections={exercises}
                keyExtractor={(item) => item}
                renderItem={({ item }) => <HistoryCard />}
                style={{ paddingHorizontal: 32 }}
                contentContainerStyle={
                    exercises.length === 0 && { flex: 1, justifyContent: "center", alignItems: "center" }
                }
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    () => <Text color="$gray100" textAlign="center">There is no exercises today</Text>
                }
                renderSectionHeader={({ section: { title } }) => <Heading
                    color="$gray200"
                    fontSize="$md"
                    fontFamily="$heading"
                    mt="$10"
                    mb="$3"
                >{title}</Heading>}
            />
        </VStack>
    )
}

export default History;