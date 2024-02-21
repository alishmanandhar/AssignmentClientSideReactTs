import {QueryResult, gql,useQuery} from '@apollo/client';
import { UserInterface } from '../../../constants/Constants';

interface UserByID {
  data: {
    user:UserInterface
  },
  loading:boolean
}

export const useGetUserByIDApi = (id:string):UserByID => {

    const getUserById = gql`
    query User($id: ID!) {
        user(ID: $id) {
          id
          name
          age
          bio
          createdAt
        }
      }`;

    const {data, loading} = useQuery(getUserById, {
        variables:{
          id: id
        }
      });

    return {
        data,
        loading,
    } 
}