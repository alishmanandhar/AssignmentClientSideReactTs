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
function useAddUserApi() {
    const addUserMutation = (0, client_1.gql) `
        mutation CreateUser($userInput: UserInput!) {
            createUser(userInput: $userInput) {
            name
            age
            bio
            }
        }`;
    const [addUser, { data: res, loading, called }] = (0, client_1.useMutation)(addUserMutation);
    const addUserToApi = (userData) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { data } = yield addUser({
                variables: { userInput: {
                        name: userData.name,
                        age: parseInt(userData.age.toString()),
                        bio: userData.bio
                    } }
            });
            return data.createUser;
        }
        catch (error) {
            console.error('Error adding user:', error);
            throw error;
        }
    });
    return {
        addUserToApi,
        res,
        loading,
        called
    };
}
exports.default = useAddUserApi;
