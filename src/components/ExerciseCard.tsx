import { HStack, Image, VStack, Heading, Text, Icon } from "@gluestack-ui/themed";
import { ChevronRight } from "lucide-react-native";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

type Props = TouchableOpacityProps & {}

const ExerciseCard = ({ ...rest }: Props) => {
    return <TouchableOpacity {...rest}>
        <HStack bg="$gray500" alignItems="center" p="$2" rounded="$md" mb="$3">
            <Image source={
                {
                    uri: "https://github.com/theguuholi.png"
                }
            } alt="Exercise Image"
                w="$16"
                h="$16"
                mr="$4"
                resizeMode="cover"
            />

            <VStack flex={1}>
                <Heading fontSize="$lg" color="$white" fontFamily="$heading" >
                    Front Exercise
                </Heading>
                <Text fontSize="$sm" color="$gray200" mt="$1" >3 sets x 12 rep</Text>
            </VStack>

            <Icon as={ChevronRight} color="$gray300"  />
        </HStack>
    </TouchableOpacity>
}

export default ExerciseCard;