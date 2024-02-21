import { Flex, Input, Text } from "@chakra-ui/react"
import { ErrorMessage } from "@hookform/error-message"
import { RegisterOptions, UseFormRegister, FieldErrors, FieldValues } from 'react-hook-form';
import { UserInterface } from "../constants/Constants";

interface LeftSideLabelInputProps {
    label: string;
    inputType: string;
    placeholder?: string;
    defaultValue?: string;
    register: UseFormRegister<UserInterface|FieldValues>;
    required?: boolean;
    name: keyof UserInterface;
    minLength?: number;
    errors: FieldErrors<UserInterface>; 
}

// global input
const LeftSideLabelInput: React.FC<LeftSideLabelInputProps> = ({label, inputType, placeholder, defaultValue, required,name, register,minLength,errors}) => {
    return (
        <>
            <Text fontSize={'0.8rem'} color={"red"}>
                <ErrorMessage
                    errors={errors}
                    name={name}
                    render={({ messages }) =>
                    messages &&
                    Object.entries(messages).map(([type, message]) => (
                        <p key={type}>{message}</p>
                    ))
                    }
                />
            </Text>
            <Flex gap={'1rem'} mb={'0.5rem'} mt={'0.5rem'}>
                <Text width={"7rem"}>{label}{required?"*":""}</Text>
                {/* using react hook form */}
                {
                    inputType == "Date" ?
                    <Input 
                        type={inputType}
                        placeholder={placeholder}
                        defaultValue={defaultValue?.split('T')[0]}
                        {...register(name, {
                            required: required,
                            minLength:{
                                value:minLength?minLength:0,
                                message:`Minimum length is ${minLength?minLength:0}`
                            }
                        })}
                        />
                    :
                    <Input 
                        type={inputType}
                        placeholder={placeholder}
                        defaultValue={defaultValue}
                        {...register(name, {
                            required: required,
                            minLength:{
                                value:minLength?minLength:0,
                                message:`Minimum length is ${minLength?minLength:0}`
                            }
                        })}
                        />
                }
            </Flex>
        </>
    )
}

export default LeftSideLabelInput;