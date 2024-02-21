"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("@chakra-ui/react");
const error_message_1 = require("@hookform/error-message");
// global input
const LeftSideLabelInput = ({ label, inputType, placeholder, defaultValue, required, name, register, minLength, errors }) => {
    return (<>
            <react_1.Text fontSize={'0.8rem'} color={"red"}>
                <error_message_1.ErrorMessage errors={errors} name={name} render={({ messages }) => messages &&
            Object.entries(messages).map(([type, message]) => (<p key={type}>{message}</p>))}/>
            </react_1.Text>
            <react_1.Flex gap={'1rem'} mb={'0.5rem'} mt={'0.5rem'}>
                <react_1.Text width={"7rem"}>{label}{required ? "*" : ""}</react_1.Text>
                {/* using react hook form */}
                {inputType == "Date" ?
            <react_1.Input type={inputType} placeholder={placeholder} defaultValue={defaultValue === null || defaultValue === void 0 ? void 0 : defaultValue.split('T')[0]} {...register(name, {
                required: required,
                minLength: {
                    value: minLength ? minLength : 0,
                    message: `Minimum length is ${minLength ? minLength : 0}`
                }
            })}/>
            :
                <react_1.Input type={inputType} placeholder={placeholder} defaultValue={defaultValue} {...register(name, {
                    required: required,
                    minLength: {
                        value: minLength ? minLength : 0,
                        message: `Minimum length is ${minLength ? minLength : 0}`
                    }
                })}/>}
            </react_1.Flex>
        </>);
};
exports.default = LeftSideLabelInput;
