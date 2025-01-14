import { Input as GlueStackInput, InputField } from "@gluestack-ui/themed"
import { ComponentProps } from "react";

type Props = ComponentProps<typeof InputField> & {
    isReadOnly?: boolean
}

const Input = ({isReadOnly = false, ...rest }: Props) => {
    return (
        <GlueStackInput  h="$14"  borderWidth="$0" borderRadius="$md"
            $focus={
                {
                    borderWidth: "$1",
                    borderColor: "$green500"
                }
            }
            isReadOnly={isReadOnly}
            opacity={isReadOnly ? 0.5 : 1}
        >
            <InputField {...rest}  px="$4" bg="$gray600" color="$white" fontFamily="$body" placeholderTextColor="$gray300" />
        </GlueStackInput>
    )
}
export default Input;