import Group from "@components/Group";
import HomeHeader from "@components/HomeHeader";
import { VStack } from "@gluestack-ui/themed"
import { useState } from "react";
import { FlatList } from "react-native";


const Home = () => {
    const [groups, setGroups] = useState(["Back", "Shoulder", "Triceps", "Biceps", "Chest", "Legs"]);
    const [groupSelected, setGroupSelected] = useState("Back");

    return (
        <VStack flex={1}>
            <HomeHeader></HomeHeader>

            <FlatList
                data={groups}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                    <Group
                        name={item}
                        isActive={groupSelected === item}
                        onPress={() => setGroupSelected(item)}
                    />
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 32 }}
                style={{ marginVertical: 40, maxHeight: 44, minHeight: 44 }}
            />
        </VStack>
    )
}

export default Home;