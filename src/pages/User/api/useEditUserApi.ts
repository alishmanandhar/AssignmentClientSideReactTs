import {gql,useMutation} from '@apollo/client';
import { UserInterface } from '../../../constants/Constants';
import { FieldValues } from 'react-hook-form';

export interface EditUserResult {
    editUserToApi: (userData: UserInterface|FieldValues) => Promise<UserInterface>;
    res: UserInterface;
    loading: boolean;
    called: boolean;
  }

export default function useEditUserApi():EditUserResult{

    const editUserMutation = gql`
        mutation EditUser($id: ID!, $userInput: UserInput) {
            editUser(ID: $id, userInput: $userInput)
          }`;

    const [editUser, { data: res, loading,called }] = useMutation(editUserMutation);

    const editUserToApi = async (userData:UserInterface|FieldValues):Promise<UserInterface> => {
        try {
            const { data } = await editUser({
                variables: { id:userData.id,userInput: {
                    name: userData.name,
                    age: userData.age,
                    bio: userData.bio,
                    createdAt: userData.createdAt
                } }
            });
            return data.createUser;
        } catch (error) {
            console.error('Error editing user:', error);
            throw error;
        }
    };

    return {
        editUserToApi,
        res,
        loading,
        called
    }
}