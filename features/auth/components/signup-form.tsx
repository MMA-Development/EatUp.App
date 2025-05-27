import {Controller, useForm} from "react-hook-form";
import {SignupPayload, SignupPayloadSchema, UpdatePayload} from "@/features/auth/types";
import {zodResolver} from "@hookform/resolvers/zod";
import {useSignupMutation} from "@/features/auth/api/signup";
import {FormControl, FormControlError, FormControlErrorIcon, FormControlErrorText} from "@/components/ui/form-control";
import {Input, InputField} from "@/components/ui/input";
import {AlertCircleIcon} from "@/components/ui/icon";
import {Text} from "@/components/ui/text";
import {Button, ButtonSpinner, ButtonText} from "@/components/ui/button";
import {Box} from "@/components/ui/box";
import React from "react";

export default function SignupForm() {
    const [signup, {isLoading, isError, error}] = useSignupMutation()

    const {control, handleSubmit, formState: {errors}} = useForm<SignupPayload>({
        resolver: zodResolver(SignupPayloadSchema),
    });

    const onSubmit = async (data: SignupPayload) => {
        try {
            await signup(data)
        } catch (e) {
            console.error(e)
        }
    };
    return (
        <Box className="flex w-5/6 items-center gap-1">
            <FormControl
                className="mb-4"
                isInvalid={!!errors.username}
            >
                <Controller
                    control={control}
                    name="username"
                    render={({field: {onChange, value}}) => (
                        <Input className="w-full rounded-full border-2" size={"2xl"} variant={"rounded"}>
                            <InputField
                                placeholder="Indtast brugernavn"
                                value={value}
                                onChangeText={onChange}
                            />
                        </Input>
                    )}
                />
                <FormControlError>
                    <FormControlErrorIcon as={AlertCircleIcon} className="w-4 h-4 text-red-500"/>
                    <FormControlErrorText className="text-red-500 text-sm mt-1">
                        {errors.username?.message}
                    </FormControlErrorText>
                </FormControlError>

            </FormControl>

            <FormControl
                className="mb-4"
                isInvalid={!!errors.password}
            >
                <Controller
                    control={control}
                    name="password"
                    render={({field: {onChange, value}}) => (
                        <Input className="w-full rounded-full border-2" size={"2xl"} variant={"rounded"}>
                            <InputField
                                secureTextEntry
                                placeholder="Indtast password"
                                value={value}
                                onChangeText={onChange}
                            />
                        </Input>
                    )}
                />
                <FormControlError>
                    <FormControlErrorIcon as={AlertCircleIcon} className="w-4 h-4 text-red-500"/>
                    <FormControlErrorText className="text-red-500 text-sm mt-1">
                        {errors.password?.message}
                    </FormControlErrorText>
                </FormControlError>
            </FormControl>
            <FormControl
                className="mb-4"
                isInvalid={!!errors.fullName}
            >
                <Controller
                    control={control}
                    name="fullName"
                    render={({field: {onChange, value}}) => (
                        <Input className="w-full rounded-full border-2" size={"2xl"} variant={"rounded"}>
                            <InputField
                                placeholder="Indtast fulde navn"
                                value={value}
                                onChangeText={onChange}
                            />
                        </Input>
                    )}
                />
                <FormControlError>
                    <FormControlErrorIcon as={AlertCircleIcon} className="w-4 h-4 text-red-500"/>
                    <FormControlErrorText className="text-red-500 text-sm mt-1">
                        {errors.fullName?.message}
                    </FormControlErrorText>
                </FormControlError>
            </FormControl>
            <FormControl
                className="mb-4"
                isInvalid={!!errors.email}
            >
                <Controller
                    control={control}
                    name="email"
                    render={({field: {onChange, value}}) => (
                        <Input className="w-full rounded-full border-2" size={"2xl"} variant={"rounded"}>
                            <InputField
                                placeholder="Indtast email"
                                value={value}
                                onChangeText={onChange}
                            />
                        </Input>
                    )}
                />
                <FormControlError>
                    <FormControlErrorIcon as={AlertCircleIcon} className="w-4 h-4 text-red-500"/>
                    <FormControlErrorText className="text-red-500 text-sm mt-1">
                        {errors.email?.message}
                    </FormControlErrorText>
                </FormControlError>
            </FormControl>
            {isError && (
                <Text className={"text-red-500 text-xl mb-4"}>
                    Der skete en fejl
                </Text>
            )}
            <Button
                className={"w-full rounded-full bg-success-500"}
                size="2xl"
                variant="solid"
                action="primary"
                onPress={handleSubmit(onSubmit)}
            >
                <ButtonText>
                    Opret dig
                </ButtonText>
                {isLoading &&
                    <ButtonSpinner/>
                }
            </Button>
        </Box>
    )
}