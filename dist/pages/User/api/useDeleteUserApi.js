"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@apollo/client");
function useDeleteUserApi() {
    const deleteUserMutation = (0, client_1.gql) `
        mutation DeleteUser($id: ID!) {
            deleteUser(ID: $id)
        }`;
    const [deleteUser, { data: res, loading, called }] = (0, client_1.useMutation)(deleteUserMutation);
    const deleteUserToApi = (id) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { data } = yield deleteUser({
                variables: { id: id }
            });
            return data.deleteUser;
        }
        catch (error) {
            console.error('Error deleting user:');
            throw error;
        }
    });
    return {
        deleteUserToApi,
        res,
        loading,
        called
    };
}
exports.default = useDeleteUserApi;
