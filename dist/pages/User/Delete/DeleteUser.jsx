"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("@chakra-ui/react");
const fi_1 = require("react-icons/fi");
const useDeleteUserApi_1 = __importDefault(require("../api/useDeleteUserApi"));
const react_2 = require("react");
const DeleteUser = ({ username, id, refetch, setUserData, data }) => {
    const { isOpen, onOpen, onClose } = (0, react_1.useDisclosure)();
    const { deleteUserToApi, loading, res, called } = (0, useDeleteUserApi_1.default)();
    (0, react_2.useEffect)(() => {
        if (res) {
            setUserData(data.filter(item => item.id != id));
            onClose();
        }
    }, [res]);
    return (<>
            <fi_1.FiTrash cursor={'pointer'} color="red" onClick={onOpen}/>

            <react_1.Modal isOpen={isOpen} onClose={onClose}>
                <react_1.ModalOverlay />
                <react_1.ModalContent>
                <react_1.ModalHeader>Delete User</react_1.ModalHeader>
                <react_1.ModalCloseButton />
                <react_1.ModalBody>
                    <react_1.Text>Are you sure you want to delete user {username}?</react_1.Text>
                </react_1.ModalBody>

                <react_1.ModalFooter>
                    <react_1.Button colorScheme='blue' mr={3} onClick={onClose}>
                        Close
                    </react_1.Button>
                    <react_1.Button colorScheme='red' onClick={() => deleteUserToApi(id || "")}>Delete</react_1.Button>
                </react_1.ModalFooter>
                </react_1.ModalContent>
            </react_1.Modal>
        </>);
};
exports.default = DeleteUser;
