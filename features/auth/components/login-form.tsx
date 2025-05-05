import React from 'react';
import {SafeAreaView} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {
    FormControl,
    FormControlLabel,
    FormControlLabelText,
    FormControlError,
    FormControlErrorText,
    FormControlErrorIcon
} from '@/components/ui/form-control';
import {AlertCircleIcon} from '@/components/ui/icon';
import {Button, ButtonSpinner, ButtonText} from "@/components/ui/button";
import {Input, InputField} from "@/components/ui/input";
import {Box} from "@/components/ui/box";
import {Text} from "@/components/ui/text";
import {useAppDispatch} from "@/store/hooks";
import {setToken} from "@/features/auth/store";
import {router} from "expo-router";
import {useAuthenticateMutation} from "@/features/auth/api/login";

const schema = z.object({
    username: z.string().min(4, {message: 'Invalid username'}),
    password: z.string().min(4, {message: 'Password must be at least 4 characters'}),
});

type LoginPayload = z.infer<typeof schema>

export default function LoginForm() {
    const [login, {isLoading, isError}] = useAuthenticateMutation()

    const {control, handleSubmit, formState: {errors}} = useForm<LoginPayload>({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data: LoginPayload) => {
        console.log('Form Data:', data);
        try {
            await login(data)
            router.replace("/")
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
            </Button>
        </Box>
    );
}