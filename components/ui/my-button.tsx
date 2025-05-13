import {PropsWithChildren, useMemo} from "react";
import {Button, ButtonText, IButtonProps} from "@/components/ui/button";

export function MyButton({children, ...props}: PropsWithChildren & IButtonProps) {

    const textStyles = useMemo(() => {
        return props?.className?.split(" ").filter(x => x && x.includes("text")).join(" ")
    }, [props.className])
    return (
        <Button {...props}>
            <ButtonText className={textStyles}>
                {children}
            </ButtonText>
        </Button>
    )

}