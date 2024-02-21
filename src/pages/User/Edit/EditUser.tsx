import { Button, Divider, Flex, Spinner } from "@chakra-ui/react"
import Title from "../../../components/Title"
import { FiArrowLeft } from "react-icons/fi"
import { Link, useParams } from "react-router-dom"
import LeftSideLabelInput from "../../../components/LeftSideLabelInput"
import { useGetUserByIDApi } from "../api/useGetUserByIDApi"
import { UseEditUserResult, useEditUser } from "./useEditUser"

const EditUser = () =>{

    const params = useParams();
    
    const {data, loading} = useGetUserByIDApi(params.id||"");
    const {register, handleSubmit, onSubmit, res, loading:progress, isValid, isDirty, errors}:UseEditUserResult = useEditUser();

    console.log("data",data);

    return (
        <>
            <Flex alignItems={'center'} gap={'0.5rem'}>
                <Link to={"/"}><FiArrowLeft fontSize={'1.5rem'} /></Link>
                <Title title={"Edit User"} />
            </Flex>

            <Divider/>

            {
                loading ? <Spinner /> :
                <form onSubmit={handleSubmit(onSubmit)}>
                {/* User Add Form starts here */}
                    <input type="hidden"{...register('id')} value={data?.user?.id}/>
                    {/* created global input for consistant input design or style */}
                    <LeftSideLabelInput errors={errors} minLength={8} register={register} defaultValue={data?.user?.name} name="name" label={"Full Name"} placeholder={"John Doe"} inputType={"text"} required={true} />
                    {/* <LeftSideLabelInput errors={errors} minLength={1} register={register} defaultValue={data?.user?.age} name="age" label={"Age"} placeholder={"30"} inputType={"number"} required={true}/> */}
                    <LeftSideLabelInput errors={errors} register={register} defaultValue={data?.user?.bio} name="bio" label={"Bio"} placeholder={"Something about yourself!"} inputType={"textarea"} />
                    <LeftSideLabelInput errors={errors} register={register} defaultValue={data?.user?.createdAt} name="createdAt" label={"Created At"} inputType={"Date"} required={true}/>
                    <Button w={'10rem'} type="submit" isDisabled={ !isValid || !isDirty|| progress}>
                        Update
                        {
                            progress ? <Spinner /> :""
                        }
                    </Button>
                </form>
            }
        
        </>
        
        
    )
}

export default EditUser;