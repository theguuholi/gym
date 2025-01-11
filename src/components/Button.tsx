import { ButtonSpinner, Button as GlueStackButton, Text, ToastTitle } from "@gluestack-ui/themed"
import { ComponentProps } from "react";
type Props = ComponentProps<typeof GlueStackButton> & {
    title: string;
    isLoading?: boolean;
    variant?: "solid" | "outline";
}
const Button = ({ title, isLoading = false, variant = "solid", ...rest }: Props) => {
    return (
        <GlueStackButton {...rest}
            bg={variant === "outline" ? "transparent" : "$green700"}
            h="$14"
            w="$full"
            borderWidth={variant === "outline" ? "$1" : "$0"}
            borderColor="$green500"
            rounded="$sm"
            $active-bg={variant === "outline" ? "$gray500" : "$green500"}
            disabled={isLoading}

        >
            {isLoading ? <ButtonSpinner color="$white" /> :
                <Text
                    color={variant === "outline" ? "$green500" : "$white"}
                    fontSize="$sm"
                    fontFamily="$heading"
                >
                    {title}
                </Text>}
        </GlueStackButton>
    )
}

export default Button