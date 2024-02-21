import { FieldErrors, SubmitHandler, UseFormRegister, useForm,FieldValues } from "react-hook-form"
import useEditUserApi, { EditUserResult } from "../api/useEditUserApi";
import { UserInterface } from "../../../constants/Constants";

export interface UseEditUserResult {
    register:UseFormRegister<FieldValues | UserInterface>;
    handleSubmit:(handler: SubmitHandler<FieldValues | UserInterface>) => (e?: React.BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
    onSubmit:SubmitHandler<UserInterface|FieldValues>;
    res:UserInterface;
    loading:boolean;
    isValid:boolean;
    isDirty:boolean;
    errors:FieldErrors<UserInterface>
}

// logic part has been separated from ui part
// this is logic part of edit user account form
export function useEditUser():UseEditUserResult {


    const {
        register,
        handleSubmit,
        formState: { isValid,isDirty,errors }
      } = useForm({
        mode: "onChange",
        criteriaMode: "all"
    });

    const { editUserToApi, loading, res,called }:EditUserResult= useEditUserApi();

    const onSubmit:SubmitHandler<UserInterface|FieldValues> = async (data) => {
        try{
            await editUserToApi(data);
        }catch(error){
            console.error('Error submitting user data:', error);    
        }
    }

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