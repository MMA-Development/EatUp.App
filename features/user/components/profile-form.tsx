import {useUpdateMeMutation} from "@/features/user/api/update-profile";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {UpdatePayload, UpdatePayloadSchema} from "@/features/user/types";
import {VStack} from "@/components/ui/vstack";
import {Input, InputField} from "@/components/ui/input";
import {HStack} from "@/components/ui/hstack";
import {Button, ButtonSpinner, ButtonText} from "@/components/ui/button";
import {
    FormControl,
    FormControlError,
    FormControlErrorIcon,
    FormControlErrorText,
    FormControlLabel, FormControlLabelText
} from "@/components/ui/form-control";
import {AlertCircleIcon} from "@/components/ui/icon";
import React from "react";
import {useRouter} from "expo-router";
import {useGetMeQuery} from "@/features/auth/api/me";

export default function ProfileForm() {
    const router = useRouter()
    const [update, {isLoading}] = useUpdateMeMutation()
    const {data} = useGetMeQuery()

    const {control, handleSubmit, formState: {errors}} = useForm<UpdatePayload>({
        defaultValues: data,
        resolver: zodResolver(UpdatePayloadSchema),
    });

    const onSubmit = async (data: UpdatePayload) => {
        try {
            await update(data)
            router.back()
        } catch (e) {
            console.error(e)
        }
    };
    return (
        <VStack className={"h-full"}>
            <FormControl
                className="mb-4"
                isInvalid={!!errors.email}
            >
                <FormControlLabel className="mb-2">
                    <FormControlLabelText>
                        Email
                    </FormControlLabelText>
                </FormControlLabel>
                <Controller
                    control={control}
                    name="email"
                    render={({field: {onChange, value}}) => (
                        <Input>
                            <InputField
                                value={value}
                                onChangeText={onChange}
                            />
                        </Input>
                    )}
                />
                {errors.email && (
                    <FormControlError>
                        <FormControlErrorIcon as={AlertCircleIcon} className="w-4 h-4 text-red-500"/>
                        <FormControlErrorText className="text-red-500 text-sm mt-1">
                            {errors.email.message}
                        </FormControlErrorText>
                    </FormControlError>
                )}
            </FormControl>
            <FormControl
                className="mb-4"
                isInvalid={!!errors.fullName}
            >
                <FormControlLabel className="mb-2">
                    <FormControlLabelText>
                        Fuld Navn
                    </FormControlLabelText>
                </FormControlLabel>
                <Controller
                    control={control}
                    name="fullName"
                    render={({field: {onChange, value}}) => (
                        <Input>
                            <InputField
                                value={value}
                                onChangeText={onChange}
                            />
                        </Input>
                    )}
                />
                {errors.fullName && (
                    <FormControlError>
                        <FormControlErrorIcon as={AlertCircleIcon} className="w-4 h-4 text-red-500"/>
                        <FormControlErrorText className="text-red-500 text-sm mt-1">
                            {errors.fullName.message}
                        </FormControlErrorText>
                    </FormControlError>
                )}
            </FormControl>

            <HStack className={"gap-4 mt-4 justify-end"}>
                <Button action="secondary">
                    <ButtonText onPress={router.back}>
                        Cancel
                    </ButtonText>
                </Button>
                <Button onPress={handleSubmit(onSubmit)}>
                    <ButtonText>
                        Save
                    </ButtonText>
                    {isLoading &&
                        <ButtonSpinner/>
                    }
                </Button>
            </HStack>
        </VStack>
    )
}