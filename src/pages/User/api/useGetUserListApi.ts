import {ApolloQueryResult, QueryResult, gql,useQuery} from '@apollo/client';
import { UserInterface } from '../../../constants/Constants';

export interface UserFields {
    number: number,
    name:string,
    sort:string,
    pageNumber:number
}

type refetchFunction = (variables?: Partial<UserFields>) => Promise<ApolloQueryResult<UserInterface[]>>;

interface UserList {
    data: { getUsers: UserInterface[] },
    loading:boolean,
    refetch: refetchFunction
}

export const useGetUserListApi = (number:number,name:string,sort:string,pageNumber:number):UserList => {
    
      
    const getUsers = gql`
        query GetUsers($pageNumber:Int, $number: Int,$name: String, $sort: String ){
            getUsers(pageNumber:$pageNumber, number: $number, name: $name, sort: $sort) {
            id
            name
            age
            bio
            createdAt
            }
        }`;

    const {data, loading,refetch} = useQuery(getUsers, {
        variables:{
          number: number,
          name:name,
          sort:sort,
          pageNumber:pageNumber
        }
      });

    return {
        data,
        loading,
        refetch
    }
}