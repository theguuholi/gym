import { Input as GlueStackInput, InputField } from "@gluestack-ui/themed"
import { ComponentProps } from "react";

type Props = ComponentProps<typeof InputField>;

const Input = ({ ...rest }: Props) => {
    return (
        <GlueStackInput bg="$gray700" h="$14" w="$full" px="$4" borderWidth="$0" borderRadius="$md"
            $focus={
                {
                    borderWidth: "$1",
                    borderColor: "$green500"
                }
            }
        >
            <InputField {...rest} color="$white" fontFamily="$body" placeholderTextColor="$gray300" />
        </GlueStackInput>
    )
}
export default Input;