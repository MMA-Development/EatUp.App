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
        <Box className="flex w-2/3 items-center">
            <FormControl
                className="mb-4"
                isInvalid={!!errors.username}
            >
                {/*<FormControlLabel className="mb-2">*/}
                {/*    <FormControlLabelText className="" size={"2xl"}>*/}
                {/*        Email*/}
                {/*    </FormControlLabelText>*/}
                {/*</FormControlLabel>*/}
                <Controller
                    control={control}
                    name="username"
                    render={({field: {onChange, value}}) => (
                        <Input className="w-full" size={"xl"} variant={"rounded"}>
                            <InputField
                                placeholder="Indtast brugernavn"
                                value={value}
                                onChangeText={onChange}
                            />
                        </Input>
                    )}
                />
                {errors.username && (
                    <FormControlError>
                        <FormControlErrorIcon as={AlertCircleIcon} className="w-4 h-4 text-red-500"/>
                        <FormControlErrorText className="text-red-500 text-sm mt-1">
                            {errors.username.message}
                        </FormControlErrorText>
                    </FormControlError>
                )}
            </FormControl>

            <FormControl
                className="mb-4"
                isInvalid={!!errors.password}
            >
                {/*<FormControlLabel className="mb-2">*/}
                {/*    <FormControlLabelText className="" size={"2xl"}>*/}
                {/*        Password*/}
                {/*    </FormControlLabelText>*/}
                {/*</FormControlLabel>*/}
                <Controller
                    control={control}
                    name="password"
                    render={({field: {onChange, value}}) => (
                        <Input className="w-full" size={"xl"} variant={"rounded"}>
                            <InputField
                                secureTextEntry
                                placeholder="Indtast password"
                                value={value}
                                onChangeText={onChange}
                            />
                        </Input>
                    )}
                />
                {errors.password && (
                    <FormControlError>
                        <FormControlErrorIcon as={AlertCircleIcon} className="w-4 h-4 text-red-500"/>
                        <FormControlErrorText className="text-red-500 text-sm mt-1">
                            {errors.password.message}
                        </FormControlErrorText>
                    </FormControlError>
                )}
            </FormControl>
            <FormControl
                className="mb-4"
                isInvalid={!!errors.fullName}
            >
                {/*<FormControlLabel className="mb-2">*/}
                {/*    <FormControlLabelText className="" size={"2xl"}>*/}
                {/*        Email*/}
                {/*    </FormControlLabelText>*/}
                {/*</FormControlLabel>*/}
                <Controller
                    control={control}
                    name="fullName"
                    render={({field: {onChange, value}}) => (
                        <Input className="w-full" size={"xl"} variant={"rounded"}>
                            <InputField
                                placeholder="Indtast fulde navn"
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
            <FormControl
                className="mb-4"
                isInvalid={!!errors.email}
            >
                {/*<FormControlLabel className="mb-2">*/}
                {/*    <FormControlLabelText className="" size={"2xl"}>*/}
                {/*        Email*/}
                {/*    </FormControlLabelText>*/}
                {/*</FormControlLabel>*/}
                <Controller
                    control={control}
                    name="email"
                    render={({field: {onChange, value}}) => (
                        <Input className="w-full" size={"xl"} variant={"rounded"}>
                            <InputField
                                placeholder="Indtast email"
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
            {isError && (
                <Text className={"text-red-500 text-xl mb-4"}>
                    Der skete en fejl
                </Text>
            )}
            <Button
                style={{width: 120}}
                className={"w-[100px]"}
                size="lg"
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