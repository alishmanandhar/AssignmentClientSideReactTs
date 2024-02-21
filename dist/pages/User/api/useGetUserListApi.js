"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useGetUserListApi = void 0;
const client_1 = require("@apollo/client");
const useGetUserListApi = (number, name, sort, pageNumber) => {
    const getUsers = (0, client_1.gql) `
        query GetUsers($pageNumber:Int, $number: Int,$name: String, $sort: String ){
            getUsers(pageNumber:$pageNumber, number: $number, name: $name, sort: $sort) {
            id
            name
            age
            bio
            createdAt
            }
        }`;
    const { data, loading, refetch } = (0, client_1.useQuery)(getUsers, {
        variables: {
            number: number,
            name: name,
            sort: sort,
            pageNumber: pageNumber
        }
    });
    return {
        data,
        loading,
        refetch
    };
};
exports.useGetUserListApi = useGetUserListApi;
