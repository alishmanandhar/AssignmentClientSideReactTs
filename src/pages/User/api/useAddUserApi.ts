import {gql,useMutation} from '@apollo/client';
import { UserInterface } from '../../../constants/Constants';
import { FieldValues } from 'react-hook-form';

interface UserData{
    name:string;
    age:number;
    bio?:string;
}

export interface AddUserResult {
    addUserToApi: (userData: UserData|FieldValues) => Promise<UserInterface>;
    res: UserInterface;
    loading: boolean;
    called: boolean;
  }


export default function useAddUserApi():AddUserResult{

    const addUserMutation = gql`
        mutation CreateUser($userInput: UserInput!) {
            createUser(userInput: $userInput) {
            name
            age
            bio
            }
        }`;

    const [addUser, { data: res, loading,called }] = useMutation(addUserMutation);

    const addUserToApi = async(userData:UserData|FieldValues):Promise<UserInterface> => {
        try {
            const { data } = await addUser({
                variables: { userInput: {
                    name: userData.name,
                    age: parseInt(userData.age.toString()),
                    bio: userData.bio
                } }
            });
            return data.createUser;
        } catch (error) {
            console.error('Error adding user:', error);
            throw error;
        }
    };

    return {
        addUserToApi,
        res,
        loading,
        called
    }
}