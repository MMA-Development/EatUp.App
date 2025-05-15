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
                                placeholder="Enter username"
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
                                className="rounded-lg"
                                secureTextEntry
                                placeholder="Enter password"
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

            <Button
                style={{width: 100}}
                className={"w-[100px]"}
                size="lg"
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