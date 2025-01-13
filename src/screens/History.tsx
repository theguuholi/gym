import HistoryCard from "@components/HistoryCard";
import ScreenHeader from "@components/ScreenHeader";
import { Heading, VStack, Text } from "@gluestack-ui/themed"
import { useState } from "react";
import { SectionList } from "react-native";


const History = () => {
    const [exercises, setExercises] = useState([
        {
            title: "01.13.2024",
            data: [
                "Pull Up", "Shoulder Press", "Tricep Dip", "Bicep Curl", "Bench Press", "Squat"
            ]
        },
        {
            title: "01.12.2024",
            data: [
                "Pull Down"
            ]
        },
    ]);
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