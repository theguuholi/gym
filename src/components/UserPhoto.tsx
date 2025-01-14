import { Image } from "@gluestack-ui/themed";
import { ComponentProps } from "react";

type Props = ComponentProps<typeof Image>;
const UserPhoto = ({...rest}: Props) => {
    return (
        <Image rounded="$full" borderWidth="$2" borderColor="$gray500" {...rest} />
    )
}

export default UserPhoto;