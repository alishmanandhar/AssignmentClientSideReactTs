import {gql,useMutation} from '@apollo/client';

interface DeleteUserResult {
    deleteUserToApi: (id: string) => Promise<boolean>;
    res: boolean;
    loading: boolean;
    called: boolean;
  }

export default function useDeleteUserApi():DeleteUserResult{

    const deleteUserMutation = gql`
        mutation DeleteUser($id: ID!) {
            deleteUser(ID: $id)
        }`;

    const [deleteUser, { data: res, loading,called }] = useMutation(deleteUserMutation);

    const deleteUserToApi = async (id:string):Promise<boolean> => {
        try {
            const { data } = await deleteUser({
                variables: { id:id}
            });
            return data.deleteUser;
        } catch (error) {
            console.error('Error deleting user:');
            throw error;
        }
    };

    return {
        deleteUserToApi,
        res,
        loading,
        called
    }
}