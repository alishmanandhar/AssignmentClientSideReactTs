"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useGetUserByIDApi = void 0;
const client_1 = require("@apollo/client");
const useGetUserByIDApi = (id) => {
    const getUserById = (0, client_1.gql) `
    query User($id: ID!) {
        user(ID: $id) {
          id
          name
          age
          bio
          createdAt
        }
      }`;
    const { data, loading } = (0, client_1.useQuery)(getUserById, {
        variables: {
            id: id
        }
    });
    return {
        data,
        loading,
    };
};
exports.useGetUserByIDApi = useGetUserByIDApi;
