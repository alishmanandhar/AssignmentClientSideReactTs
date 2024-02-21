"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("@chakra-ui/react");
const react_2 = __importDefault(require("react"));
const client_1 = __importDefault(require("react-dom/client"));
require("./index.css");
const reportWebVitals_1 = __importDefault(require("./reportWebVitals"));
const client_2 = require("@apollo/client");
const react_router_dom_1 = require("react-router-dom");
const UserList_1 = __importDefault(require("./pages/User/List/UserList"));
const AddUser_1 = __importDefault(require("./pages/User/Add/AddUser"));
const Constants_1 = require("./constants/Constants");
const EditUser_1 = __importDefault(require("./pages/User/Edit/EditUser"));
const react_3 = require("@chakra-ui/react");
const client_3 = require("@apollo/client");
const error_1 = require("@apollo/client/link/error");
// import * as serviceWorker from "./serviceWorker"
const { ToastContainer, toast } = (0, react_3.createStandaloneToast)();
const container = document.getElementById("root");
if (!container)
    throw new Error('Failed to find the root element');
const root = client_1.default.createRoot(container);
// Create an HTTP link
const httpLink = (0, client_3.createHttpLink)({
    uri: Constants_1.BASE_URL,
});
// Create an error link to handle errors globally
const errorLink = (0, error_1.onError)(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        graphQLErrors.forEach(({ message, locations, path }) => {
            console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
        });
    }
    if (networkError) {
        console.error(`[Network error]: ${networkError}`);
    }
});
// Create a toast link to display a toast message for every API call
const toastLink = new client_2.ApolloLink((operation, forward) => {
    return forward(operation).map((response) => {
        let toastMessage = "";
        let status = 'success';
        switch (operation === null || operation === void 0 ? void 0 : operation.operationName) {
            case "DeleteUser":
                toastMessage = "User has been deleted successfully!";
                status = "error";
                break;
            case "EditUser":
                toastMessage = "User has been updated successfully!";
                break;
            case "CreateUser":
                toastMessage = "New user has been created!";
                break;
            default: return response;
        }
        if (toastMessage != "") {
            toast({
                title: "Success",
                description: toastMessage,
                status: status,
                duration: 3000,
                isClosable: true,
            });
        }
        // Check if errors exist in the response
        if (response.errors) {
            // Handle errors here if needed
            toast({
                title: 'An error occurred.',
                description: 'Something went wrong.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            console.error(response.errors);
        }
        return response;
    });
});
// Create a composed link with the error link and toast link
const composedLink = client_2.ApolloLink.from([errorLink, toastLink, httpLink]);
// apollo client setup to connect with GraphQl
const client = new client_2.ApolloClient({
    link: composedLink,
    cache: new client_2.InMemoryCache(),
});
root.render(<react_2.default.StrictMode>
    <client_2.ApolloProvider client={client}>
      {/* Chakra UI component library  */}
      <react_1.ChakraProvider>
        <ToastContainer />
        {/* Router */}
        <react_router_dom_1.BrowserRouter>
          <react_1.Container maxW={"6xl"}>
            <react_router_dom_1.Routes>
              <react_router_dom_1.Route path='/' element={<UserList_1.default />}/>
              <react_router_dom_1.Route path='/add-user' element={<AddUser_1.default />}/>
              <react_router_dom_1.Route path='/edit-user/:id' element={<EditUser_1.default />}/>
            </react_router_dom_1.Routes>
          </react_1.Container>
        </react_router_dom_1.BrowserRouter>
      </react_1.ChakraProvider>
    </client_2.ApolloProvider>
  </react_2.default.StrictMode>);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
// serviceWorker.unregister()
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
(0, reportWebVitals_1.default)();
