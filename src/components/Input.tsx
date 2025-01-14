import {
    FormControl,
    FormControlError,
    FormControlErrorText,
    Input as GluestackInput,
    InputField,
} from '@gluestack-ui/themed'
import { ComponentProps } from "react";

type Props = ComponentProps<typeof InputField> & {
    isInvalid?: boolean,
    errorMessage?: string | null,
    isReadOnly?: boolean,
}

const Input = ({
    isReadOnly = false,
    errorMessage = null,
    isInvalid = false,
    ...props
}: Props) => {
    const invalid = !!errorMessage || isInvalid;

    return (
        <FormControl isInvalid={invalid} mb="$4" w="$full">
            <GluestackInput
                h="$14"
                borderWidth="$0"
                borderRadius="$md"
                $focus={
                    invalid ? {
                        borderWidth: 1,
                        borderColor: '$red500',
                    } : {
                        borderWidth: 1,
                        borderColor: '$green500',
                    }}
                isReadOnly={isReadOnly}
                isInvalid={invalid}
                $invalid={{
                    borderColor: '$red500',
                    borderWidth: 1,
                }
                }
                opacity={isReadOnly ? 0.5 : 1}
            >
                <InputField
                    px="$4"
                    bg="$gray700"
                    color="$white"
                    fontFamily="$body"
                    placeholderTextColor="$gray300"
                    {...props}
                />
            </GluestackInput>
            <FormControlError>
                <FormControlErrorText color="$red500">
                    {errorMessage}
                </FormControlErrorText>
            </FormControlError>
        </FormControl >
    )
}
export default Input;