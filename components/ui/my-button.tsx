import {PropsWithChildren} from "react";
import {Button, ButtonText, IButtonProps} from "@/components/ui/button";

export function MyButton({children, ...props}: PropsWithChildren & IButtonProps) {

    return (
        <Button {...props}>
            <ButtonText>
                {children}
            </ButtonText>
        </Button>
    )

}