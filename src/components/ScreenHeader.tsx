import { Heading, Center } from "@gluestack-ui/themed";

type Props = {
    title: string;
}
const ScreenHeader = ({ title }: Props) => {
    return     <Center bg="$gray600" pb="$6" pt="$16">
    <Heading color="$gray100" fontSize="$xl" fontFamily="$heading">
      {title}
    </Heading>
  </Center>
}

export default ScreenHeader;