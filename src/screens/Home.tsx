import ExerciseCard from "@components/ExerciseCard";
import Group from "@components/Group";
import HomeHeader from "@components/HomeHeader";
import { HStack, VStack, Text, Heading } from "@gluestack-ui/themed"
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { useState } from "react";
import { FlatList } from "react-native";


const Home = () => {
    const navigation = useNavigation<AppNavigatorRoutesProps>();
    
    const [groups, setGroups] = useState(["Back", "Shoulder", "Triceps", "Biceps", "Chest", "Legs"]);
    const [exercises, setExercises] = useState([
        {
            id: "1",
            name: "Pull Up",
            group: "Back"
        },
        {
            id: "2",
            name: "Shoulder Press",
            group: "Shoulder"
        },
        {
            id: "3",
            name: "Tricep Dip",
            group: "Triceps"
        },
        {
            id: "4",
            name: "Bicep Curl",
            group: "Biceps"
        },
        {
            id: "5",
            name: "Bench Press",
            group: "Chest"
        },
        {
            id: "6",
            name: "Squat",
            group: "Legs"
        }
    ]);
    const [groupSelected, setGroupSelected] = useState("Back");

    const handleOpenExerciseDetails = () => {
        navigation.navigate("Exercise")
    }

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
                        />
                    )}
                />
            </VStack>

        </VStack>
    )
}

export default Home;