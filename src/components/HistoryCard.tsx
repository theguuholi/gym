import { HStack, VStack, Heading, Text } from "@gluestack-ui/themed"

const HistoryCard = () => {
    return (
        <HStack w="$full" px="$4" py="$4" mb="$3" bg="$gray600" rounded="$md" alignItems="center" justifyContent="space-between">
            <VStack mr="$5" flex={1}>
                <Heading
                    color="$white"
                    fontSize="$md"
                    textTransform="capitalize"
                    fontFamily="$heading"
                    numberOfLines={1}
                >Back</Heading>
                <Text
                    color="$gray100"
                    fontSize="$lg"
                    numberOfLines={1}
                >Front </Text>
            </VStack>
            <Text
                color="$gray300"
                fontSize="$md"
            >
                08:56
            </Text>
        </HStack>
    )
}

export default HistoryCard;