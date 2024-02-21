import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Text,
    Button,
    useDisclosure,
  } from '@chakra-ui/react'
import { FiTrash } from 'react-icons/fi';
import useDeleteUserApi from '../api/useDeleteUserApi';
import { useEffect } from 'react';
import { UserInterface } from '../../../constants/Constants';
import { ApolloQueryResult } from '@apollo/client';
import { UserFields } from '../api/useGetUserListApi';

type SetUserDataFunction = React.Dispatch<React.SetStateAction<UserInterface[]>>;
type refetchFunction = (variables?: Partial<UserFields>) => Promise<ApolloQueryResult<UserInterface[]>>;

interface DeleteUserProps {
    username: string;
    id?: string;
    refetch:refetchFunction;
    setUserData:SetUserDataFunction;
    data:UserInterface[];
}

const DeleteUser:React.FC<DeleteUserProps> = ({username,id,refetch,setUserData,data}) => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const { deleteUserToApi, loading, res,called } = useDeleteUserApi();

    useEffect(()=>{
        if(res){
            setUserData(data.filter(item=>item.id != id))
            onClose();

        }
    },[res])
    
    return (
        <>
            <FiTrash cursor={'pointer'} color="red" onClick={onOpen} />

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Delete User</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text>Are you sure you want to delete user {username}?</Text>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                        Close
                    </Button>
                    <Button colorScheme='red' onClick={()=>deleteUserToApi(id||"")} >Delete</Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default DeleteUser;