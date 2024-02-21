import { useForm,UseFormRegister, SubmitHandler, FieldValue, FieldErrors, FieldValues } from "react-hook-form"
import useAddUserApi from "../api/useAddUserApi";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserInterface } from "../../../constants/Constants";
import { AddUserResult } from "../api/useAddUserApi";

export interface UseAddUserResult {
    register: UseFormRegister<UserInterface|FieldValues>;
    handleSubmit: (handler: SubmitHandler<UserInterface|FieldValues>) => (e?: React.BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
    onSubmit: SubmitHandler<UserInterface|FieldValues>;
    res: UserInterface;
    loading: boolean;
    isValid: boolean;
    isDirty: boolean;
    errors: FieldErrors<UserInterface>;
}

// this is logic part for add user form
// logic and ui has been separated
export function useAddUser():UseAddUserResult {

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        reset,
        formState: { isValid,isDirty,errors },
      } = useForm<UserInterface|FieldValues>({ 
        mode: "onChange",
        criteriaMode: "all"
    });

    const { addUserToApi, loading, res,called }:AddUserResult = useAddUserApi();

    const onSubmit:SubmitHandler<UserInterface|FieldValues> = async (data) => {
        try{
            await addUserToApi(data);
        }catch(error){
            console.error('Error submitting user data:', error);    
        }
    }

    useEffect(()=>{
        if(res && called) {
              reset();
              navigate("/");
        }
    },[res])

    return {
        register,
        handleSubmit,
        onSubmit,
        res,
        loading,
        isValid,
        isDirty,
        errors
    }
}