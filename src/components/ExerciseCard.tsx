import { ExerciseDTO } from "@dtos/ExerciseDTO";
import { HStack, Image, VStack, Heading, Text, Icon } from "@gluestack-ui/themed";
import { api } from "@services/api";
import { ChevronRight } from "lucide-react-native";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

type Props = TouchableOpacityProps & {
    data: ExerciseDTO
}


const ExerciseCard = ({data, ...rest }: Props) => {
    return <TouchableOpacity {...rest}>
        <HStack bg="$gray500" alignItems="center" p="$2" rounded="$md" mb="$3">
            <Image source={
                {
                    uri: `${api.defaults.baseURL}/exercise/thumb/${data.thumb}`
                }
            } alt="Exercise Image"
                w="$16"
                h="$16"
                mr="$4"
                resizeMode="cover"
            />

            <VStack flex={1}>
                <Heading fontSize="$lg" color="$white" fontFamily="$heading" >
                    {data.name}
                </Heading>
                <Text fontSize="$sm" color="$gray200" mt="$1" >{data.series} sets x {data.repetitions} rep</Text>
            </VStack>

            <Icon as={ChevronRight} color="$gray300"  />
        </HStack>
    </TouchableOpacity>
}

export default ExerciseCard;