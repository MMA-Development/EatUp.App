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
import {Button, ButtonText} from "@/components/ui/button";
import {Input, InputField} from "@/components/ui/input";
import {Box} from "@/components/ui/box";

const schema = z.object({
    email: z.string().email({message: 'Invalid email address'}),
    password: z.string().min(6, {message: 'Password must be at least 6 characters'}),
});

type LoginPayload = z.infer<typeof schema>

export default function LoginForm() {
    const {control, handleSubmit, formState: {errors}} = useForm<LoginPayload>({
        resolver: zodResolver(schema),
    });

    const onSubmit = (data: LoginPayload) => {
        console.log('Form Data:', data);
    };

    return (
        <Box className="flex-1 justify-center items-center w-full gap-12 p-5">
            <Box className="w-full items-center">
                <Box className="w-full gap-4 p-5">
                    <FormControl
                        className="mb-4"
                        isInvalid={!!errors.email}
                    >
                        <FormControlLabel className="mb-2">
                            <FormControlLabelText className="" size={"2xl"}>
                                Email
                            </FormControlLabelText>
                        </FormControlLabel>
                        <Controller
                            control={control}
                            name="email"
                            render={({field: {onChange, value}}) => (
                                <Input className="w-full" size={"xl"}>
                                    <InputField
                                        placeholder="Enter your email"
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
                        isInvalid={!!errors.password}
                    >
                        <FormControlLabel className="mb-2">
                            <FormControlLabelText className="" size={"2xl"}>
                                Password
                            </FormControlLabelText>
                        </FormControlLabel>
                        <Controller
                            control={control}
                            name="password"
                            render={({field: {onChange, value}}) => (
                                <Input className="w-full" size={"xl"}>
                                    <InputField
                                        className="rounded-lg"
                                        secureTextEntry
                                        placeholder="Enter your password"
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
                </Box>
                <Button
                    style={{ width: 100 }}
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

        </Box>
    );
}