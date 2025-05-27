import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {FormControl, FormControlError, FormControlErrorIcon, FormControlErrorText} from '@/components/ui/form-control';
import {AlertCircleIcon} from '@/components/ui/icon';
import {Button, ButtonSpinner, ButtonText} from "@/components/ui/button";
import {Input, InputField} from "@/components/ui/input";
import {Box} from "@/components/ui/box";
import {useAuthenticateMutation} from "@/features/auth/api/login";
import {LoginPayloadSchema, UpdatePayload} from '../types';
import {Text} from "@/components/ui/text";


export default function LoginForm() {

    const [login, {isLoading, isError, error}] = useAuthenticateMutation()

    const {control, handleSubmit, formState: {errors}} = useForm<UpdatePayload>({
        resolver: zodResolver(LoginPayloadSchema),
    });

    const onSubmit = async (data: UpdatePayload) => {
        try {
            await login(data)
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
                        <Input className="w-full rounded-2xl border-2" size={"2xl"} variant={"rounded"}>
                            <InputField
                                placeholder="Username"
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
                        <Input className="w-full rounded-2xl border-2" size={"2xl"} variant={"rounded"}>
                            <InputField
                                secureTextEntry
                                placeholder="Password"
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
            {isError && (
                <Text className={"text-red-500 text-xl mb-4"}>
                    Der skete en fejl
                </Text>
            )}
            <Button
                className={"w-full rounded-2xl bg-success-500"}
                size="2xl"
                variant="solid"
                action="primary"
                onPress={handleSubmit(onSubmit)}
            >
                <ButtonText>
                    Sign In
                </ButtonText>
                {isLoading &&
                    <ButtonSpinner/>
                }
            </Button>
        </Box>
    );
}